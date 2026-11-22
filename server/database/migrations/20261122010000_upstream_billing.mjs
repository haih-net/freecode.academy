/** @param {import('knex').Knex} db */
export async function up(db) {
  if (db.client.config.client !== 'pg') return
  // Retain every legacy payment and its original Transaction.ethTransactionId FK.
  await db.schema.renameTable('EthTransaction', 'LegacyEthTransaction')
  await db.raw('ALTER TABLE ?? RENAME CONSTRAINT ?? TO ??', [
    'LegacyEthTransaction',
    'EthTransaction_pkey',
    'LegacyEthTransaction_pkey',
  ])
  await db.schema.createTable('EthTransaction', (t) => {
    t.text('id').primary().notNullable()
    t.bigInteger('chainId').notNullable()
    t.text('txHash').notNullable()
    t.text('transactionId')
      .notNullable()
      .unique()
      .references('id')
      .inTable('Transaction')
    t.unique(['chainId', 'txHash'])
  })
  // A linked legacy payment has already been credited: preserve idempotency.
  // Unlinked payments remain available in LegacyEthTransaction for inspection.
  await db.raw(`INSERT INTO "EthTransaction" (id, "chainId", "txHash", "transactionId")
    SELECT e.id, e."chainId", lower(e."txHash"), t.id
    FROM "LegacyEthTransaction" e JOIN "Transaction" t ON t."ethTransactionId" = e.id`)
}

export async function down() {
  throw new Error('Payment records must be preserved: restore a backup instead')
}
