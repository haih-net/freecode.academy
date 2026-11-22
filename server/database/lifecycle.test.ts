import { afterEach, expect, it, vi } from 'vitest'

// Keep schema imports independent of runtime database configuration.
afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

it('loads the GraphQL schema without PostgreSQL credentials and validates them on database access', async () => {
  vi.resetModules()
  vi.stubEnv('DATABASE_CLIENT', 'pg')
  vi.stubEnv('DATABASE_URL', '')
  const { schema } = await import('../schema')
  expect(schema.getQueryType()).toBeDefined()
  const { getDatabase } = await import('./index')
  expect(() => getDatabase()).toThrow('DATABASE_URL is required for PostgreSQL')
})

it('shares the runtime database while preserving explicitly supplied storage databases', async () => {
  vi.resetModules()
  vi.stubEnv('DATABASE_CLIENT', 'sqlite')
  vi.stubEnv('DATABASE_FILENAME', ':memory:')
  const { createDatabase, getDatabase } = await import('./index')
  const { ChatStorage, chatStorage } = await import('../chat/storage')
  const database = getDatabase()
  const explicitDatabase = createDatabase()
  try {
    expect(getDatabase()).toBe(database)
    expect(chatStorage.database).toBe(database)
    expect(new ChatStorage(explicitDatabase).database).toBe(explicitDatabase)
  } finally {
    await database.destroy()
    await explicitDatabase.destroy()
  }
})
