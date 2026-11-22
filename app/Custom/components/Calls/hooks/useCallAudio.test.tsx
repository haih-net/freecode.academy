// @vitest-environment jsdom
import React from 'react'
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCallAudio, useCallAudioActions } from './useCallAudio'
import { useCalls } from './useCalls'
import { Context } from '../../AppContext'
import type { CallsContextValue, CallRoomState } from './useCalls/interfaces'
import type { JoinedCallRoom } from '../interfaces'
import { initialCallConnection } from '../helpers/createCallConnection'

let calls: CallsContextValue
const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  calls = useCalls()
  return (
    <Context.Provider
      value={{
        calls,
        user: undefined,
        userLoading: false,
        isFeedbackOpen: false,
        openFeedback: () => undefined,
        closeFeedback: () => undefined,
      }}
    >
      {children}
    </Context.Provider>
  )
}

function useTestCallAudio() {
  useCallAudio()
  return useCallAudioActions()
}

const contexts: FakeAudioContext[] = []
class FakeAudioContext {
  state = 'suspended'
  destination = {}
  onstatechange: (() => void) | null = null
  gain = { gain: { value: 1 }, connect: vi.fn(), disconnect: vi.fn() }
  nodes: Array<{
    connect: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
  }> = []
  constructor() {
    contexts.push(this)
  }
  createAnalyser = () => ({
    fftSize: 1024,
    getFloatTimeDomainData: vi.fn(),
    disconnect: vi.fn(),
  })
  createGain = () => this.gain
  createMediaStreamSource = vi.fn(() => {
    const node = { connect: vi.fn(), disconnect: vi.fn() }
    this.nodes.push(node)
    return node
  })
  resume = vi.fn(async () => {
    this.state = 'running'
    this.onstatechange?.()
  })
  close = vi.fn(async () => {
    this.state = 'closed'
  })
}

function room(id: string, stream: MediaStream): CallRoomState {
  const session: JoinedCallRoom = {
    id,
    title: id,
    closed: false,
    authenticatedOnly: false,
    hasAccessCode: false,
    isOwner: true,
    sessionToken: id,
    iceServers: [],
  }

  return {
    viewed: true,
    room: session,
    loading: false,
    session,
    handle: null,
    connection: {
      ...initialCallConnection,
      peers: [
        {
          id: 'peer',
          name: 'Участник',
          image: null,
          state: 'connected',
          signalingConnected: true,
          media: { microphone: true, camera: false, screen: false },
          streams: { microphone: stream, camera: null, screen: null },
        },
      ],
    },
  }
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

  contexts.length = 0
  vi.stubGlobal('AudioContext', FakeAudioContext)
})
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('общий аудиовыход звонков', () => {
  it('смешивает комнаты через один регулятор громкости и освобождает только удалённые источники', async () => {
    vi.useFakeTimers()
    const a = room('a', {} as MediaStream)
    const b = room('b', {} as MediaStream)
    const { result, unmount } = renderHook(useTestCallAudio, {
      wrapper: Wrapper,
    })

    expect(contexts).toHaveLength(0)
    expect(vi.getTimerCount()).toBe(0)
    act(() => {
      calls.dispatch({ type: 'roomOpened', id: 'a' })
      calls.dispatch({ type: 'roomChanged', id: 'a', room: a })
      calls.dispatch({ type: 'roomOpened', id: 'b' })
      calls.dispatch({ type: 'roomChanged', id: 'b', room: b })
    })

    expect(contexts).toHaveLength(1)
    const context = contexts[0]
    expect(context.createMediaStreamSource).toHaveBeenCalledTimes(2)
    expect(context.nodes[0].connect).toHaveBeenCalledWith(context.gain)
    expect(context.nodes[1].connect).toHaveBeenCalledWith(context.gain)
    await act(async () => undefined)
    expect(context.resume).toHaveBeenCalledOnce()
    expect(calls.state.audio.blocked).toBe(false)
    expect(vi.getTimerCount()).toBe(1)
    context.state = 'suspended'
    await act(async () => vi.advanceTimersByTimeAsync(1000))
    expect(context.state).toBe('running')
    context.state = 'suspended'
    await act(async () => document.dispatchEvent(new Event('click')))
    expect(context.state).toBe('running')
    act(() => result.current.setVolume(0.3))
    expect(context.gain.gain.value).toBe(0.3)
    act(() => result.current.toggleMuted())
    expect(context.gain.gain.value).toBe(0)
    act(() => result.current.toggleMuted())
    expect(context.gain.gain.value).toBe(0.3)
    act(() => calls.dispatch({ type: 'roomRemoved', id: 'a' }))
    expect(context.nodes[0].disconnect).toHaveBeenCalledOnce()
    expect(context.nodes[1].disconnect).not.toHaveBeenCalled()
    expect(context.close).not.toHaveBeenCalled()
    expect(context.createMediaStreamSource).toHaveBeenCalledTimes(2)
    act(() => calls.dispatch({ type: 'roomRemoved', id: 'b' }))
    expect(context.nodes[1].disconnect).toHaveBeenCalledOnce()
    expect(context.close).toHaveBeenCalledOnce()
    expect(vi.getTimerCount()).toBe(0)
    const attempts = context.resume.mock.calls.length
    await act(async () => {
      document.dispatchEvent(new Event('click'))
      await vi.advanceTimersByTimeAsync(2000)
    })
    expect(context.resume).toHaveBeenCalledTimes(attempts)
    unmount()
    expect(context.close).toHaveBeenCalledOnce()
  })
})
