import jwt from 'jsonwebtoken'
import { codexSecret } from './connectCodex'

export function issueSessionToken(sessionId: string): string {
  return jwt.sign({ sessionId }, codexSecret(), {
    algorithm: 'HS256',
    audience: 'website-codex-chat',
    issuer: 'website-chat',
  })
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token) {
    return null
  }
  try {
    const payload = jwt.verify(token, codexSecret(), {
      algorithms: ['HS256'],
      audience: 'website-codex-chat',
      issuer: 'website-chat',
    })

    return typeof payload !== 'string' && typeof payload.sessionId === 'string'
      ? payload.sessionId
      : null
  } catch {
    return null
  }
}
