import type * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  useCallRoom,
  useOpenCallRoom,
} from 'app/Custom/components/Calls/hooks/useCallRoom'
import { useCallsContext } from 'app/Custom/components/Calls/hooks/useCallsContext'
import { useCallNotifications } from 'app/Custom/components/Calls/hooks/useCallNotifications'
import { MediaView } from 'app/Custom/components/Calls/MediaView'

const BroadcastReceiver: React.FC<{ id: string }> = ({ id }) => {
  useOpenCallRoom(id)
  const { state } = useCallsContext()
  const { join, leave } = useCallRoom(id)
  const { reportError } = useCallNotifications()
  const [busy, setBusy] = useState(false)
  const room = state.rooms[id]
  const leaveRef = useRef(leave)
  useEffect(() => {
    leaveRef.current = leave
  }, [leave])
  useEffect(() => () => leaveRef.current(), [])
  const start = useCallback(async (): Promise<void> => {
    setBusy(true)
    try {
      await join({ name: 'Проверка приёма', accessCode: state.codes[id] ?? '' })
    } catch (error) {
      reportError(error)
    } finally {
      setBusy(false)
    }
  }, [join, state.codes, id, reportError])

  const peer = room?.connection.peers[0]
  return (
    <section className="panel">
      <h2>Проверка приёма по WebRTC</h2>
      <p>
        Локальный транслятор передаёт движущуюся картинку и тестовый тон. Камера
        и микрофон для этой проверки не нужны.
      </p>
      {room?.session ? (
        <>
          <div className="actions">
            <button type="button" onClick={leave}>
              Остановить проверку связи
            </button>
          </div>
          <p role="status">
            {peer?.state === 'connected'
              ? 'Транслятор подключён'
              : 'Ожидание транслятора…'}
          </p>
          {peer?.streams.camera && (
            <MediaView
              stream={peer.streams.camera}
              muted
              label="Видео тестового транслятора"
            />
          )}
          <label>
            Сигнал в общем аудиоканале{' '}
            <meter
              min={0}
              max={100}
              value={state.audio.level}
              aria-label="Сигнал в общем аудиоканале"
            />
          </label>
          <p>
            {state.audio.blocked
              ? 'Браузер приостановил аудиоконтекст.'
              : state.audio.level > 0
                ? 'Звуковой сигнал проходит через общий регулятор громкости.'
                : 'В общем аудиоканале пока нет сигнала.'}
          </p>
        </>
      ) : (
        <div className="actions">
          <button
            type="button"
            disabled={busy || !room || room.loading}
            onClick={start}
          >
            Начать проверку связи
          </button>
        </div>
      )}
    </section>
  )
}

export const TestBroadcast: React.FC = () => {
  const [params] = useSearchParams()
  const id = params.get('broadcastRoom')
  return import.meta.env.DEV && id ? (
    <BroadcastReceiver key={id} id={id} />
  ) : null
}
