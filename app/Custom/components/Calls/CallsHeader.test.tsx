import { SnackbarContext } from 'app/Custom/hooks/useSnackbar'
import { DeviceControls } from './DeviceControls'
import type { CallsContextValue } from './hooks/useCalls/interfaces'
import { useOpenCallRoom, useCallRoom } from './hooks/useCallRoom'
import { useCallRoomMutations } from './hooks/useCallRoomMutations'
import { roomMediaId } from './hooks/useCallMedia'
// @vitest-environment jsdom
import type { JoinedCallRoom, CallSignalingOptions } from './interfaces'
import React from 'react'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { Link, MemoryRouter, Route, Routes, useParams } from 'react-router'
import { AppContextProvider, useAppContext } from '../AppContext'
import { CallsHeader } from './CallsHeader'
import { createCallSignaling } from './helpers/createCallSignaling'

vi.mock('./helpers/createCallSignaling', () => ({
  createCallSignaling: vi.fn(),
}))

let calls: CallsContextValue | undefined
let roomActions: Record<string, ReturnType<typeof useCallRoom>>
let mutations: ReturnType<typeof useCallRoomMutations>
const sessions = new Map<
  string,
  {
    options: CallSignalingOptions
    close: ReturnType<typeof vi.fn>
  }
>()

const peerConnections: Array<{ close: ReturnType<typeof vi.fn> }> = []

const tracks: Array<{ stop: ReturnType<typeof vi.fn> }> = []
let client: ApolloClient
const addMessage = vi.fn()

function session(id: string): JoinedCallRoom {
  return {
    id,
    title: `Комната ${id}`,
    authenticatedOnly: false,
    hasAccessCode: false,
    closed: false,
    isOwner: true,
    sessionToken: id,
    iceServers: [],
  }
}

const Observer: React.FC = () => {
  calls = useAppContext()?.calls
  roomActions = { a: useCallRoom('a'), b: useCallRoom('b') }
  mutations = useCallRoomMutations()
  return null
}

const RoomOwner: React.FC = () => {
  useOpenCallRoom('a')
  return null
}

const Room: React.FC = () => {
  const { id = '' } = useParams()
  useOpenCallRoom(id)
  const media = useAppContext()?.calls.state.media[roomMediaId(id)]
  return (
    <>
      <p>Страница комнаты {id}</p>
      {media && (
        <DeviceControls mediaId={roomMediaId(id)} roomId={id} compact />
      )}
    </>
  )
}

function renderApp(): void {
  render(
    <SnackbarContext.Provider value={{ addMessage }}>
      <MemoryRouter initialEntries={['/calls/a']}>
        <ApolloProvider client={client}>
          <AppContextProvider user={undefined} userLoading={false}>
            <Observer />
            <CallsHeader />
            <nav>
              <Link to="/calls/a">Комната A</Link>
              <Link to="/calls/b">Комната B</Link>
              <Link to="/other">Другая страница</Link>
            </nav>
            <Routes>
              <Route path="/calls/:id" element={<Room />} />
              <Route path="/other" element={<p>Другая страница сайта</p>} />
            </Routes>
          </AppContextProvider>
        </ApolloProvider>
      </MemoryRouter>
    </SnackbarContext.Provider>,
  )
}

beforeEach(() => {
  vi.stubGlobal(
    'Audio',
    class {
      paused = true
      volume = 1
      srcObject: MediaStream | null = null
      play = vi.fn(async () => {
        this.paused = false
      })
      pause = vi.fn(() => {
        this.paused = true
      })
    },
  )

  calls = undefined
  sessions.clear()
  tracks.length = 0
  peerConnections.length = 0
  vi.stubGlobal(
    'AudioContext',
    class {
      state = 'running'
      destination = {}
      createAnalyser = () => ({
        fftSize: 1024,
        getFloatTimeDomainData: vi.fn(),
        disconnect: vi.fn(),
      })
      createGain = () => ({
        gain: { value: 1 },
        connect: vi.fn(),
        disconnect: vi.fn(),
      })
      resume = vi.fn().mockResolvedValue(undefined)
      close = vi.fn().mockResolvedValue(undefined)
    },
  )
  vi.stubGlobal(
    'RTCPeerConnection',
    class {
      close = vi.fn()
      addTransceiver = vi.fn()
      getTransceivers = () => []
      constructor() {
        peerConnections.push(this)
      }
    },
  )
  vi.mocked(createCallSignaling).mockImplementation((options) => {
    const close = vi.fn()
    sessions.set(options.sessionToken, { options, close })
    options.onStatus({
      phase: 'connected',
      attempt: 0,
      nextAttemptAt: null,
      message: 'На связи',
    })
    return { close, send: () => true }
  })
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      enumerateDevices: vi.fn().mockResolvedValue([]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      getUserMedia: vi.fn().mockImplementation(async () => {
        const track = {
          stop: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          getSettings: () => ({ deviceId: 'shared-device' }),
        }

        tracks.push(track)
        return { getTracks: () => [track] }
      }),
    },
  })
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(
      (operation) =>
        new Observable((observer) => {
          observer.next({
            data: {
              [operation.operationName ?? 'callRoom']: {
                __typename: 'CallRoom',
                ...session(operation.variables.id as string),
                ...(operation.operationName === 'updateCallRoom'
                  ? operation.variables.data
                  : {}),
                ...(operation.operationName === 'closeCallRoom'
                  ? { closed: true }
                  : {}),
              },
            },
          })
          observer.complete()
        }),
    ),
  })
})

