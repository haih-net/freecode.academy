// @ts-check
import { baselineDatabase } from '../server/database/baseline/index.ts'
import { db, migrateDatabase } from '../server/database/index.ts'

try {
  const [command = 'latest', name] = process.argv.slice(2)
  switch (command) {
    case 'baseline':
      console.log(await baselineDatabase(db))
      break
    case 'latest':
      console.log(await migrateDatabase(db))
      break
    case 'list': {
      const [completed, pending] = await db.migrate.list()
      console.log({ completed, pending })
      break
    }
    case 'make':
      if (!name || !/^[a-zA-Z0-9_-]+$/.test(name))
        throw new Error(
          'Supply a migration name using letters, numbers, underscores or hyphens',
        )
      console.log(
        await db.migrate.make(name, { stub: 'server/database/migration.stub' }),
      )
      break
    default:
      throw new Error('Expected baseline, latest, list or make <name>')
  }
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await db.destroy()
}
