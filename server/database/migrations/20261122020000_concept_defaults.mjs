/** @param {import('knex').Knex} db */
export async function up(db) {
  if (db.client.config.client !== 'pg') return
  // Only defaults for new records change; existing publication visibility is preserved.
  await db.raw(`ALTER TABLE "KBConcept"
    ALTER COLUMN visibility SET DEFAULT 'public',
    ALTER COLUMN quality SET DEFAULT 0`)
}

/** @param {import('knex').Knex} db */
export async function down(db) {
  if (db.client.config.client !== 'pg') return
  await db.raw(`ALTER TABLE "KBConcept"
    ALTER COLUMN visibility SET DEFAULT 'hidden',
    ALTER COLUMN quality SET DEFAULT 0.7`)
}
