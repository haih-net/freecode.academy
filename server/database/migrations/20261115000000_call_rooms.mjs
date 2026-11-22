/** @param {import('knex').Knex} db */
export async function up(db) {
  await db.schema.createTable('CallRoom', (t) => {
    t.text('id').primary().notNullable()
    t.text('title').notNullable()
    t.text('createdById').notNullable().references('id').inTable('User')
    t.boolean('authenticatedOnly').notNullable().defaultTo(false)
    t.text('accessCodeHash').nullable()
    t.boolean('closed').notNullable().defaultTo(false)
    t.integer('version').notNullable().defaultTo(1)
  })
}
/** @param {import('knex').Knex} db */
export async function down(db) {
  await db.schema.dropTable('CallRoom')
}
