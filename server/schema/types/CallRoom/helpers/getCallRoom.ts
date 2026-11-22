import type { Knex } from 'knex'
import type { CallRoomRecord } from '../interfaces'

export async function getCallRoom(
  db: Knex,
  id: string,
): Promise<CallRoomRecord> {
  const room = await db<CallRoomRecord>('CallRoom').where({ id }).first()
  if (!room) {
    throw new Error('Комната не найдена')
  }
  return room
}
