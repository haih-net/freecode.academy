import jwt from 'jsonwebtoken'
import { jwtSecret } from '../../User/helpers/auth'
import type { CallSession } from '../interfaces'

export function createCallSessionToken(session: CallSession): string {
  return jwt.sign({ ...session, type: 'CallSession' }, jwtSecret(), {
    algorithm: 'HS256',
    audience: 'call-signaling',
  })
}

export function readCallSessionToken(token: string): CallSession {
  const payload = jwt.verify(token, jwtSecret(), {
    algorithms: ['HS256'],
    audience: 'call-signaling',
  })

  if (
    typeof payload === 'string' ||
    payload.type !== 'CallSession' ||
    typeof payload.id !== 'string' ||
    typeof payload.roomId !== 'string' ||
    typeof payload.name !== 'string' ||
    !(typeof payload.userId === 'string' || payload.userId === null)
  ) {
    throw new Error('Некорректная сессия звонка')
  }
  return {
    id: payload.id,
    roomId: payload.roomId,
    name: payload.name,
    userId: payload.userId,
  }
}
