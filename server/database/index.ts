import '../env.ts'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import type { Database } from 'better-sqlite3'
import knex, { type Knex } from 'knex'
import { initializeSchema } from './schema.ts'

function restoreTypes(result: unknown): unknown {
  if (Array.isArray(result)) {
    return result.map(restoreTypes)
  }
  if (!result || typeof result !== 'object') {
    return result
  }
  const row = result as Record<string, unknown>
  for (const field of ['createdAt', 'updatedAt', 'expiredAt']) {
    if (typeof row[field] === 'number') {
      row[field] = new Date(row[field])
    }
  }
  for (const field of ['sudo', 'isAiAgent']) {
    if (typeof row[field] === 'number') {
      row[field] = Boolean(row[field])
    }
  }
  for (const field of ['lastOccurredAt', 'size', 'chainId']) {
    if (typeof row[field] === 'string') {
      const value = Number(row[field])
      if (!Number.isSafeInteger(value)) {
        throw new Error(`Unsafe integer in ${field}`)
      }
      row[field] = value
    }
  }
  if (typeof row.data === 'string') {
    row.data = JSON.parse(row.data)
  }
  return row
}

export function createDatabase(): Knex {
  const client = process.env.DATABASE_CLIENT || 'sqlite'
  if (client !== 'sqlite' && client !== 'pg') {
    throw new Error('DATABASE_CLIENT must be sqlite or pg')
  }
  const migrations: Knex.MigratorConfig = {
    directory: resolve('server/database/migrations'),
    loadExtensions: ['.mjs'],
    extension: 'mjs',
  }

  if (client === 'pg') {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required for PostgreSQL')
    }
    return knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: { min: 0, max: 10 },
      migrations,
      postProcessResponse: restoreTypes,
      acquireConnectionTimeout: 10000,
    })
  }
  const filename =
    process.env.DATABASE_FILENAME || 'server/database/data/database.sqlite'

  if (filename !== ':memory:') {
    mkdirSync(dirname(filename), { recursive: true })
  }
  return knex({
    client: 'better-sqlite3',
    migrations,
    connection: { filename },
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 1,
      afterCreate(
        connection: Database,
        done: (error: Error | null, connection: Database) => void,
      ): void {
        try {
          connection.pragma('busy_timeout = 5000')
          connection.pragma('journal_mode = WAL')
          connection.pragma('foreign_keys = ON')
          connection.function(
            'lower',
            { deterministic: true },
            (value: unknown) =>
              typeof value === 'string' ? value.toLowerCase() : null,
          )
          // Only legacy databases use the frozen version-based upgrader.
          if (connection.pragma('user_version', { simple: true }) !== 0) {
            initializeSchema(connection)
          }
          done(null, connection)
        } catch (error) {
          done(
            error instanceof Error ? error : new Error(String(error)),
            connection,
          )
        }
      },
    },
    postProcessResponse: restoreTypes,
    acquireConnectionTimeout: 10000,
  })
}

function databaseErrorCode(error: unknown): string | undefined {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code
  }
  return undefined
}

export async function ensureDatabase(database: Knex): Promise<void> {
  if (database.client.config.client !== 'pg') {
    return
  }
  try {
    await database.raw('SELECT 1')
    return
  } catch (error) {
    if (databaseErrorCode(error) !== '3D000') {
      throw error
    }
  }

  const connection = database.client
    .connectionSettings as Knex.PgConnectionConfig

  const name = connection.database || connection.user
  if (!name) {
    throw new Error('Specify the PostgreSQL database name in DATABASE_URL')
  }
  const maintenance = knex({
    client: 'pg',
    // Knex makes the password non-enumerable, so copy it explicitly.
    connection: {
      ...connection,
      password: connection.password,
      database: 'postgres',
    },
    pool: { min: 0, max: 1 },
    acquireConnectionTimeout: 10000,
  })

  try {
    // Quote a single database identifier, including names with dots or quotes.
    await maintenance.raw(`CREATE DATABASE "${name.replaceAll('"', '""')}"`)
  } catch (error) {
    const code = databaseErrorCode(error)
    if (code === '42P04' || code === '23505') {
      // Another process may have created the database after our connection failed.
      await database.raw('SELECT 1')
    } else if (code === '42501') {
      throw new Error(
        `PostgreSQL database "${name}" does not exist and the configured role cannot create it. Grant CREATEDB or create the database manually.`,
        { cause: error },
      )
    } else {
      throw error
    }
  } finally {
    await maintenance.destroy()
  }
}

export async function migrateDatabase(
  database: Knex,
): Promise<[number, string[]]> {
  await ensureDatabase(database)
  if (database.client.config.client !== 'better-sqlite3') {
    return database.migrate.latest()
  }
  const deadline = Date.now() + 10000
  for (;;) {
    try {
      // Knex disables response processing on the client used for migrations.
      const migrationDatabase = database.withUserParams({
        ...database.userParams,
      })

      return await migrationDatabase.transaction(async (trx) => {
        // Serialize bootstrap too: Knex creates its metadata before taking its lock.
        await trx.raw(
          'CREATE TABLE IF NOT EXISTS database_migration_lock (id INTEGER PRIMARY KEY)',
        )
        await trx.raw(
          'INSERT OR IGNORE INTO database_migration_lock (id) VALUES (1)',
        )
        return trx.migrate.latest()
      })
    } catch (error) {
      const code = databaseErrorCode(error)
      if (
        (code !== 'SQLITE_BUSY' && code !== 'SQLITE_BUSY_SNAPSHOT') ||
        Date.now() >= deadline
      ) {
        throw error
      }
      // Restart the transaction if another writer invalidated its read snapshot.
      await delay(50)
    }
  }
}

let database: Knex | undefined

export function getDatabase(): Knex {
  database ??= createDatabase()
  return database
}
