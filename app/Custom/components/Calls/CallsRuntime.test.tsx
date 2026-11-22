// @vitest-environment jsdom
import React from 'react'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { AppContextProvider, useAppContext } from '../AppContext'
import type { CallsContextValue } from './hooks/useCalls/interfaces'
import { useOpenCallRoom, useCallRoom } from './hooks/useCallRoom'
import { createCallConnection } from './helpers/createCallConnection'

vi.mock('./helpers/createCallConnection', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./helpers/createCallConnection')>()),
  createCallConnection: vi.fn(),
}))

let calls: CallsContextValue | undefined
const clients: ApolloClient[] = []
const close = vi.fn()
let join: ReturnType<typeof useCallRoom>['join']

function createClient(title: string): ApolloClient {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(
      (operation) =>
        new Observable((observer) => {
          observer.next({
            data: {
              [operation.operationName ?? 'callRoom']: {
                __typename: 'CallRoom',
                id: 'a',
                title,
                authenticatedOnly: false,
                hasAccessCode: true,
                closed: false,
                isOwner: true,
                sessionToken: 'token',
                iceServers: [],
              },
            },
          })
          observer.complete()
        }),
    ),
  })

  clients.push(client)
  return client
}

const Room: React.FC = () => {
  calls = useAppContext()?.calls
  useOpenCallRoom('a')
  join = useCallRoom('a').join
  return null
}

const App: React.FC<{ client: ApolloClient }> = ({ client }) => (
  <ApolloProvider client={client}>
    <AppContextProvider user={undefined} userLoading={false}>
      <Room />
    </AppContextProvider>
  </ApolloProvider>
)

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
  vi.mocked(createCallConnection).mockReturnValue({
    close,
    updateStreams: vi.fn(),
  })
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      enumerateDevices: vi.fn().mockResolvedValue([]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  })
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
})

afterEach(() => {
  cleanup()
  clients.splice(0).forEach((client) => client.stop())
  history.replaceState(null, '', '/')
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('состояние звонков и сгенерированные API-хуки', () => {
  it('сохраняет приглашение при повторном монтировании эффектов StrictMode', async () => {
    history.replaceState(null, '', '/calls/a#code=secret')
    render(
      <React.StrictMode>
        <App client={createClient('Комната')} />
      </React.StrictMode>,
    )
    await waitFor(() =>
      expect(calls?.state.rooms.a?.room?.title).toBe('Комната'),
    )
    expect(calls?.state.codes.a).toBe('secret')
    await act(async () =>
      join({
        name: 'Участник',
        accessCode: 'secret',
      }),
    )
    expect(createCallConnection).toHaveBeenCalledOnce()
  })

  it('при смене клиента завершает старую сессию и продолжает загружать открытую комнату', async () => {
    const view = render(<App client={createClient('Первый клиент')} />)
    await waitFor(() =>
      expect(calls?.state.rooms.a?.room?.title).toBe('Первый клиент'),
    )
    await act(async () => join({ name: 'Участник' }))
    expect(calls?.state.rooms.a?.session).toBeTruthy()
    view.rerender(<App client={createClient('Второй клиент')} />)
    await waitFor(() =>
      expect(calls?.state.rooms.a?.room?.title).toBe('Второй клиент'),
    )
    expect(calls?.state.rooms.a?.session).toBeNull()
    expect(close).toHaveBeenCalledOnce()
    expect(createCallConnection).toHaveBeenCalledOnce()
  })
})
