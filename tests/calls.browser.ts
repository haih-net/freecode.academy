import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium, type Page } from 'playwright'
import { print, type DocumentNode } from 'graphql'
import {
  SignupDocument,
  JoinCallRoomDocument,
  UpdateCallRoomDocument,
  CloseCallRoomDocument,
} from '../app/gql/generated'

// Run against an isolated development server/database, never a production URL.
const origin = process.env.CALL_TEST_URL || 'http://localhost:3100'
if (!['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) {
  throw new Error('Use a local test server')
}
async function operation(
  document: DocumentNode,
  variables: object,
  token?: string,
): Promise<{ data?: Record<string, unknown>; errors?: { message: string }[] }> {
  const response = await fetch(`${origin}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query: print(document), variables }),
  })

  return response.json()
}
// Для сценария с управлением комнатой нужен администратор локальной тестовой БД.
let token = process.env.CALL_TEST_OWNER_TOKEN
if (!token) {
  const signup = await operation(SignupDocument, {
    data: {
      username: `calltest${Date.now()}`,
      password: 'Calls-test-password-2026',
      fullname: 'Создатель',
    },
  })

  assert.equal(signup.errors, undefined)
  token = (signup.data?.response as { token: string }).token
}
assert.ok(token)
// Виртуальный микрофон Chromium без WAV может передавать только тишину.
const audioDirectory = await mkdtemp(join(tmpdir(), 'call-audio-'))
const audioFile = join(audioDirectory, 'microphone.wav')
const sampleRate = 48000
const samples = sampleRate * 2
const wav = Buffer.alloc(44 + samples * 2)
wav.write('RIFF', 0)
wav.writeUInt32LE(wav.length - 8, 4)
wav.write('WAVEfmt ', 8)
wav.writeUInt32LE(16, 16)
wav.writeUInt16LE(1, 20)
wav.writeUInt16LE(1, 22)
wav.writeUInt32LE(sampleRate, 24)
wav.writeUInt32LE(sampleRate * 2, 28)
wav.writeUInt16LE(2, 32)
wav.writeUInt16LE(16, 34)
wav.write('data', 36)
wav.writeUInt32LE(samples * 2, 40)
for (let i = 0; i < samples; i++) {
  wav.writeInt16LE(
    Math.round(Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 12000),
    44 + i * 2,
  )
}
await writeFile(audioFile, wav)
const browser = await chromium.launch({
  args: [
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
    `--use-file-for-fake-audio-capture=${audioFile}`,
    '--auto-select-desktop-capture-source=Entire screen',
    '--enable-usermedia-screen-capturing',
    '--autoplay-policy=document-user-activation-required',
  ],
})

const errors: string[] = []
let debugPages: Page[] = []
try {
  const ownerContext = await browser.newContext()
  await ownerContext.addInitScript(
    (value) => localStorage.setItem('token', value),
    token,
  )
  const owner = await ownerContext.newPage()
  const guest1 = await (await browser.newContext()).newPage()
  const guest2 = await (await browser.newContext()).newPage()
  const pages = [owner, guest1, guest2]
  debugPages = pages
  for (const page of pages) {
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      const state = window as typeof window & {
        callTestPeers: RTCPeerConnection[]
        callTestSockets: WebSocket[]
        callTestAudio: Array<{ context: AudioContext; analyser: AnalyserNode }>
      }

      state.callTestPeers = []
      state.callTestSockets = []
      state.callTestAudio = []
      const NativeAudio = AudioContext
      window.AudioContext = class extends NativeAudio {
        sources: MediaStream[] = []
        createMediaStreamSource(
          stream: MediaStream,
        ): MediaStreamAudioSourceNode {
          this.sources.push(stream)
          return super.createMediaStreamSource(stream)
        }
        createGain(): GainNode {
          const gain = super.createGain()
          const analyser = this.createAnalyser()
          gain.connect(analyser)
          state.callTestAudio.push({ context: this, analyser })
          return gain
        }
      }
      const NativeSocket = WebSocket
      window.WebSocket = class extends NativeSocket {
        constructor(url: string | URL, protocols?: string | string[]) {
          super(url, protocols)
          if (String(url).includes('/api/calls/socket')) {
            state.callTestSockets.push(this)
          }
        }
      }
      const Native = RTCPeerConnection
      window.RTCPeerConnection = class extends Native {
        constructor(config?: RTCConfiguration) {
          super(config)
          state.callTestPeers.push(this)
        }
      }
    })
  }
  await owner.goto(`${origin}/calls`)
  await owner.getByLabel('Название комнаты').fill('Проверка группового звонка')
  await owner.getByLabel('Код доступа (необязательно)').fill('test-room-code')
  await owner
    .getByRole('button', { name: 'Создать комнату', exact: true })
    .click()
  await owner.waitForURL(/\/calls\/[^/]+/)
  await owner
    .getByRole('heading', { name: 'Проверка группового звонка', exact: true })
    .waitFor()
  const roomId = new URL(owner.url()).pathname.split('/').pop()
  assert.ok(roomId)
  await owner.waitForFunction(() =>
    document
      .querySelector<HTMLInputElement>('input[aria-label="Ссылка приглашения"]')
      ?.value.includes('#code=test-room-code'),
  )
  const invitation = await owner.getByLabel('Ссылка приглашения').inputValue()
  assert.ok(invitation.includes('#code=test-room-code'))
  assert.equal(new URL(owner.url()).hash, '')
  const wrongCode = await operation(JoinCallRoomDocument, {
    id: roomId,
    data: { name: 'Гость', accessCode: 'wrong' },
  })

  assert.match(wrongCode.errors?.[0].message || '', /Неверный код/)
  const forbiddenSettings = await operation(UpdateCallRoomDocument, {
    id: roomId,
    data: { title: 'Чужая комната', authenticatedOnly: false },
  })

  assert.match(forbiddenSettings.errors?.[0].message || '', /создателю/)
  const forbiddenClose = await operation(CloseCallRoomDocument, { id: roomId })
  assert.match(forbiddenClose.errors?.[0].message || '', /создатель/)
  await Promise.all([guest1.goto(invitation), guest2.goto(invitation)])
  async function join(page: Page, name: string): Promise<void> {
    await page.getByLabel('Ваше имя').fill(name)
    await page
      .getByRole('button', { name: 'Включить камеру', exact: true })
      .click()
    await page
      .getByRole('button', { name: 'Выключить камеру', exact: true })
      .waitFor()
    await page
      .getByRole('button', { name: 'Включить микрофон', exact: true })
      .click()
    await page
      .getByRole('button', { name: 'Выключить микрофон', exact: true })
      .waitFor()
    await page
      .getByRole('button', { name: 'Войти в звонок', exact: true })
      .click()
    await page
      .getByText('В комнате · связь с сервером установлена', { exact: true })
      .waitFor({ state: 'attached' })
  }
  await Promise.all(
    pages.map((page, index) =>
      join(page, ['Создатель', 'Гость один', 'Гость два'][index]),
    ),
  )
  console.warn('All clients admitted')
  for (const page of pages) {
    await page
      .getByRole('heading', { name: 'Участники: 3', exact: true })
      .waitFor()
    await page.waitForFunction(
      () =>
        document.querySelectorAll('video[aria-label^="Миниатюра:"]').length ===
          3 &&
        [
          ...document.querySelectorAll<HTMLVideoElement>(
            'video[aria-label^="Миниатюра:"]',
          ),
        ].every((video) => video.videoWidth > 0),
      { timeout: 30000 },
    )
    assert.equal(await page.getByText('На связи', { exact: true }).count(), 2)
  }
  await owner.screenshot({
    path: 'test-results/calls-three-participants.png',
    fullPage: true,
  })
  // Check real RTP reception from both peers, rather than only membership labels.
  for (const page of pages) {
    const receivedAudio = await page.evaluate(async () =>
      Promise.all(
        (
          window as typeof window & { callTestPeers: RTCPeerConnection[] }
        ).callTestPeers
          .filter((pc) => pc.connectionState === 'connected')
          .map(async (pc) =>
            [...(await pc.getStats()).values()].some(
              (s) =>
                s.type === 'inbound-rtp' &&
                s.kind === 'audio' &&
                s.bytesReceived > 0,
            ),
          ),
      ),
    )

    assert.deepEqual(receivedAudio, [true, true])
    // Проверяем сигнал после общего GainNode, а не только получение RTP.
    await page.waitForFunction(() => {
      const outputs = (
        window as typeof window & {
          callTestAudio: Array<{
            context: AudioContext
            analyser: AnalyserNode
          }>
        }
      ).callTestAudio

      return outputs.some(({ context, analyser }) => {
        const samples = new Float32Array(analyser.fftSize)
        analyser.getFloatTimeDomainData(samples)
        return (
          context.state === 'running' &&
          samples.some((value) => Math.abs(value) > 0.001)
        )
      })
    })
    await page.evaluate(async () => {
      const outputs = (
        window as typeof window & {
          callTestAudio: Array<{
            context: AudioContext
            analyser: AnalyserNode
          }>
        }
      ).callTestAudio

      await outputs
        .find(({ context }) => context.state === 'running')
        ?.context.suspend()
    })
    await page.waitForFunction(() =>
      (
        window as typeof window & {
          callTestAudio: Array<{
            context: AudioContext
            analyser: AnalyserNode
          }>
        }
      ).callTestAudio.some(({ context }) => context.state === 'running'),
    )
  }
  console.warn(
    'PASS: three participants, bidirectional camera and audio streams, protected invitations, owner-only settings',
  )
  if (process.env.CALL_TEST_AUDIO_ONLY === '1') {
    for (const page of pages) {
      await page.getByLabel('Меню звонка: Проверка группового звонка').click()
      await page
        .getByRole('button', {
          name: 'Выйти из звонка: Проверка группового звонка',
        })
        .click()
      await page.waitForFunction(() =>
        (
          window as typeof window & {
            callTestAudio: Array<{
              context: AudioContext
              analyser: AnalyserNode
            }>
          }
        ).callTestAudio.every(({ context }) => context.state === 'closed'),
      )
    }
    console.warn(
      'PASS: общий аудиовыход, восстановление без отдельного клика, закрытие после звонка',
    )
    await browser.close()
    await rm(audioDirectory, { recursive: true, force: true })
    process.exit(0)
  }
  await guest1
    .getByRole('button', { name: 'Поделиться экраном', exact: true })
    .click()
  await guest1
    .getByRole('button', { name: 'Остановить демонстрацию', exact: true })
    .waitFor({ timeout: 15000 })
  await guest2
    .getByRole('heading', { name: 'Демонстрация экрана', exact: true })
    .waitFor()
  await guest2.waitForFunction(
    () =>
      (document.querySelector<HTMLVideoElement>(
        'video[aria-label="Экран: Гость один"]',
      )?.videoWidth ?? 0) > 0,
  )
  const connectionsBefore = await guest1.evaluate(() => {
    const state = window as typeof window & {
      callTestSockets: WebSocket[]
      callTestPeers: RTCPeerConnection[]
    }

    state.callTestSockets.at(-1)?.close(4000, 'Test signaling interruption')
    return state.callTestPeers.length
  })

  await guest1.getByText(/Связь с сервером потеряна/).waitFor()
  await guest1.getByText(/Попытка №1/).waitFor()
  await guest1
    .getByText('В комнате · связь с сервером установлена', { exact: true })
    .waitFor()
  assert.equal(
    await guest1.evaluate(
      () =>
        (window as typeof window & { callTestPeers: RTCPeerConnection[] })
          .callTestPeers.length,
    ),
    connectionsBefore,
  )
  await guest1
    .getByRole('button', { name: 'Остановить демонстрацию', exact: true })
    .waitFor()
  await guest2.waitForFunction(
    () =>
      (document.querySelector<HTMLVideoElement>(
        'video[aria-label="Экран: Гость один"]',
      )?.videoWidth ?? 0) > 0,
  )
  assert.equal(await guest1.getByText('На связи', { exact: true }).count(), 2)
  console.warn(
    'PASS: signaling resumes automatically, attempt is visible, existing peer connections and screen capture survive',
  )
  await guest1.evaluate(() => {
    const state = window as typeof window & {
      callTestSockets: WebSocket[]
      callTestPeers: RTCPeerConnection[]
    }

    state.callTestPeers
      .find((peer) => peer.connectionState === 'connected')
      ?.close()
    state.callTestSockets.at(-1)?.close(4000, 'Test peer recovery')
  })
  await guest1.getByText(/Связь с сервером потеряна/).waitFor()
  await guest1
    .getByText('В комнате · связь с сервером установлена', { exact: true })
    .waitFor()
  for (const page of pages) {
    await page.waitForFunction(
      () =>
        (
          window as typeof window & { callTestPeers: RTCPeerConnection[] }
        ).callTestPeers.filter((peer) => peer.connectionState === 'connected')
          .length === 2,
    )
  }
  console.warn(
    'PASS: a lost peer connection is rebuilt after signaling recovery',
  )
  // A participant joining while a screen is active must receive it too.
  await guest2
    .getByRole('button', { name: 'Выйти из звонка', exact: true })
    .click()
  await guest2.getByLabel('Ваше имя').fill('Гость два')
  await guest2
    .getByRole('button', { name: 'Войти в звонок', exact: true })
    .click()
  await guest2
    .getByRole('heading', { name: 'Демонстрация экрана', exact: true })
    .waitFor()
  await guest2.waitForFunction(
    () =>
      (document.querySelector<HTMLVideoElement>(
        'video[aria-label="Экран: Гость один"]',
      )?.videoWidth ?? 0) > 0,
  )
  await guest1
    .getByRole('button', { name: 'Остановить демонстрацию', exact: true })
    .click()
  await guest2
    .getByRole('heading', { name: 'Демонстрация экрана', exact: true })
    .waitFor({ state: 'detached' })
  console.warn('PASS: separate screen track starts and stops across peers')
  await owner
    .getByRole('button', { name: 'Выйти из звонка', exact: true })
    .click()
  await guest1
    .getByRole('heading', { name: 'Участники: 2', exact: true })
    .waitFor()
  assert.equal(await guest1.getByText('На связи', { exact: true }).count(), 1)
  console.warn('PASS: guests continue after creator leaves')
  await owner.getByText('Настройки комнаты', { exact: true }).click()
  await owner.getByLabel('Кто может войти').selectOption('authenticated')
  await owner.getByLabel('Новый код доступа').fill('updated-room-code')
  await owner
    .getByRole('button', { name: 'Сохранить настройки', exact: true })
    .click()
  await owner.getByText('Настройки сохранены', { exact: true }).waitFor()
  await guest1
    .getByText(
      'Создатель включил вход только для авторизованных пользователей',
      { exact: true },
    )
    .waitFor()
  const denied = await operation(JoinCallRoomDocument, {
    id: roomId,
    data: { name: 'Гость', accessCode: 'test-room-code' },
  })

  assert.match(denied.errors?.[0].message || '', /авторизация/)
  const oldCode = await operation(
    JoinCallRoomDocument,
    { id: roomId, data: { name: 'Создатель', accessCode: 'test-room-code' } },
    token,
  )

  assert.match(oldCode.errors?.[0].message || '', /Неверный код/)
  await owner.waitForFunction(() =>
    document
      .querySelector<HTMLInputElement>('input[aria-label="Ссылка приглашения"]')
      ?.value.includes('#code=updated-room-code'),
  )
  const allowed = await operation(
    JoinCallRoomDocument,
    {
      id: roomId,
      data: { name: 'Создатель', accessCode: 'updated-room-code' },
    },
    token,
  )

  assert.equal(allowed.errors, undefined)
  await owner
    .getByRole('button', { name: 'Завершить звонок для всех', exact: true })
    .click()
  await owner
    .getByRole('button', { name: 'Да, завершить для всех', exact: true })
    .click()
  await owner
    .getByText('Звонок завершён. Комната закрыта.', { exact: true })
    .waitFor()
  const closed = await operation(
    JoinCallRoomDocument,
    { id: roomId, data: { name: 'Создатель', accessCode: 'test-room-code' } },
    token,
  )

  assert.match(closed.errors?.[0].message || '', /закрыта/)
  console.warn(
    'PASS: authentication setting disconnects guests, rejects anonymous admission, room closure enforced',
  )
  await owner.goto(`${origin}/calls/devices`)
  await owner.bringToFront()
  await owner
    .getByRole('button', { name: 'Включить камеру', exact: true })
    .click()
  await owner
    .getByRole('button', { name: 'Выключить камеру', exact: true })
    .waitFor()
  await owner
    .getByRole('button', { name: 'Включить микрофон', exact: true })
    .click()
  await owner
    .getByRole('button', { name: 'Выключить микрофон', exact: true })
    .waitFor()
  await owner.waitForFunction(
    () => (document.querySelector('meter')?.value ?? 0) > 0,
  )
  await owner
    .getByRole('button', { name: 'Проверить динамики', exact: true })
    .click()
  await owner.setViewportSize({ width: 390, height: 844 })
  assert.equal(
    await owner.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  )
  await owner.screenshot({
    path: 'test-results/calls-device-mobile.png',
    fullPage: true,
  })
  assert.deepEqual(errors, [])
  await owner.evaluate(() => {
    ;(
      window as typeof window & { capturedTracks: MediaStreamTrack[] }
    ).capturedTracks = (
      document.querySelector('video')?.srcObject as MediaStream
    ).getTracks()
  })
  await owner
    .getByRole('link', { name: 'Видеозвонки', exact: true })
    .last()
    .click()
  await owner
    .getByRole('heading', { name: 'Видеозвонки', exact: true })
    .waitFor()
  await owner.waitForFunction(() =>
    (
      window as typeof window & { capturedTracks: MediaStreamTrack[] }
    ).capturedTracks.every((track) => track.readyState === 'ended'),
  )
  console.warn(
    'PASS: device preview, microphone level, test tone action, mobile layout, capture cleanup; no page errors',
  )
} catch (error) {
  for (const page of debugPages) {
    console.warn(
      page.url(),
      (await page.locator('body').innerText()).slice(0, 2600),
    )
  }
  for (const page of debugPages) {
    console.warn(
      'MEDIA',
      JSON.stringify(
        await page.evaluate(async () => ({
          videos: [...document.querySelectorAll<HTMLVideoElement>('video')].map(
            (video) => ({
              label: video.ariaLabel,
              width: video.videoWidth,
              paused: video.paused,
              tracks: (video.srcObject as MediaStream | null)
                ?.getTracks()
                .map((track) => ({
                  kind: track.kind,
                  muted: track.muted,
                  ready: track.readyState,
                })),
            }),
          ),
          audio: (
            window as typeof window & {
              callTestAudio: Array<{
                context: AudioContext
                analyser: AnalyserNode
              }>
            }
          ).callTestAudio?.map(({ context, analyser }) => {
            const samples = new Float32Array(analyser.fftSize)
            analyser.getFloatTimeDomainData(samples)
            return {
              state: context.state,
              time: context.currentTime,
              peak: Math.max(...samples.map(Math.abs)),
            }
          }),
          peers: await Promise.all(
            (
              window as typeof window & { callTestPeers: RTCPeerConnection[] }
            ).callTestPeers.map(async (pc) => ({
              state: pc.connectionState,
              transceivers: pc.getTransceivers().map((t) => ({
                mid: t.mid,
                current: t.currentDirection,
                sending: t.sender.track?.kind,
                receiving: t.receiver.track.kind,
                muted: t.receiver.track.muted,
              })),
              stats: [...(await pc.getStats()).values()]
                .filter(
                  (s) => s.type === 'inbound-rtp' || s.type === 'outbound-rtp',
                )
                .map((s) => ({
                  type: s.type,
                  kind: s.kind,
                  bytesReceived: s.bytesReceived,
                  bytesSent: s.bytesSent,
                  framesDecoded: s.framesDecoded,
                  totalAudioEnergy: s.totalAudioEnergy,
                  audioLevel: s.audioLevel,
                })),
            })),
          ),
        })),
      ),
    )
  }
  console.warn('Page errors:', errors)
  throw error
} finally {
  await browser.close()
  await rm(audioDirectory, { recursive: true, force: true })
}
