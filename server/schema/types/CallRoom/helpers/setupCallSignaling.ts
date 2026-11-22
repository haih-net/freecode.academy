import { randomUUID } from 'node:crypto'
import type { Server } from 'node:http'
import type { Knex } from 'knex'
import { WebSocketServer, WebSocket } from 'ws'
import { callEvents } from './callRuntime'
import { getCallRoom } from './getCallRoom'
import {
  createCallSessionToken,
  readCallSessionToken,
} from './createCallSessionToken'
import type { CallSession } from '../interfaces'
import { getCallIceServers } from './getCallIceServers'

interface CallClient {
  id: string
  roomId: string
  name: string
  userId: string | null
  image: string | null
  socket: WebSocket
  disconnectTimer?: ReturnType<typeof setTimeout>
  alive: boolean
  disconnectedAt: number | null
}

export function setupCallSignaling(server: Server, db: Knex): () => void {
  const wss = new WebSocketServer({ noServer: true, maxPayload: 0 })
  const clients: Map<string, CallClient> = new Map()
  const epoch = randomUUID()
  let shuttingDown = false
  const send = (socket: WebSocket, data: unknown): void => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    }
  }

  const broadcast = (roomId: string, data: unknown, except?: string): void => {
    for (const peer of clients.values()) {
      if (peer.roomId === roomId && peer.id !== except) {
        send(peer.socket, data)
      }
    }
  }

  const remove = (client: CallClient): void => {
    if (clients.get(client.id) !== client) {
      return
    }
    clearTimeout(client.disconnectTimer)
    clients.delete(client.id)
    broadcast(client.roomId, { type: 'left', id: client.id })
  }

  const closeRoom = (id: string): void => {
    for (const peer of clients.values()) {
      if (peer.roomId === id) {
        send(peer.socket, { type: 'closed' })
        peer.socket.close(1000, 'Room closed')
        remove(peer)
      }
    }
  }

  const settings = (id: string, authenticatedOnly: boolean): void => {
    broadcast(id, { type: 'settings' })
    for (const peer of clients.values()) {
      if (peer.roomId === id && authenticatedOnly && !peer.userId) {
        send(peer.socket, {
          type: 'error',
          message:
            'Создатель включил вход только для авторизованных пользователей',
        })
        peer.socket.close(1008, 'Authentication required')
        remove(peer)
      }
    }
  }

  const kick = (roomId: string, participantId: string): void => {
    const peer = clients.get(participantId)
    if (peer?.roomId !== roomId) {
      return
    }
    send(peer.socket, {
      type: 'error',
      message: 'Администратор исключил вас из звонка.',
    })
    remove(peer)
    peer.socket.close(1008, 'Participant removed')
  }

  callEvents.on('kick', kick)
  callEvents.on('closed', closeRoom)
  callEvents.on('settings', settings)
  // Vite handles upgrades on its own HMR path.
  const onUpgrade = (
    req: import('node:http').IncomingMessage,
    socket: import('node:stream').Duplex,
    head: Buffer,
  ): void => {
    if (req.url?.split('?')[0] !== '/api/calls/socket') {
      return
    }
    const origin = req.headers.origin
    if (
      !origin ||
      (() => {
        try {
          return new URL(origin).host !== req.headers.host
        } catch {
          return true
        }
      })()
    ) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n')
      socket.destroy()
      return
    }
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws))
  }

  server.on('upgrade', onUpgrade)
  wss.on('connection', (socket) => {
    let client: CallClient | undefined
    let joining = false
    socket.on('error', (error) =>
      console.error('Call signaling socket error:', error.message),
    )
    socket.on('pong', () => {
      if (client?.socket === socket) {
        client.alive = true
      }
    })
    socket.on('close', () => {
      if (
        client &&
        client.socket === socket &&
        clients.get(client.id) === client &&
        !shuttingDown
      ) {
        client.disconnectedAt = Date.now()
        const disconnected = client
        client.disconnectTimer = setTimeout(
          () => remove(disconnected),
          10 * 60 * 1000,
        )
        client.disconnectTimer.unref()
        broadcast(
          client.roomId,
          { type: 'peer-status', id: client.id, connected: false },
          client.id,
        )
      }
    })
    socket.on('message', (raw) => {
      void (async (): Promise<void> => {
        const data: unknown = JSON.parse(raw.toString())
        if (!data || typeof data !== 'object' || !('type' in data)) {
          throw new Error('Некорректное сообщение')
        }
        const msg = data as Record<string, unknown>
        if (!client) {
          if (joining || msg.type !== 'join' || typeof msg.token !== 'string') {
            throw new Error('Не указана сессия звонка')
          }
          joining = true
          const session: CallSession = readCallSessionToken(msg.token)
          let image: string | null = null
          if (session.userId) {
            const user = await db('User')
              .where({ id: session.userId })
              .first('status', 'image')

            if (!user || user.status === 'blocked') {
              throw new Error('Доступ запрещён')
            }
            image = user.image ?? null
          }
          const room = await getCallRoom(db, session.roomId)
          if (room.closed) {
            send(socket, { type: 'closed' })
            socket.close(4003, 'Room closed')
            return
          }
          if (room.authenticatedOnly && !session.userId) {
            throw new Error('Для входа в эту комнату нужна авторизация')
          }
          if (socket.readyState !== WebSocket.OPEN) {
            return
          }
          const previous = clients.get(session.id)
          clearTimeout(previous?.disconnectTimer)
          client = {
            ...session,
            image,
            socket,
            alive: true,
            disconnectedAt: null,
          }
          const peers = [...clients.values()]
            .filter((p) => p.roomId === room.id && p.id !== session.id)
            .map((p) => ({
              id: p.id,
              name: p.name,
              image: p.image,
              connected: p.disconnectedAt === null,
            }))

          clients.set(client.id, client)
          // A late close from the replaced socket must not remove the resumed session.
          previous?.socket.close(4001, 'Session replaced')
          send(socket, {
            type: 'welcome',
            id: client.id,
            self: {
              id: client.id,
              name: client.name,
              image: client.image,
              connected: true,
            },
            peers,
            epoch,
            sessionToken: createCallSessionToken({
              id: client.id,
              roomId: client.roomId,
              name: client.name,
              userId: client.userId,
            }),
            iceServers: getCallIceServers(),
          })
          broadcast(
            room.id,
            previous
              ? { type: 'peer-status', id: client.id, connected: true }
              : {
                  type: 'joined',
                  peer: {
                    id: client.id,
                    name: client.name,
                    image: client.image,
                    connected: true,
                  },
                },
            client.id,
          )
          return
        }
        if (clients.get(client.id) !== client || client.socket !== socket) {
          return
        }
        if (msg.type === 'leave') {
          remove(client)
          socket.close(1000, 'Left room')
          return
        }
        if (msg.type === 'ping') {
          send(socket, { type: 'pong' })
          return
        }
        if (msg.type !== 'signal' || typeof msg.target !== 'string') {
          throw new Error('Некорректный адресат')
        }
        const target = clients.get(msg.target)
        if (!target || target.roomId !== client.roomId) {
          return
        }
        const payload = msg.payload
        if (!payload || typeof payload !== 'object') {
          throw new Error('Некорректный сигнал')
        }
        const signal = payload as Record<string, unknown>
        const description = signal.description as
          Record<string, unknown> | undefined

        const candidate = signal.candidate as
          Record<string, unknown> | undefined

        if (
          description &&
          (typeof description.sdp !== 'string' ||
            !['offer', 'answer'].includes(String(description.type)))
        ) {
          throw new Error('Некорректный SDP')
        }
        if (candidate && typeof candidate.candidate !== 'string') {
          throw new Error('Некорректный ICE')
        }
        const media = signal.media as Record<string, unknown> | undefined
        if (
          media &&
          !['microphone', 'camera', 'screen'].every(
            (key) => typeof media[key] === 'boolean',
          )
        ) {
          throw new Error('Некорректные дорожки')
        }
        if (signal.reset !== undefined && typeof signal.reset !== 'boolean') {
          throw new Error('Некорректный запрос восстановления')
        }
        if (
          signal.connectionId !== undefined &&
          typeof signal.connectionId !== 'string'
        ) {
          throw new Error('Некорректный идентификатор соединения')
        }
        if (!description && !candidate && !media && !signal.reset) {
          throw new Error('Пустой сигнал')
        }
        send(target.socket, {
          type: 'signal',
          from: client.id,
          payload: {
            description,
            candidate,
            media,
            reset: signal.reset,
            connectionId: signal.connectionId,
          },
        })
      })().catch((error: unknown) => {
        send(socket, {
          type: 'error',
          message:
            error instanceof Error ? error.message : 'Ошибка подключения',
        })
        socket.close(1008, 'Invalid message')
      })
    })
  })
  const heartbeat = setInterval(() => {
    for (const client of clients.values()) {
      if (client.disconnectedAt !== null) {
        continue
      }
      if (!client.alive) {
        client.socket.terminate()
      } else {
        client.alive = false
        client.socket.ping()
      }
    }
  }, 15000)

  heartbeat.unref()
  return () => {
    shuttingDown = true
    clearInterval(heartbeat)
    server.off('upgrade', onUpgrade)
    callEvents.off('kick', kick)
    callEvents.off('closed', closeRoom)
    callEvents.off('settings', settings)
    for (const socket of wss.clients) {
      socket.terminate()
    }
    for (const client of clients.values()) {
      clearTimeout(client.disconnectTimer)
    }
    clients.clear()
    wss.close()
  }
}
