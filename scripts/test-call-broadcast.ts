import { randomBytes } from 'node:crypto'
import { chromium } from 'playwright'
import { print, type DocumentNode } from 'graphql'
import {
  CreateCallRoomDocument,
  JoinCallRoomDocument,
  type CreateCallRoomMutation,
  type CreateCallRoomMutationVariables,
  type JoinCallRoomMutation,
  type JoinCallRoomMutationVariables,
} from '../app/gql/generated'

// Отдельный локальный сервер и БД в памяти: рабочее окружение не меняется.
process.env.NODE_ENV = 'development'
process.env.PORT = process.env.CALL_TEST_PORT || '3102'
process.env.METRICS_PORT = '0'
process.env.DATABASE_CLIENT = 'sqlite'
process.env.DATABASE_FILENAME = ':memory:'
process.env.JWT_SECRET = randomBytes(32).toString('hex')
process.env.CALL_STUN_URLS = ''
process.env.CALL_TURN_URLS = ''
process.env.NEXT_PUBLIC_SITE_SIGNUP_STRATEGY = 'INVITE'
const origin = `http://localhost:${process.env.PORT}`
const { db, migrateDatabase } = await import('../server/database/index')
await migrateDatabase(db)
const { insertUser } =
  await import('../server/schema/types/User/helpers/insertUser')

const { createToken } = await import('../server/schema/types/User/helpers/auth')
const owner = await insertUser(db, {
  username: 'broadcast_test',
  password: `Local-Test-1-${randomBytes(16).toString('hex')}`,
  sudo: true,
  status: 'active',
})

const token = await createToken(owner, db)
await import('../server/index')
for (let attempt = 0; ; attempt++) {
  try {
    const response = await fetch(`${origin}/favicon.ico`, {
      signal: AbortSignal.timeout(1000),
    })

    if (response.status < 500) {
      break
    }
  } catch {
    if (attempt >= 100) {
      throw new Error('Локальный сервер не запустился')
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 100))
}

async function operation<Result, Variables>(
  document: DocumentNode,
  variables: Variables,
): Promise<Result> {
  const response = await fetch(`${origin}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: print(document), variables }),
  })

  const result = (await response.json()) as {
    data?: Result
    errors?: Array<{ message: string }>
  }

  if (!result.data || result.errors?.length) {
    throw new Error(
      result.errors?.map((error) => error.message).join('; ') ||
        'Нет ответа GraphQL',
    )
  }
  return result.data
}

const accessCode = randomBytes(16).toString('hex')
const { createCallRoom: room } = await operation<
  CreateCallRoomMutation,
  CreateCallRoomMutationVariables
>(CreateCallRoomDocument, {
  data: {
    title: 'Локальный тестовый транслятор',
    authenticatedOnly: false,
    accessCode,
  },
})

if (!room) {
  throw new Error('Комната не создана')
}
const { joinCallRoom: session } = await operation<
  JoinCallRoomMutation,
  JoinCallRoomMutationVariables
>(JoinCallRoomDocument, {
  id: room.id,
  data: { name: 'Тестовый транслятор', accessCode },
})

if (!session?.sessionToken || session.iceServers.length) {
  throw new Error('Тест требует сессию без STUN/TURN')
}
const browser = await chromium.launch({
  args: ['--autoplay-policy=no-user-gesture-required'],
})

const sender = await browser.newPage()
sender.on('pageerror', (error) => console.error('Транслятор:', error.message))
await sender.goto(`${origin}/calls/devices`)
await sender.evaluate(async (session) => {
  const modulePath =
    '/app/Custom/components/Calls/helpers/createCallConnection.ts'

  const { createCallConnection } = (await import(
    /* @vite-ignore */ modulePath
  )) as typeof import('../app/Custom/components/Calls/helpers/createCallConnection')

  const audio = new AudioContext()
  await audio.resume()
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  const output = audio.createMediaStreamDestination()
  oscillator.frequency.value = 440
  gain.gain.value = 0.12
  oscillator.connect(gain).connect(output)
  oscillator.start()
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  const drawing = canvas.getContext('2d')
  if (!drawing) {
    throw new Error('Canvas недоступен')
  }
  let frame = 0
  const timer = setInterval(() => {
    drawing.fillStyle = '#263544'
    drawing.fillRect(0, 0, 640, 360)
    drawing.fillStyle = '#ffffff'
    drawing.font = '28px sans-serif'
    drawing.fillText('Тестовая трансляция WebRTC', 40, 70)
    drawing.fillText(`Кадр: ${frame++} · Звук: 440 Гц`, 40, 120)
    drawing.fillStyle = '#e07040'
    drawing.fillRect((frame * 8) % 580, 220, 60, 60)
  }, 100)

  const video = canvas.captureStream(10)
  const connection = createCallConnection(
    session,
    { microphone: output.stream, camera: video, screen: null },
    (event) => {
      if (event.type === 'connectionError' && event.message) {
        console.error(event.message)
      }
    },
    () => undefined,
    () => undefined,
  )

  window.addEventListener(
    'pagehide',
    () => {
      connection.close()
      clearInterval(timer)
      video.getTracks().forEach((track) => track.stop())
      output.stream.getTracks().forEach((track) => track.stop())
      oscillator.stop()
      void audio.close()
    },
    { once: true },
  )
}, session)
const url = `${origin}/calls/devices?broadcastRoom=${room.id}#code=${accessCode}`
process.stdout.write(`Проверка приёма: ${url}\n`)
process.stdout.write('Транслятор работает без STUN/TURN. Остановка: Ctrl+C.\n')
let stopping = false
const stop = (): void => {
  if (stopping) {
    return
  }
  stopping = true
  void browser.close().finally(() => process.exit(0))
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
