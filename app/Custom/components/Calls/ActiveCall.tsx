import { useCallMedia } from './hooks/useCallMedia'
import { roomMediaId } from './hooks/useCallMedia'
import type { CallConnection, JoinedCallRoom } from './interfaces'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  Settings,
  Link,
  X,
  ChevronUp,
  ChevronDown,
  Users,
  SlidersHorizontal,
} from 'lucide-react'
import type * as React from 'react'

import { UserAvatar } from '../UserAvatar'
import { useAppContext } from '../AppContext'
import { KickCallParticipant } from './KickParticipant'
import type { UserNoNestingFragment } from 'app/gql/generated'
import { MediaView } from './MediaView'
import { DeviceControls } from './DeviceControls'
import { ConferenceStyled } from './conferenceStyles'

const states: Record<RTCPeerConnectionState, string> = {
  new: 'Подключение',
  connecting: 'Подключение',
  connected: 'На связи',
  disconnected: 'Связь прервана',
  failed: 'Не удалось установить связь',
  closed: 'Соединение закрыто',
}

type Panel = 'devices' | 'invitation' | 'room' | null
interface Tile {
  id: string
  name: string
  user: Pick<UserNoNestingFragment, 'fullname' | 'username' | 'image'>
  stream: MediaStream | null
  screen: MediaStream | null
  microphone: boolean
  status: string
}

