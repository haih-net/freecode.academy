import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import knex from 'knex'
import { baselineDatabase, initialMigration } from './index.ts'

const connection = process.env.TEST_DATABASE_URL

test(
  'PostgreSQL initial, explicit baseline, drift rejection and repeat migration',
  { skip: !connection },
  async () => {
    const url = new URL(connection)
    const admin = knex({ client: 'pg', connection: url.href })
    const name = `freecode_migrations_${randomUUID().replaceAll('-', '')}`
    let db
    try {
      await admin.raw('CREATE DATABASE ??', [name])
      url.pathname = `/${name}`
      db = knex({
        client: 'pg',
        connection: url.href,
        migrations: {
          directory: 'server/database/migrations',
          loadExtensions: ['.mjs'],
        },
      })
      await assert.rejects(baselineDatabase(db), /does not match/)
      assert.equal(await db.schema.hasTable('knex_migrations'), false)
      await db.migrate.up({ name: initialMigration })
      const inspect = readFileSync(
        new URL('./inspect.sql', import.meta.url),
        'utf8',
      )
      const expected = JSON.parse(
        readFileSync(new URL('./schema.json', import.meta.url), 'utf8'),
      )
      assert.deepEqual((await db.raw(inspect)).rows, expected)
      await db('User').insert({
        id: 'baseline-preserved',
        fullname: 'Проверка сохранности',
      })
      await db('ChatMessage').insert({
        id: 'legacy-message',
        text: 'Старое сообщение',
        createdBy: 'baseline-preserved',
      })
      const legacyMessage = await db('ChatMessage')
        .where({ id: 'legacy-message' })
        .first()
      await db('Balance').insert({
        id: 'legacy-balance',
        userId: 'baseline-preserved',
        amount: 5,
      })
      await db('EthTransaction').insert({
        id: 'legacy-payment',
        userId: 'baseline-preserved',
        chainId: 1,
        txHash: '0xABC',
        from: 'sender',
        to: 'recipient',
        amount: 5,
        message: 'Original agreement',
        signature: 'Original signature',
      })
      await db('Transaction').insert({
        id: 'legacy-credit',
        userId: 'baseline-preserved',
        balanceId: 'legacy-balance',
        type: 'TopUp',
        amount: 5,
        ethTransactionId: 'legacy-payment',
      })
      const legacyPayment = await db('EthTransaction')
        .where({ id: 'legacy-payment' })
        .first()
      await db.schema.dropTable('knex_migrations_lock')
      await db.schema.dropTable('knex_migrations')
      await assert.rejects(
        db.migrate.up({ name: initialMigration }),
        /db:baseline/,
      )
      await db.raw('ALTER TABLE "User" ALTER COLUMN rating SET DEFAULT 1')
      await assert.rejects(baselineDatabase(db), /column: User.rating/)
      assert.equal((await db('knex_migrations')).length, 0)
      await db.raw('ALTER TABLE "User" ALTER COLUMN rating SET DEFAULT 0')
      assert.deepEqual((await baselineDatabase(db))[1], [initialMigration])
      assert.deepEqual(await baselineDatabase(db), [0, []])
      await db.migrate.latest()
      assert.deepEqual((await db.migrate.latest())[1], [])
      assert.equal(
        (await db('User').where({ id: 'baseline-preserved' }).first()).fullname,
        'Проверка сохранности',
      )
      assert.equal(await db.schema.hasTable('CallRoom'), true)
      assert.deepEqual(
        await db('LegacyChatMessage').where({ id: 'legacy-message' }).first(),
        legacyMessage,
      )
      for (const table of [
        'ChatSetting',
        'ChatDialogue',
        'PageError',
        'PageErrorEvent',
        'ClientCertificateAccount',
      ]) {
        assert.equal(await db.schema.hasTable(table), true)
      }
      assert.equal(await db.schema.hasColumn('KBConcept', 'lat'), true)
      assert.equal(await db.schema.hasColumn('KBConcept', 'lng'), true)
      assert.deepEqual(
        await db('LegacyEthTransaction')
          .where({ id: 'legacy-payment' })
          .first(),
        legacyPayment,
      )
      assert.equal(
        (await db('EthTransaction').where({ id: 'legacy-payment' }).first())
          .transactionId,
        'legacy-credit',
      )
      assert.equal(
        (await db('EthTransaction').where({ id: 'legacy-payment' }).first())
          .txHash,
        '0xabc',
      )
      assert.equal(
        (await db('Transaction').where({ id: 'legacy-credit' }).first())
          .ethTransactionId,
        'legacy-payment',
      )
      const { ChatStorage } = await import('../../chat/storage.ts')
      const storage = new ChatStorage(db)
      const token = await storage.issue()
      const chatId = await storage.verify(`Bearer ${token}`)
      assert.ok(chatId)
      const message = {
        id: 'test-message',
        role: 'user',
        content: 'Новый чат',
        createdAt: new Date().toISOString(),
      }
      await storage.append(chatId, message)
      assert.deepEqual(await storage.read(chatId), [message])
      assert.equal((await storage.listMessages()).length, 1)
      // The renamed legacy table retains its original foreign keys.
      await assert.rejects(
        db('LegacyChatMessage').insert({
          id: 'invalid-author',
          text: 'test',
          createdBy: 'missing-user',
        }),
        /foreign key/,
      )
      await db.schema.dropSchema('public', true)
      await db.schema.createSchema('public')
      await db.migrate.latest()
      assert.equal(await db.schema.hasTable('LegacyChatMessage'), true)
      assert.equal(await db.schema.hasColumn('ChatMessage', 'sequence'), true)
      assert.deepEqual((await db.migrate.latest())[1], [])
    } finally {
      if (db) await db.destroy()
      await admin.raw('DROP DATABASE IF EXISTS ??', [name])
      await admin.destroy()
    }
  },
)
