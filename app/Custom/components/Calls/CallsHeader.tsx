import type { CallRoomState } from './hooks/useCalls/interfaces'
import { useCallRoom } from './hooks/useCallRoom'
import { useCallMedia } from './hooks/useCallMedia'
import { useCallAudioActions } from './hooks/useCallAudio'
import { roomMediaId } from './hooks/useCallMedia'
import type * as React from 'react'
import { useCallback, useEffect, useRef } from 'react'
import {
  useConnectionMessage,
  reconnectingHint,
} from './hooks/useConnectionMessage'
import { Link, useNavigate } from 'react-router'
import {
  CircleAlert,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { useAppContext } from '../AppContext'

import { CallsHeaderStyled } from './headerStyles'

const CallControls: React.FC<{ id: string; call: CallRoomState }> = ({
  id,
  call,
}) => {
  const menu = useRef<HTMLDetailsElement>(null)
  const audio = useAppContext()?.calls?.state.audio
  const { resume } = useCallAudioActions()
  const closeMenu = useCallback((): void => {
    if (menu.current) {
      menu.current.open = false
    }
  }, [])

  useEffect(() => {
    const onPointer = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !menu.current?.contains(event.target)
      ) {
        closeMenu()
      }
    }

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && menu.current?.open) {
        closeMenu()
        menu.current.querySelector('summary')?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [closeMenu])

  const { connection, session, room } = call
  const media = useCallMedia(roomMediaId(id))
  const { status } = connection
  const stopped = room?.closed || status.phase === 'denied'
  const title = room?.title ?? 'Звонок'
  const navigate = useNavigate()
  const { leave } = useCallRoom(id)
  const toggleMedia = media.handle?.toggle
  const toggleMicrophone = useCallback(
    (): void => toggleMedia?.('microphone'),
    [toggleMedia],
  )

  const toggleCamera = useCallback(
    (): void => toggleMedia?.('camera'),
    [toggleMedia],
  )

  const exit = useCallback((): void => {
    leave()
    if (stopped) {
      void navigate(`/calls/${id}`)
    }
  }, [leave, stopped, navigate, id])

  const statusMessage = useConnectionMessage(status)
  const connectionMessage = room?.closed
    ? 'Звонок завершён. Комната закрыта.'
    : statusMessage +
      (status.phase === 'reconnecting' ? ` ${reconnectingHint}` : '')

  const noTurn =
    session &&
    !session.iceServers.some((server) =>
      server.urls.some((url) => url.startsWith('turn')),
    )

  return (
    <details className="call-item" ref={menu} name="header-call-menu">
      <summary
        title={`Звонок: ${title}`}
        aria-label={`Меню звонка: ${title}`}
        data-error={stopped || status.phase === 'reconnecting'}
      >
        <Phone size={18} aria-hidden="true" />
      </summary>
      <div
        className="call-dropdown"
        role="group"
        aria-label={`Звонок: ${title}`}
      >
        <Link
          className="call-link"
          onClick={closeMenu}
          to={`/calls/${id}`}
          title={`Открыть звонок: ${title}`}
        >
          <Phone size={16} aria-hidden="true" />
          <span>{title}</span>
        </Link>
        <span
          className="call-status"
          data-error={stopped || status.phase === 'reconnecting'}
          title={connectionMessage}
          aria-label={connectionMessage}
          role="status"
          tabIndex={0}
        >
          {status.phase === 'connected' && !stopped ? (
            <Wifi size={16} />
          ) : (
            <WifiOff size={16} />
          )}
          <span>{connectionMessage}</span>
        </span>
        {noTurn && (
          <span
            className="call-status"
            title="TURN не настроен: некоторые сети могут не соединиться напрямую."
            aria-label="TURN не настроен: некоторые сети могут не соединиться напрямую."
            tabIndex={0}
          >
            <CircleAlert size={16} />
            <span>
              TURN не настроен: некоторые сети могут не соединиться напрямую.
            </span>
          </span>
        )}
        <button
          type="button"
          title={`Микрофон: ${title}`}
          aria-label={`Микрофон: ${title}`}
          aria-pressed={Boolean(media.streams.microphone)}
          disabled={media.busy.microphone || Boolean(stopped)}
          onClick={toggleMicrophone}
        >
          {media.streams.microphone ? <Mic size={16} /> : <MicOff size={16} />}
          <span>
            {media.streams.microphone
              ? 'Выключить микрофон'
              : 'Включить микрофон'}
          </span>
        </button>
        <button
          type="button"
          title={`Камера: ${title}`}
          aria-label={`Камера: ${title}`}
          aria-pressed={Boolean(media.streams.camera)}
          disabled={media.busy.camera || Boolean(stopped)}
          onClick={toggleCamera}
        >
          {media.streams.camera ? <Video size={16} /> : <VideoOff size={16} />}
          <span>
            {media.streams.camera ? 'Выключить камеру' : 'Включить камеру'}
          </span>
        </button>
        {audio?.blocked && (
          <button
            type="button"
            onClick={resume}
            title="Браузер приостановил звук. Нажмите, чтобы включить звук всех звонков."
          >
            <CircleAlert size={16} />
            <span>Включить звук всех звонков</span>
          </button>
        )}
        <button
          className="call-leave"
          type="button"
          title={
            stopped
              ? `Вернуться ко входу: ${title}`
              : `Выйти из звонка: ${title}`
          }
          aria-label={
            stopped
              ? `Вернуться ко входу: ${title}`
              : `Выйти из звонка: ${title}`
          }
          onClick={exit}
        >
          <PhoneOff size={16} />
          <span>{stopped ? 'Вернуться ко входу' : 'Выйти из звонка'}</span>
        </button>
      </div>
    </details>
  )
}

const ConnectedCallsHeader: React.FC = () => {
  const calls = useAppContext()?.calls
  if (!calls) {
    return null
  }
  const active = Object.values(calls.state.rooms).some((entry) => entry.session)

  return (
    <CallsHeaderStyled aria-label="Текущие звонки" hidden={!active}>
      {Object.entries(calls.state.rooms).map(([id, entry]) =>
        entry.session ? <CallControls key={id} id={id} call={entry} /> : null,
      )}
    </CallsHeaderStyled>
  )
}

export const CallsHeader: React.FC = () => {
  const context = useAppContext()
  return context ? <ConnectedCallsHeader /> : null
}
