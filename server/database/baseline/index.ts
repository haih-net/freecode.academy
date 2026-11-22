import { readFileSync, readdirSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import type { Knex } from 'knex'

export const initialMigration = '20261108000000_initial.mjs'

interface SchemaObject {
  kind: string
  name: string
  definition: unknown
}

export async function baselineDatabase(
  database: Knex,
): Promise<[number, string[]]> {
  if (database.client.config.client !== 'pg') {
    throw new Error(
      'Baseline is only supported for the existing PostgreSQL database',
    )
  }
  const expected: SchemaObject[] = JSON.parse(
    readFileSync(new URL('./schema.json', import.meta.url), 'utf8'),
  )

  const sql = readFileSync(new URL('./inspect.sql', import.meta.url), 'utf8')
  const directory = new URL('../migrations/', import.meta.url)
  const names = readdirSync(directory)
    .filter((name) => name.endsWith('.mjs'))
    .sort()

  return database
    .withUserParams({ ...database.userParams })
    .transaction(async (trx) => {
      await trx.raw(
        "SELECT pg_advisory_xact_lock(hashtextextended('freecode:migrations', 0))",
      )
      if (await trx.schema.hasTable('knex_migrations')) {
        const completed = await trx<{ name: string }>('knex_migrations').select(
          'name',
        )

        if (completed.some(({ name }) => name === initialMigration)) {
          return [0, []]
        }
        if (completed.length) {
          throw new Error(
            'Cannot baseline a database with an existing migration history',
          )
        }
      }
      const { rows }: { rows: SchemaObject[] } = await trx.raw(sql)
      const key = (row: SchemaObject): string => `${row.kind}: ${row.name}`
      const actual = new Map(rows.map((row) => [key(row), row.definition]))
      const expectedMap = new Map(
        expected.map((row) => [key(row), row.definition]),
      )

      const differences = [
        ...new Set([...actual.keys(), ...expectedMap.keys()]),
      ].filter(
        (name) =>
          !actual.has(name) ||
          !expectedMap.has(name) ||
          !isDeepStrictEqual(actual.get(name), expectedMap.get(name)),
      )

      if (differences.length) {
        throw new Error(
          `Database does not match the initial schema (${differences.length} differences):\n${differences.slice(0, 30).join('\n')}`,
        )
      }
      // Let Knex create and lock its own metadata and record the initial migration.
      // Only this explicit command replaces initial DDL with the verified baseline.
      return trx.migrate.up({
        name: initialMigration,
        migrationSource: {
          getMigrations: async () => names,
          getMigrationName: (name: string) => name,
          getMigration: async (name: string) =>
            name === initialMigration
              ? {
                  up: async () => {
                    // The schema was verified above; Knex only records its baseline.
                  },
                  down: async () => {
                    throw new Error('Baseline cannot be rolled back')
                  },
                }
              : import(new URL(name, directory).href),
        },
      })
    })
}
