import WebSocket from 'ws'
import { readFileSync } from 'node:fs'

export interface CodexEvent {
  method: string
  params: {
    [key: string]: unknown
    threadId?: string
    delta?: string
    turn?: { id: string; status: string; error?: { message: string } }
  }
}

export function codexSecret(): string {
  const path = process.env.CODEX_TRANSPORT_TOKEN_FILE
  if (!path) {
    throw new Error('Не настроена авторизация сервера Codex')
  }
  return readFileSync(path, 'utf8').trim()
}

export interface CodexConnection {
  request<T>(method: string, params: object): Promise<T>
  onEvent?: (event: CodexEvent) => void
  onClose?: (error: Error) => void
  close(): void
}

export async function connectCodex(): Promise<CodexConnection> {
  const url = process.env.CODEX_SERVER_URL
  if (!url) {
    throw new Error('Не настроен адрес сервера Codex')
  }
  const ws = new WebSocket(url, {
    headers: { Authorization: `Bearer ${codexSecret()}` },
    handshakeTimeout: 10000,
    maxPayload: 8 * 1024 * 1024,
  })

  let sequence = 0
  const pending = new Map<
    number,
    {
      resolve(value: unknown): void
      reject(error: Error): void
      timer: ReturnType<typeof setTimeout>
    }
  >()

  const client: CodexConnection = {
    request: <T>(method: string, params: object): Promise<T> =>
      new Promise<T>((resolve, reject) => {
        const id = ++sequence
        const timer = setTimeout(() => {
          pending.delete(id)
          reject(new Error(`Истекло время ожидания Codex: ${method}`))
        }, 30000)

        pending.set(id, {
          resolve: (value) => resolve(value as T),
          reject,
          timer,
        })
        ws.send(JSON.stringify({ id, method, params }), (error) => {
          if (error) {
            clearTimeout(timer)
            pending.delete(id)
            reject(error)
          }
        })
      }),
    close: () => {
      ws.close()
      const timer = setTimeout(() => ws.terminate(), 1000)
      timer.unref()
      ws.once('close', () => clearTimeout(timer))
    },
  }

  ws.on('message', (raw) => {
    try {
      const message = JSON.parse(raw.toString()) as CodexEvent & {
        id?: number
        result?: unknown
        error?: { message: string }
      }

      if (message.id !== undefined) {
        const call = pending.get(message.id)
        if (call) {
          pending.delete(message.id)
          clearTimeout(call.timer)
          if (message.error) {
            call.reject(new Error(message.error.message))
          } else {
            call.resolve(message.result)
          }
        } else if (message.method) {
          ws.send(
            JSON.stringify({
              id: message.id,
              error: {
                code: -32601,
                message: 'Инструменты отключены в этом чате',
              },
            }),
          )
        }
      } else if (message.method) {
        client.onEvent?.(message)
      }
    } catch {
      ws.close(1002, 'Invalid protocol')
    }
  })
  ws.on('close', () => {
    const error = new Error('Соединение с Codex закрыто')
    for (const call of pending.values()) {
      clearTimeout(call.timer)
      call.reject(error)
    }
    pending.clear()
    client.onClose?.(error)
  })
  ws.on('error', () => ws.close())
  try {
    await new Promise<void>((resolve, reject) => {
      ws.once('open', resolve)
      ws.once('error', reject)
    })
    await client.request('initialize', {
      clientInfo: {
        name: 'website-chat',
        title: 'Чат сайта',
        version: '1.0.0',
      },
    })
    ws.send(JSON.stringify({ method: 'initialized' }))
    return client
  } catch (error) {
    ws.terminate()
    throw error
  }
}
