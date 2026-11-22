// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { createCallMedia } from './createCallMedia'
import { callsReducer, createCallsState } from '../hooks/useCalls'

describe('общий захват устройств', () => {
  it('делит один незавершённый запрос между комнатами и освобождает трек после последнего использования', async () => {
    const track = {
      stop: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    const stream = { getTracks: () => [track] } as unknown as MediaStream
    let grant: ((stream: MediaStream) => void) | undefined
    const getUserMedia = vi.fn(
      () =>
        new Promise<MediaStream>((resolve) => {
          grant = resolve
        }),
    )

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia,
        enumerateDevices: async () => [],
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
    })
    let state = createCallsState()
    const create = (id: string) => {
      state = callsReducer(state, { type: 'mediaOpened', id })
      return createCallMedia(
        state.pool,
        () => state.media[id],
        (media) => {
          state = callsReducer(state, { type: 'mediaChanged', id, media })
        },
        vi.fn(),
        () => true,
      )
    }

    const a = create('a')
    const b = create('b')
    const c = create('c')
    const started = [a.start('camera'), b.start('camera'), c.start('camera')]

    expect(getUserMedia).toHaveBeenCalledOnce()
    a.stop('camera')
    grant?.(stream)
    await Promise.all(started)
    expect(state.media.a.streams.camera).toBeNull()
    expect(state.media.b.streams.camera).toBe(stream)
    expect(state.media.c.streams.camera).toBe(stream)
    expect(track.stop).not.toHaveBeenCalled()
    b.stop('camera')
    expect(track.stop).not.toHaveBeenCalled()
    expect(state.media.c.streams.camera).toBe(stream)
    a.close()
    b.close()
    c.close()
    expect(track.stop).toHaveBeenCalledOnce()
  })
})
