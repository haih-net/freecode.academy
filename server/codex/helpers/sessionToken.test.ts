import { afterEach, describe, expect, it, vi } from 'vitest'
import jwt from 'jsonwebtoken'
import { issueSessionToken, verifySessionToken } from './sessionToken'

vi.mock('./connectCodex', () => ({
  codexSecret: () => 'test-secret-for-codex-sessions',
}))
afterEach(() => vi.restoreAllMocks())

describe('токены сессий Codex', () => {
  it('разделяет диалоги и отвергает подмену идентификатора', () => {
    const first = issueSessionToken('first')
    const second = issueSessionToken('second')
    expect(verifySessionToken(first)).toBe('first')
    expect(verifySessionToken(second)).toBe('second')
    const parts = first.split('.')
    parts[1] = Buffer.from(JSON.stringify({ sessionId: 'second' })).toString(
      'base64url',
    )
    expect(verifySessionToken(parts.join('.'))).toBeNull()
    expect(verifySessionToken(undefined)).toBeNull()
  })

  it('не принимает токены другого назначения даже с той же подписью', () => {
    const token = jwt.sign(
      { sessionId: 'first' },
      'test-secret-for-codex-sessions',
      {
        audience: 'another-service',
        issuer: 'website-chat',
      },
    )

    expect(verifySessionToken(token)).toBeNull()
  })
})
