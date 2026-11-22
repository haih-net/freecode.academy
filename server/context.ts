import type { Request } from 'express'
import type { Knex } from 'knex'
import { getDatabase } from './database'
import { authenticate } from './schema/types/User/helpers/auth'
import type { Context } from './schema/builder'

export async function createContext(
  req: Request,
  database: Knex = getDatabase(),
): Promise<Context> {
  const header = req.headers.authorization
  const token = header?.match(/^Bearer\s+(\S+)$/i)?.[1] ?? null
  return {
    req,
    db: database,
    currentUser: token ? await authenticate(token, database) : null,
  }
}
