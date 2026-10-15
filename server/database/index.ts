import '../env'
import knex, { type Knex } from 'knex'

export function createDatabase(): Knex {
  return knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 10 },
    acquireConnectionTimeout: 10000,
  })
}

export const db: Knex = createDatabase()
