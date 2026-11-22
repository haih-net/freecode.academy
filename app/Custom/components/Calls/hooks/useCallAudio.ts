import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCallsContext } from './useCallsContext'
import { useCallNotifications } from './useCallNotifications'

interface AudioGraph {
  context: AudioContext
  output: GainNode
  analyser: AnalyserNode
  samples: Float32Array<ArrayBuffer>
}
interface AudioSource {
  stream: MediaStream
  node: MediaStreamAudioSourceNode
  playback: HTMLAudioElement
  pending: Promise<void> | null
  reported: boolean
}

export function useCallAudioActions() {
  const { state, dispatch } = useCallsContext()
  const setVolume = useCallback(
    (volume: number): void => {
      if (Number.isFinite(volume)) {
        dispatch({
          type: 'audioChanged',
          audio: {
            volume: Math.max(0, Math.min(1, volume)),
            muted: false,
          },
        })
      }
    },
    [dispatch],
  )

  const toggleMuted = useCallback((): void => {
    const audio = state.audio
    dispatch({ type: 'audioChanged', audio: { muted: !audio.muted } })
  }, [state.audio, dispatch])

  const resume = useCallback((): void => {
    const audio = state.audio
    dispatch({
      type: 'audioChanged',
      audio: { resumeRequest: audio.resumeRequest + 1 },
    })
  }, [state.audio, dispatch])

  return { setVolume, toggleMuted, resume }
}