export const ActiveCall: React.FC<{
  session: JoinedCallRoom
  onLeave: () => void
  connection: CallConnection
  invitation: React.ReactNode
  roomSettings?: React.ReactNode
}> = ({ session, onLeave, connection, invitation, roomSettings }) => {
  const media = useCallMedia(roomMediaId(session.id))
  const toggleMedia = media.handle?.toggle
  const { user } = useAppContext() ?? {}
  const { peers, self, status } = connection

  const [selected, setSelected] = useState<string | null>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [participantsOpen, setParticipantsOpen] = useState(true)
  const participantsToggle = useRef<HTMLButtonElement>(null)
  const [page, setPage] = useState(0)
  const [capacity, setCapacity] = useState(3)
  const rail = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  const toggleScreen = useCallback(
    (): void => toggleMedia?.('screen'),
    [toggleMedia],
  )

  const toggleMicrophone = useCallback(
    (): void => toggleMedia?.('microphone'),
    [toggleMedia],
  )

  const toggleCamera = useCallback(
    (): void => toggleMedia?.('camera'),
    [toggleMedia],
  )

  const toggleParticipants = useCallback(
    (): void => setParticipantsOpen((open) => !open),
    [],
  )

  const closeParticipants = useCallback((): void => {
    setParticipantsOpen(false)
    participantsToggle.current?.focus()
  }, [])

  const closePanel = useCallback((): void => setPanel(null), [])
  const openDevices = useCallback((): void => setPanel('devices'), [])
  const openInvitation = useCallback((): void => setPanel('invitation'), [])
  const openRoom = useCallback((): void => setPanel('room'), [])
  const selectTile = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => setSelected(event.currentTarget.dataset.tile ?? null),
    [],
  )

  const previous = useCallback(
    (): void =>
      setPage((value) =>
        Math.max(
          0,
          Math.min(value, Math.ceil((peers.length + 1) / capacity) - 1) - 1,
        ),
      ),
    [peers.length, capacity],
  )

  const next = useCallback((): void => setPage((value) => value + 1), [])
  useEffect(() => {
    const element = rail.current
    if (!element) {
      return
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) {
        setCapacity(Math.max(1, Math.floor(entry.contentRect.height / 150)))
      }
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (panel) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [panel])
  const tiles: Tile[] = [
    ...peers.map((peer) => ({
      id: peer.id,
      name: peer.name,
      user: { fullname: peer.name, username: null, image: peer.image },
      stream: peer.media.camera ? peer.streams.camera : null,
      screen: peer.media.screen ? peer.streams.screen : null,
      microphone: peer.media.microphone,
      status: peer.signalingConnected
        ? states[peer.state]
        : 'Участник восстанавливает связь с сервером.',
    })),
    {
      id: 'self',
      name: 'Вы',
      user: user ?? {
        fullname: self?.name || 'Гость',
        username: null,
        image: self?.image ?? null,
      },
      stream: media.streams.camera,
      screen: media.streams.screen,
      microphone: Boolean(media.streams.microphone),
      status: '',
    },
  ]

  const presenting = tiles.find((tile) => tile.screen)
  const focused =
    tiles.find((tile) => tile.id === selected) ?? presenting ?? tiles[0]

  const mainStream = focused.screen ?? focused.stream
  const pages = Math.ceil(tiles.length / capacity)
  const currentPage = Math.min(page, pages - 1)
  const visible = tiles.slice(
    currentPage * capacity,
    (currentPage + 1) * capacity,
  )

  const stopped = status.phase === 'denied'

  return (
    <ConferenceStyled>
      <div
        className="conference-workspace"
        data-participants-open={participantsOpen}
      >
        <section className="conference-stage" aria-label="Основной экран">
          {mainStream ? (
            <MediaView
              stream={mainStream}
              muted
              label={
                focused.screen
                  ? `Экран: ${focused.name}`
                  : `Камера: ${focused.name}`
              }
            />
          ) : (
            <div className="stage-placeholder">
              <span className="conference-avatar">
                <UserAvatar user={focused.user} size="inherit" />
              </span>
              <p>Камера выключена</p>
              {!peers.length && (
                <p className="waiting-copy">
                  Здесь появятся участники, когда откроют приглашение и войдут.
                </p>
              )}
            </div>
          )}
          <div className="stage-caption">
            {focused.screen && (
              <>
                <MonitorUp size={16} />
                <h3>Демонстрация экрана</h3>
              </>
            )}
            <span>{focused.name}</span>
            {focused.id !== 'self' && !stopped && (
              <KickCallParticipant
                roomId={session.id}
                participantId={focused.id}
                name={focused.name}
              />
            )}
          </div>
        </section>
        <aside
          id="call-participants"
          className="conference-sidebar"
          aria-label="Участники"
          hidden={!participantsOpen}
        >
          <div className="participants-heading">
            <h2>Участники: {tiles.length}</h2>
            <button
              type="button"
              className="participants-close"
              onClick={closeParticipants}
              aria-label="Закрыть панель участников"
              title="Закрыть панель участников"
            >
              <X size={18} />
            </button>
          </div>
          <div className="conference-rail" ref={rail}>
            {visible.map((tile) => (
              <button
                type="button"
                className="conference-tile"
                key={tile.id}
                data-tile={tile.id}
                onClick={selectTile}
                aria-label={`Показать крупно: ${tile.name}`}
                aria-pressed={tile.id === focused.id}
              >
                <div className="tile-picture">
                  {tile.stream ? (
                    <MediaView
                      stream={tile.stream}
                      muted
                      label={`Миниатюра: ${tile.name}`}
                    />
                  ) : (
                    <span className="tile-avatar">
                      <UserAvatar user={tile.user} size="inherit" />
                    </span>
                  )}
                </div>
                <div className="tile-caption">
                  <span>{tile.name}</span>
                  {tile.microphone ? <Mic size={14} /> : <MicOff size={14} />}
                  {tile.screen && <MonitorUp size={14} />}
                </div>
                {tile.status && (
                  <span className="tile-status">{tile.status}</span>
                )}
              </button>
            ))}
          </div>
          <div className="rail-pager">
            <button
              type="button"
              onClick={previous}
              disabled={currentPage === 0}
              aria-label="Предыдущие участники"
            >
              <ChevronUp size={18} />
            </button>
            <span>
              {currentPage + 1} / {pages}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={currentPage >= pages - 1}
              aria-label="Следующие участники"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </aside>
      </div>
      <div
        className="conference-toolbar"
        role="toolbar"
        aria-label="Управление звонком"
      >
        <button
          type="button"
          className="participants-toggle"
          ref={participantsToggle}
          onClick={toggleParticipants}
          aria-label={`Участники: ${tiles.length}`}
          aria-expanded={participantsOpen}
          aria-controls="call-participants"
          title="Участники"
        >
          <Users size={16} />
          {tiles.length}
        </button>
        <button
          type="button"
          title="Микрофон"
          aria-label="Микрофон"
          aria-pressed={Boolean(media.streams.microphone)}
          data-off={!media.streams.microphone}
          disabled={media.busy.microphone || stopped}
          onClick={toggleMicrophone}
        >
          {media.streams.microphone ? <Mic /> : <MicOff />}
        </button>
        <button
          type="button"
          title="Камера"
          aria-label="Камера"
          aria-pressed={Boolean(media.streams.camera)}
          data-off={!media.streams.camera}
          disabled={media.busy.camera || stopped}
          onClick={toggleCamera}
        >
          {media.streams.camera ? <Video /> : <VideoOff />}
        </button>
        <button
          type="button"
          title="Демонстрация экрана"
          aria-label={
            media.streams.screen
              ? 'Остановить демонстрацию'
              : 'Поделиться экраном'
          }
          aria-pressed={Boolean(media.streams.screen)}
          disabled={media.busy.screen || stopped}
          onClick={toggleScreen}
        >
          <MonitorUp />
        </button>
        <button
          type="button"
          title="Пригласить на занятие"
          aria-label="Пригласить на занятие"
          onClick={openInvitation}
        >
          <Link />
        </button>
        <button
          type="button"
          title="Настройки камеры и микрофона"
          aria-label="Настройки камеры и микрофона"
          onClick={openDevices}
        >
          <Settings />
        </button>
        {roomSettings && (
          <button
            type="button"
            title="Настройки комнаты"
            aria-label="Настройки комнаты"
            onClick={openRoom}
          >
            <SlidersHorizontal />
          </button>
        )}
        <button
          type="button"
          className="hangup"
          title="Выйти из звонка"
          aria-label="Выйти из звонка"
          onClick={onLeave}
        >
          <PhoneOff />
        </button>
      </div>
      <dialog
        className="conference-dialog"
        ref={dialog}
        onCancel={closePanel}
        onClose={closePanel}
        aria-label={
          panel === 'devices'
            ? 'Настройки камеры и микрофона'
            : panel === 'room'
              ? 'Настройки комнаты'
              : 'Пригласить на занятие'
        }
      >
        <button
          type="button"
          className="dialog-close"
          onClick={closePanel}
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>
        {panel === 'devices' && (
          <DeviceControls
            mediaId={roomMediaId(session.id)}
            roomId={session.id}
            compact
          />
        )}
        {panel === 'invitation' && invitation}
        {panel === 'room' && roomSettings}
      </dialog>
    </ConferenceStyled>
  )
}
