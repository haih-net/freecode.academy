/** @param {import('knex').Knex} db */
export async function up(db) {
  // SQLite already receives these tables from its original initial migration.
  if (db.client.config.client !== 'pg') return
  /** @param {import('knex').Knex.CreateTableBuilder} table */
  const id = (table) => table.text('id').primary().notNullable()
  /** @param {import('knex').Knex.CreateTableBuilder} table */
  const dates = (table) =>
    table
      .timestamp('createdAt', { useTz: true })
      .notNullable()
      .defaultTo(db.fn.now())
  /** @param {import('knex').Knex.CreateTableBuilder} table
   * @param {string} field
   * @param {string} target */
  const ref = (table, field, target) =>
    table.text(field).references('id').inTable(target)
  await db.schema.createTable('ChatSetting', (t) => {
    id(t)
    t.text('value').notNullable()
  })
  await db.schema.createTable('ChatDialogue', (t) => {
    t.text('chatId').primary().notNullable()
    dates(t)
    t.text('channel')
      .notNullable()
      .defaultTo('chat')
      .checkIn(['chat', 'feedback'])
    t.index(['createdAt', 'chatId'])
  })
  await db.schema.renameTable('ChatMessage', 'LegacyChatMessage')
  // PostgreSQL keeps constraint/index names when a table is renamed.
  // Free the original primary-key index name for the new ChatMessage table.
  for (const suffix of ['pkey', 'createdBy_fkey', 'toUserId_fkey']) {
    await db.raw('ALTER TABLE ?? RENAME CONSTRAINT ?? TO ??', [
      'LegacyChatMessage',
      `ChatMessage_${suffix}`,
      `LegacyChatMessage_${suffix}`,
    ])
  }
  await db.schema.createTable('ChatMessage', (t) => {
    t.increments('sequence')
    t.text('chatId')
      .notNullable()
      .references('chatId')
      .inTable('ChatDialogue')
      .onDelete('CASCADE')
    t.text('id')
    t.text('role')
      .notNullable()
      .checkIn(['user', 'assistant', 'tool_call', 'tool'])
    t.integer('indexed').notNullable().checkIn([0, 1])
    t.text('payload').notNullable()
    t.check('CAST(?? AS jsonb) IS NOT NULL', ['payload'])
    t.index(['chatId', 'sequence'])
    t.index(['chatId', 'id'])
    t.index(['indexed', 'sequence'])
  })
  await db.schema.createTable('ClientCertificateAccount', (t) => {
    t.text('fingerprint').primary().notNullable()
    ref(t, 'userId', 'User').notNullable()
  })
  await db.schema.createTable('PageError', (t) => {
    t.text('url').primary().notNullable()
    t.bigInteger('lastOccurredAt').notNullable()
    t.integer('count').notNullable().defaultTo(1)
    t.text('status').checkIn(['Review', 'Resolved'])
    t.integer('statusCode').checkBetween([400, 599])
    t.index('lastOccurredAt')
  })
  await db.schema.createTable('PageErrorEvent', (t) => {
    t.text('eventKey').primary().notNullable()
    t.text('url')
      .notNullable()
      .references('url')
      .inTable('PageError')
      .onDelete('CASCADE')
    t.index('url')
  })
  await db.schema.alterTable('KBConcept', (t) => {
    t.double('lat')
    t.double('lng')
  })
}

export async function down() {
  throw new Error(
    'Application data must be preserved: restore a backup instead',
  )
}