export function useCallAudio(): void {
  const { state, dispatch } = useCallsContext()
  const { reportError } = useCallNotifications()
  const graph = useRef<AudioGraph | null>(null)
  const sources = useRef(new Map<string, AudioSource>())
  const active = Object.values(state.rooms).some(
    (room) =>
      room.session &&
      !room.room?.closed &&
      room.connection.status.phase !== 'denied',
  )

  const incoming = useMemo(() => {
    const streams = new Map<string, MediaStream>()
    for (const [id, room] of Object.entries(state.rooms)) {
      if (
        !room.session ||
        room.room?.closed ||
        room.connection.status.phase === 'denied'
      ) {
        continue
      }
      for (const peer of room.connection.peers) {
        if (peer.media.microphone && peer.streams.microphone) {
          streams.set(`${id}:${peer.id}`, peer.streams.microphone)
        }
      }
    }
    return streams
  }, [state.rooms])

  const publishBlocked = useCallback(
    (blocked: boolean): void => {
      dispatch({ type: 'audioChanged', audio: { blocked } })
    },
    [dispatch],
  )

  const resumeSources = useCallback(
    (fromGesture = false): void => {
      for (const [key, source] of sources.current) {
        if (!source.playback.paused || (source.pending && !fromGesture)) {
          continue
        }
        const request = source.playback.play()
        source.pending = request
        void request
          .then(() => {
            if (sources.current.get(key) === source) {
              source.reported = false
              publishBlocked(
                graph.current?.context.state !== 'running' ||
                  [...sources.current.values()].some(
                    (entry) => entry.playback.paused,
                  ),
              )
            }
          })
          .catch((error: unknown) => {
            if (sources.current.get(key) !== source) {
              return
            }
            publishBlocked(true)
            if (
              error instanceof DOMException &&
              error.name === 'NotAllowedError'
            ) {
              return
            }
            if (!source.reported) {
              source.reported = true
              reportError(error)
            }
          })
          .finally(() => {
            if (source.pending === request) {
              source.pending = null
            }
          })
      }
    },
    [publishBlocked, reportError],
  )

  const release = useCallback((): void => {
    for (const source of sources.current.values()) {
      source.node.disconnect()
      source.playback.pause()
      source.playback.srcObject = null
    }
    sources.current.clear()
    const current = graph.current
    graph.current = null
    if (current) {
      current.context.onstatechange = null
      current.output.disconnect()
      current.analyser.disconnect()
      void current.context.close().catch(reportError)
    }
  }, [reportError])

  useEffect(() => release, [release])
  useEffect(() => {
    if (!active) {
      release()
      publishBlocked(false)
      dispatch({ type: 'audioChanged', audio: { level: 0 } })
      return
    }
    try {
      if (!graph.current) {
        const context = new AudioContext()
        const output = context.createGain()
        output.gain.value = 1
        output.connect(context.destination)
        const analyser = context.createAnalyser()
        analyser.fftSize = 1024
        output.connect(analyser)
        graph.current = {
          context,
          output,
          analyser,
          samples: new Float32Array(analyser.fftSize),
        }
        context.onstatechange = () => {
          if (graph.current?.context === context) {
            publishBlocked(context.state !== 'running')
          }
        }
        publishBlocked(context.state !== 'running')
      }
      for (const [key, source] of sources.current) {
        if (incoming.get(key) !== source.stream) {
          source.node.disconnect()
          source.playback.pause()
          source.playback.srcObject = null
          sources.current.delete(key)
        }
      }
      for (const [key, stream] of incoming) {
        if (!sources.current.has(key)) {
          const node = graph.current.context.createMediaStreamSource(stream)
          node.connect(graph.current.output)
          // Chromium запускает WebRTC playout через медиэлемент. Его собственный
          // выход беззвучен; общий GainNode остаётся единственным слышимым выходом.
          const playback = new Audio()
          playback.volume = 0
          playback.srcObject = stream
          sources.current.set(key, {
            stream,
            node,
            playback,
            pending: null,
            reported: false,
          })
        }
      }
    } catch (error) {
      reportError(error)
    }
    resumeSources()
  }, [
    incoming,
    active,
    publishBlocked,
    release,
    reportError,
    dispatch,
    resumeSources,
  ])
  useEffect(() => {
    if (!active) {
      return
    }
    let disposed = false
    let pending: Promise<void> | null = null
    let reported = false
    const resume = (event?: Event): void => {
      if (disposed) {
        return
      }
      resumeSources(Boolean(event))
      const context = graph.current?.context
      if (
        disposed ||
        !context ||
        context.state === 'running' ||
        context.state === 'closed' ||
        (pending && !event)
      ) {
        return
      }
      // Ожидающий resume не мешает новой попытке прямо внутри жеста пользователя.
      const request = context.resume()
      pending = request
      void request
        .then(() => {
          if (!disposed && graph.current?.context === context) {
            reported = false
            publishBlocked(context.state !== 'running')
          }
        })
        .catch((error: unknown) => {
          if (!disposed && !reported) {
            reported = true
            reportError(error)
          }
        })
        .finally(() => {
          if (pending === request) {
            pending = null
          }
        })
    }

    let timer: ReturnType<typeof setTimeout>
    const check = (): void => {
      resume()
      const current = graph.current
      if (current) {
        current.analyser.getFloatTimeDomainData(current.samples)
        const rms = Math.sqrt(
          current.samples.reduce((sum, value) => sum + value * value, 0) /
            current.samples.length,
        )

        dispatch({
          type: 'audioChanged',
          audio: {
            level:
              current.context.state === 'running'
                ? Math.min(100, Math.round(rms * 350))
                : 0,
          },
        })
      }
      timer = setTimeout(check, 1000)
    }

    // События обрабатываются синхронно, пока браузер разрешает запуск звука.
    const events = ['click', 'keydown', 'touchend'] as const
    for (const event of events) {
      document.addEventListener(event, resume, true)
    }
    check()
    return () => {
      disposed = true
      clearTimeout(timer)
      for (const event of events) {
        document.removeEventListener(event, resume, true)
      }
    }
  }, [active, publishBlocked, reportError, dispatch, resumeSources])
  useEffect(() => {
    if (graph.current) {
      graph.current.output.gain.value = state.audio.muted
        ? 0
        : state.audio.volume
    }
  }, [active, state.audio.muted, state.audio.volume])
  useEffect(() => {
    const context = graph.current?.context
    if (state.audio.resumeRequest && context) {
      void context
        .resume()
        .then(() => {
          if (graph.current?.context === context) {
            publishBlocked(context.state !== 'running')
          }
        })
        .catch(reportError)
    }
  }, [state.audio.resumeRequest, publishBlocked, reportError])
}
