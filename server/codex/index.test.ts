import { afterEach, beforeEach, expect, it } from 'vitest'
import express from 'express'
import { createServer, type Server } from 'node:http'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { WebSocketServer, type WebSocket } from 'ws'
import { setupCodexChat } from './index'

let appServer: Server
let rpc: WebSocketServer
let directory: string
let base: string
let connections = 0
let maximumConnections = 0
let openConnections = 0
let sequence = 0
const methods: string[] = []
const previous = { ...process.env }

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'codex-chat-test-'))
  await writeFile(join(directory, 'secret'), 'codex-test-secret')
  process.env.CODEX_TRANSPORT_TOKEN_FILE = join(directory, 'secret')
  process.env.CODEX_SESSION_DIRECTORY = join(directory, 'sessions')
  connections = 0
  maximumConnections = 0
  openConnections = 0
  methods.length = 0
  rpc = new WebSocketServer({ port: 0, host: '127.0.0.1' })
  await new Promise<void>((resolve) => rpc.once('listening', resolve))
  const address = rpc.address()
  if (!address || typeof address === 'string') {
    throw new Error('Неожиданный адрес')
  }
  process.env.CODEX_SERVER_URL = `ws://127.0.0.1:${address.port}`
  rpc.on('connection', (socket: WebSocket) => {
    connections += 1
    maximumConnections = Math.max(maximumConnections, ++openConnections)
    socket.on('close', () => {
      openConnections -= 1
    })
    socket.on('message', (raw) => {
      const request = JSON.parse(raw.toString()) as {
        id?: number
        method: string
        params?: { threadId?: string }
      }

      if (request.id === undefined) {
        return
      }
      methods.push(request.method)
      if (request.method === 'thread/start') {
        socket.send(
          JSON.stringify({
            id: request.id,
            result: { thread: { id: `thread-${++sequence}` } },
          }),
        )
      } else if (request.method === 'turn/start') {
        const threadId = request.params?.threadId
        const turn = { id: `turn-${++sequence}`, status: 'completed' }
        socket.send(JSON.stringify({ id: request.id, result: { turn } }))
        setTimeout(() => {
          for (const [method, params] of [
            [
              'item/started',
              {
                item: {
                  id: 'tool-1',
                  type: 'mcpToolCall',
                  status: 'inProgress',
                },
              },
            ],
            [
              'item/mcpToolCall/progress',
              { itemId: 'tool-1', message: 'Обработка' },
            ],
            [
              'item/completed',
              {
                item: {
                  id: 'tool-1',
                  type: 'mcpToolCall',
                  status: 'completed',
                },
              },
            ],
            ['item/agentMessage/delta', { delta: 'Ответ' }],
            ['turn/completed', { turn }],
          ] as const) {
            socket.send(
              JSON.stringify({ method, params: { threadId, ...params } }),
            )
          }
        }, 50)
      } else {
        socket.send(JSON.stringify({ id: request.id, result: {} }))
      }
    })
  })
  const app = express()
  setupCodexChat(app)
  appServer = createServer(app)
  await new Promise<void>((resolve) =>
    appServer.listen(0, '127.0.0.1', resolve),
  )
  const appAddress = appServer.address()
  if (!appAddress || typeof appAddress === 'string') {
    throw new Error('Неожиданный адрес')
  }
  base = `http://127.0.0.1:${appAddress.port}/api/codex`
})

afterEach(async () => {
  appServer.closeAllConnections()
  await new Promise<void>((resolve) => appServer.close(() => resolve()))
  for (const client of rpc.clients) {
    client.terminate()
  }
  await new Promise<void>((resolve) => rpc.close(() => resolve()))
  for (const key of [
    'CODEX_SERVER_URL',
    'CODEX_TRANSPORT_TOKEN_FILE',
    'CODEX_SESSION_DIRECTORY',
  ]) {
    if (previous[key] === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = previous[key]
    }
  }
  await rm(directory, { recursive: true, force: true })
})

async function token(): Promise<string> {
  const response = await fetch(`${base}/token`, { method: 'POST' })
  return ((await response.json()) as { token: string }).token
}

function send(value: string): Promise<Response> {
  return fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'dialog-token': value },
    body: JSON.stringify({ message: 'Привет' }),
  })
}

it('не открывает соединение при выдаче токена; передаёт события и закрывает соединения после параллельных запросов', async () => {
  const a = await token()
  const b = await token()
  expect(connections).toBe(0)
  const [first, second] = await Promise.all([send(a), send(b)])
  expect((await send(a)).status).toBe(409)
  const [firstBody, secondBody] = await Promise.all([
    first.text(),
    second.text(),
  ])

  expect(firstBody).toContain('item/mcpToolCall/progress')
  expect(firstBody).toContain('Ответ')
  expect(firstBody).toContain('[DONE]')
  expect(secondBody).toContain('[DONE]')
  expect(maximumConnections).toBe(2)
  await expect.poll(() => openConnections).toBe(0)
  const continued = await send(a)
  expect(await continued.text()).toContain('[DONE]')
  expect(methods.filter((method) => method === 'thread/start')).toHaveLength(2)
  expect(methods.filter((method) => method === 'thread/resume')).toHaveLength(1)
  expect(connections).toBe(3)
  await expect.poll(() => openConnections).toBe(0)
})
