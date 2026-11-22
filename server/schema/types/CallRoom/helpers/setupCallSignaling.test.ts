import { createServer, type Server } from 'node:http'
import { once } from 'node:events'
import type { AddressInfo } from 'node:net'
import knex, { type Knex } from 'knex'
import { WebSocket } from 'ws'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupCallSignaling } from './setupCallSignaling'
import {
  createCallSessionToken,
  readCallSessionToken,
} from './createCallSessionToken'
import { callEvents } from './callRuntime'
import type { CallServerMessage } from '../../../../../app/Custom/components/Calls/interfaces'

describe('call signaling sessions', () => {
  let db: Knex
  let server: Server
  let stop: () => void
  let origin: string
  const sockets: WebSocket[] = []
  beforeEach(async () => {
    vi.stubEnv('JWT_SECRET', 'call-resume-test-secret')
    db = knex({
      client: 'better-sqlite3',
      connection: { filename: ':memory:' },
      useNullAsDefault: true,
    })
    await db.schema.createTable('CallRoom', (table) => {
      table.string('id').primary()
      table.integer('version')
      table.boolean('closed')
      table.boolean('authenticatedOnly')
    })
    await db.schema.createTable('User', (table) => {
      table.string('id').primary()
      table.string('status')
      table.string('image')
    })
    await db('CallRoom').insert({
      id: 'room',
      version: 1,
      closed: false,
      authenticatedOnly: false,
    })
    server = createServer()
    stop = setupCallSignaling(server, db)
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  })
  afterEach(async () => {
    stop()
    for (const socket of sockets.splice(0)) {
      socket.terminate()
    }
    await new Promise<void>((resolve) => server.close(() => resolve()))
    await db.destroy()
    vi.unstubAllEnvs()
    vi.useRealTimers()
  })
  async function open(): Promise<WebSocket> {
    const socket = new WebSocket(
      `${origin.replace('http:', 'ws:')}/api/calls/socket`,
      { headers: { origin } },
    )

    sockets.push(socket)
    await once(socket, 'open')
    return socket
  }
  function message(socket: WebSocket): Promise<CallServerMessage> {
    return once(socket, 'message').then(
      ([raw]) => JSON.parse(raw.toString()) as CallServerMessage,
    )
  }
  async function join(): Promise<{
    socket: WebSocket
    welcome: Extract<CallServerMessage, { type: 'welcome' }>
  }> {
    const socket = await open()
    const result = message(socket)
    socket.send(
      JSON.stringify({
        type: 'join',
        token: createCallSessionToken({
          id: crypto.randomUUID(),
          roomId: 'room',
          name: 'Гость',
          userId: null,
        }),
      }),
    )
    const welcome = await result
    if (welcome.type !== 'welcome') {
      throw new Error('Expected welcome')
    }
    return { socket, welcome }
  }
  it('retains identity and presence across a disconnect and allows resuming after a code change', async () => {
    const first = await join()
    const second = await join()
    const offline = message(second.socket)
    first.socket.close()
    expect(await offline).toMatchObject({
      type: 'peer-status',
      id: first.welcome.id,
      connected: false,
    })
    await db('CallRoom').where({ id: 'room' }).update({ version: 2 })
    const resumed = await open()
    const result = message(resumed)
    const online = message(second.socket)
    resumed.send(
      JSON.stringify({ type: 'join', token: first.welcome.sessionToken }),
    )
    expect(await result).toMatchObject({
      type: 'welcome',
      id: first.welcome.id,
      epoch: first.welcome.epoch,
      peers: [{ id: second.welcome.id }],
    })
    expect(await online).toMatchObject({
      type: 'peer-status',
      id: first.welcome.id,
      connected: true,
    })
    const left = message(second.socket)
    resumed.send(JSON.stringify({ type: 'leave' }))
    expect(await left).toMatchObject({ type: 'left', id: first.welcome.id })
  })
  it('resumes after a signaling restart, but rejects a newly restricted or closed room', async () => {
    const first = await join()
    stop()
    stop = setupCallSignaling(server, db)
    const resumed = await open()
    const result = message(resumed)
    resumed.send(
      JSON.stringify({ type: 'join', token: first.welcome.sessionToken }),
    )
    const welcome = await result
    expect(welcome).toMatchObject({ type: 'welcome', id: first.welcome.id })
    if (welcome.type !== 'welcome') {
      throw new Error('Expected welcome')
    }
    expect(welcome.epoch).not.toBe(first.welcome.epoch)
    const denied = message(resumed)
    await db('CallRoom')
      .where({ id: 'room' })
      .update({ authenticatedOnly: true })
    callEvents.emit('settings', 'room', true)
    expect(await denied).toMatchObject({ type: 'settings' })
    const restricted = await open()
    const refusal = message(restricted)
    restricted.send(
      JSON.stringify({ type: 'join', token: welcome.sessionToken }),
    )
    expect(await refusal).toMatchObject({ type: 'error' })
    await db('CallRoom').where({ id: 'room' }).update({ closed: true })
    const closed = await open()
    const closure = message(closed)
    closed.send(JSON.stringify({ type: 'join', token: welcome.sessionToken }))
    expect(await closure).toEqual({ type: 'closed' })
  })
  it.each([false, true])(
    'kicks a session without revoking its token (disconnected: %s)',
    async (disconnected) => {
      const first = await join()
      const observer = await join()
      if (disconnected) {
        const offline = message(observer.socket)
        first.socket.close()
        expect(await offline).toMatchObject({
          type: 'peer-status',
          connected: false,
        })
      }
      const removed = message(observer.socket)
      const closed = disconnected ? undefined : once(first.socket, 'close')
      callEvents.emit('kick', 'room', first.welcome.id)
      expect(await removed).toEqual({ type: 'left', id: first.welcome.id })
      if (closed) {
        expect((await closed)[0]).toBe(1008)
      }
      const newcomer = await join()
      expect(newcomer.welcome.peers.map((peer) => peer.id)).not.toContain(
        first.welcome.id,
      )
      const resumed = await open()
      const result = message(resumed)
      resumed.send(
        JSON.stringify({ type: 'join', token: first.welcome.sessionToken }),
      )
      expect(await result).toMatchObject({
        type: 'welcome',
        id: first.welcome.id,
      })
    },
  )
  it('keeps signed sessions valid without expiry and rejects tampering', () => {
    const session = {
      id: 'session',
      roomId: 'room',
      name: 'Гость',
      userId: null,
    }

    const token = createCallSessionToken(session)
    expect(readCallSessionToken(token)).toEqual(session)
    expect(() => readCallSessionToken(`${token}tampered`)).toThrow()
    vi.useFakeTimers()
    vi.setSystemTime(Date.now() + 24 * 60 * 60 * 1000 + 1000)
    expect(readCallSessionToken(token)).toEqual(session)
  })
})