afterEach(() => {
  cleanup()
  client.stop()
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe('глобальные звонки', () => {
  it('сохраняет два звонка при навигации и переиспользует микрофон до выхода из последнего звонка', async () => {
    renderApp()
    await waitFor(() => expect(calls?.state.rooms.a?.room?.id).toBe('a'))
    await act(async () =>
      roomActions.a.join({
        name: 'Участник',
        accessCode: 'code-a',
      }),
    )
    await waitFor(() => expect(sessions.has('a')).toBe(true))
    const first = sessions.get('a')
    if (!first) {
      throw new Error('Первый звонок не подключён')
    }
    act(() =>
      first.options.onMessage({
        type: 'welcome',
        id: 'self',
        epoch: 'test',
        sessionToken: 'a',
        iceServers: [],
        peers: [{ id: 'remote', name: 'Участник', connected: true }],
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Микрофон: Комната a' }))
    await waitFor(() => expect(tracks).toHaveLength(1))
    await waitFor(() =>
      expect(calls?.state.media[roomMediaId('a')].busy.microphone).toBe(false),
    )

    fireEvent.click(screen.getByRole('link', { name: 'Комната B' }))
    await waitFor(() => expect(calls?.state.rooms.b?.room?.id).toBe('b'))
    await act(async () =>
      roomActions.b.join({
        name: 'Участник',
        accessCode: 'code-b',
      }),
    )
    await waitFor(() => expect(sessions.has('b')).toBe(true))
    const second = sessions.get('b')
    if (!second) {
      throw new Error('Второй звонок не подключён')
    }
    fireEvent.click(screen.getByRole('button', { name: 'Микрофон: Комната b' }))
    await waitFor(() => expect(tracks).toHaveLength(1))
    await waitFor(() =>
      expect(calls?.state.media[roomMediaId('b')].busy.microphone).toBe(false),
    )
    fireEvent.click(screen.getByRole('link', { name: 'Другая страница' }))
    expect(calls?.state.media[roomMediaId('a')].streams.microphone).toBe(
      calls?.state.media[roomMediaId('b')].streams.microphone,
    )
    expect(peerConnections[0].close).not.toHaveBeenCalled()
    expect(first.close).not.toHaveBeenCalled()
    expect(second.close).not.toHaveBeenCalled()
    expect(tracks[0].stop).not.toHaveBeenCalled()
    expect(screen.getAllByRole('group', { name: /^Звонок:/ })).toHaveLength(2)

    fireEvent.click(screen.getByRole('link', { name: 'Комната A' }))
    await waitFor(() => expect(calls?.state.rooms.a.viewed).toBe(true))
    expect(createCallSignaling).toHaveBeenCalledTimes(2)
    expect(calls?.state.codes.a).toBe('code-a')
    fireEvent.click(
      screen.getByRole('button', { name: 'Выйти из звонка: Комната a' }),
    )
    await waitFor(() => expect(first.close).toHaveBeenCalledOnce())
    expect(peerConnections[0].close).toHaveBeenCalledOnce()
    expect(tracks[0].stop).not.toHaveBeenCalled()
    expect(second.close).not.toHaveBeenCalled()
    expect(calls?.state.codes.b).toBe('code-b')

    fireEvent.click(screen.getByRole('link', { name: 'Другая страница' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Выйти из звонка: Комната b' }),
    )
    await waitFor(() =>
      expect(Object.keys(calls?.state.rooms ?? {})).toHaveLength(0),
    )
    expect(second.close).toHaveBeenCalledOnce()
    expect(tracks[0].stop).toHaveBeenCalledOnce()
  })

  it('освобождает предпросмотр без входа и переносит ошибки соединения в хедер', async () => {
    renderApp()
    await waitFor(() => expect(calls?.state.rooms.a?.room).toBeTruthy())
    await act(async () => {
      await calls?.state.media[roomMediaId('a')].handle?.start('camera')
    })
    fireEvent.click(screen.getByRole('link', { name: 'Другая страница' }))
    await waitFor(() => expect(calls?.state.rooms.a).toBeUndefined())
    expect(tracks[0].stop).toHaveBeenCalledOnce()
    expect(createCallSignaling).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('link', { name: 'Комната A' }))
    await waitFor(() => expect(calls?.state.rooms.a).toBeTruthy())
    await act(async () => roomActions.a.join({ name: 'Участник' }))
    await waitFor(() => expect(sessions.has('a')).toBe(true))
    fireEvent.click(screen.getByRole('link', { name: 'Другая страница' }))
    act(() => {
      sessions.get('a')?.options.onStatus({
        phase: 'denied',
        attempt: 0,
        nextAttemptAt: null,
        message: 'Комната закрыта',
      })
      sessions.get('a')?.options.onStopped()
    })
    expect(screen.getByTitle('Комната закрыта')).toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', { name: 'Вернуться ко входу: Комната a' }),
    )
    await waitFor(() =>
      expect(screen.getByText('Страница комнаты a')).toBeTruthy(),
    )
    expect(screen.queryByRole('group', { name: /^Звонок:/ })).toBeNull()
  })

  it('управляет звонком без UI и освобождает ресурсы при размонтировании владельца', async () => {
    const view = render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <AppContextProvider user={undefined} userLoading={false}>
            <Observer />
            <RoomOwner />
          </AppContextProvider>
        </ApolloProvider>
      </React.StrictMode>,
    )

    await waitFor(() => expect(calls?.state.rooms.a?.room?.id).toBe('a'))
    await act(async () =>
      roomActions.a.join({
        name: 'Участник',
        accessCode: 'secret',
      }),
    )
    await waitFor(() => expect(sessions.has('a')).toBe(true))
    await act(async () =>
      calls?.state.media[roomMediaId('a')].handle?.start(
        'camera',
        'selected-camera',
      ),
    )
    const connection = sessions.get('a')
    act(() => calls?.state.media[roomMediaId('a')].handle?.stop('camera'))
    act(() => calls?.state.media[roomMediaId('a')].handle?.toggle('camera'))
    await waitFor(() => expect(tracks).toHaveLength(2))
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenLastCalledWith({
      video: {
        deviceId: { exact: 'selected-camera' },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    })
    await act(async () => connection?.options.onMessage({ type: 'settings' }))
    expect(calls?.state.codes.a).toBe('secret')
    expect(connection?.close).not.toHaveBeenCalled()
    view.unmount()
    expect(connection?.close).toHaveBeenCalledOnce()
    expect(tracks[1].stop).toHaveBeenCalledOnce()
  })

  it('применяет общие действия комнаты к работающему звонку', async () => {
    renderApp()
    await waitFor(() => expect(calls?.state.rooms.a?.room).toBeTruthy())
    await act(async () => roomActions.a.join({ name: 'Участник' }))
    await waitFor(() => expect(sessions.has('a')).toBe(true))
    await act(async () =>
      mutations.saveRoom('a', {
        title: 'Новое название',
        authenticatedOnly: false,
        accessCode: 'new-code',
      }),
    )
    expect(calls?.state.rooms.a?.room?.title).toBe('Новое название')
    expect(calls?.state.codes.a).toBe('new-code')
    expect(createCallSignaling).toHaveBeenCalledOnce()
    await act(async () => mutations.closeRoom('a'))
    expect(calls?.state.rooms.a?.session).toBeNull()
    expect(calls?.state.rooms.a?.room?.closed).toBe(true)
    expect(sessions.get('a')?.close).toHaveBeenCalledOnce()
  })

  it('показывает ошибку через snackbar и блокирует устройства во всех панелях после отказа', async () => {
    renderApp()
    await waitFor(() => expect(calls?.state.rooms.a?.room).toBeTruthy())
    await act(async () => roomActions.a.join({ name: 'Участник' }))
    const current = sessions.get('a')
    if (!current) {
      throw new Error('Звонок не подключён')
    }
    act(() => {
      current.options.onStatus({
        phase: 'denied',
        attempt: 0,
        nextAttemptAt: null,
        message: 'Доступ прекращён',
      })
      current.options.onStopped()
    })
    expect(addMessage).toHaveBeenCalledWith('Доступ прекращён', {
      variant: 'error',
    })
    const camera = screen.getByRole('button', {
      name: 'Включить камеру',
    }) as HTMLButtonElement

    expect(camera.disabled).toBe(true)
    await act(async () =>
      calls?.state.media[roomMediaId('a')].handle?.start('camera'),
    )
    expect(navigator.mediaDevices.getUserMedia).not.toHaveBeenCalled()
  })

  it('допускает отсутствие контекста', () => {
    render(
      <MemoryRouter>
        <CallsHeader />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('group', { name: /^Звонок:/ })).toBeNull()
  })
})
