import {
  useOpenCallRoom,
  useCallRoom,
} from 'app/Custom/components/Calls/hooks/useCallRoom'
import { useCallRoomMutations } from 'app/Custom/components/Calls/hooks/useCallRoomMutations'
import { useCallNotifications } from 'app/Custom/components/Calls/hooks/useCallNotifications'
import { roomMediaId } from 'app/Custom/components/Calls/hooks/useCallMedia'
import { AuthModal } from 'app/Custom/components/Auth/AuthModal'
import type * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAppContext } from 'app/Custom/components/AppContext'
import { CallRoomStyled } from './styles'
import { DeviceControls } from 'app/Custom/components/Calls/DeviceControls'
import { ActiveCall } from 'app/Custom/components/Calls/ActiveCall'
import { JoinCallForm } from 'app/Custom/components/Calls/JoinForm'
import { CallRoomForm } from 'app/Custom/components/Calls/RoomForm'
import { CallInvitation } from 'app/Custom/components/Calls/Invitation'
import { Button } from 'app/Custom/components/Button'
const CallRoomView: React.FC<{ id: string }> = ({ id }) => {
  const { user, userLoading, calls } = useAppContext() ?? {}
  const [confirmClose, setConfirmClose] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const openAuth = useCallback((): void => setAuthOpen(true), [])
  const closeAuth = useCallback((): void => setAuthOpen(false), [])
  const requestClose = useCallback((): void => setConfirmClose(true), [])
  const cancelClose = useCallback((): void => setConfirmClose(false), [])
  useOpenCallRoom(id)
  const { join, leave } = useCallRoom(id)
  const { saveRoom, closeRoom, closing } = useCallRoomMutations()
  const { reportError } = useCallNotifications()
  const save = useCallback(
    (data: Parameters<typeof saveRoom>[1]) => saveRoom(id, data),
    [id, saveRoom],
  )

  const endRoom = useCallback(() => {
    void closeRoom(id).catch(reportError)
  }, [id, closeRoom, reportError])

  const call = calls?.state.rooms[id]
  const code = calls?.state.codes[id] ?? ''
  useEffect(() => setConfirmClose(false), [call?.session])
  if (!call) {
    return (
      <CallRoomStyled>
        <p>Загрузка комнаты…</p>
      </CallRoomStyled>
    )
  }
  const { room, loading, session } = call

  if (loading && !room) {
    return (
      <CallRoomStyled>
        <p>Загрузка комнаты…</p>
      </CallRoomStyled>
    )
  }
  if (!room) {
    return (
      <CallRoomStyled>
        <h1>Комната недоступна</h1>
        <p role="alert">Комната не найдена или недоступна</p>
        <Link to="/calls">К видеозвонкам</Link>
      </CallRoomStyled>
    )
  }
  const canManage = room.isOwner || (user?.sudo && user.status === 'active')
  const roomSettings = (
    <details className="panel" open={Boolean(session)}>
      <summary>Настройки комнаты</summary>
      {!confirmClose && (
        <CallRoomForm
          key={`${room.title}:${room.authenticatedOnly}:${room.hasAccessCode}`}
          editing
          initial={{
            title: room.title ?? '',
            authenticatedOnly: Boolean(room.authenticatedOnly),
          }}
          onSave={save}
        />
      )}
      <div className="actions">
        {confirmClose ? (
          <>
            <p>Завершить звонок для всех и закрыть комнату?</p>
            <Button variant="danger" disabled={closing} onClick={endRoom}>
              Да, завершить для всех
            </Button>
            <Button variant="secondary" onClick={cancelClose}>
              Отмена
            </Button>
          </>
        ) : (
          <Button variant="danger" onClick={requestClose}>
            Завершить звонок для всех
          </Button>
        )}
      </div>
    </details>
  )

  if (session && !room.closed) {
    return (
      <CallRoomStyled data-active="true">
        <h1 className="call-page-title" tabIndex={-1}>
          {room.title}
        </h1>
        <ActiveCall
          session={session}
          onLeave={leave}
          connection={call.connection}
          invitation={
            <CallInvitation
              roomId={id}
              code={code}
              hasCode={Boolean(room.hasAccessCode)}
            />
          }
          roomSettings={canManage ? roomSettings : undefined}
        />
      </CallRoomStyled>
    )
  }
  return (
    <CallRoomStyled className="room-page">
      <nav>
        <Link to="/calls">Видеозвонки</Link>
        <Link to="/calls/devices">Проверка устройств</Link>
      </nav>
      <h1 tabIndex={-1}>{room.title}</h1>
      <p>
        {room.authenticatedOnly
          ? 'Вход только для авторизованных пользователей'
          : 'Вход всем по ссылке'}
        {room.hasAccessCode ? ' · Защищено кодом' : ' · Без кода доступа'}
      </p>
      {room.closed ? (
        <p role="status">Звонок завершён. Комната закрыта.</p>
      ) : (
        <>
          <div className="prejoin-layout">
            <div className="prejoin-preview">
              <DeviceControls mediaId={roomMediaId(id)} roomId={id} />
            </div>
            <div className="panel join-panel">
              <span className="eyebrow">Всё готово к занятию?</span>
              <h2>Присоединиться к уроку</h2>
              {userLoading ? (
                <p>Загрузка…</p>
              ) : room.authenticatedOnly && !user ? (
                <p>
                  Для этой комнаты нужна авторизация.{' '}
                  <Button variant="secondary" onClick={openAuth}>
                    Войти в аккаунт
                  </Button>
                  . После входа приглашение останется на этой странице.
                </p>
              ) : (
                <JoinCallForm
                  hasCode={Boolean(room.hasAccessCode)}
                  code={code}
                  name={user?.fullname || user?.username || ''}
                  onJoin={join}
                />
              )}
              <p className="hint">
                Можно войти без камеры и микрофона и включить их позже.
              </p>
            </div>
          </div>

          <details className="panel invitation-panel">
            <summary>Пригласить на занятие</summary>
            <CallInvitation
              roomId={id}
              code={code}
              hasCode={Boolean(room.hasAccessCode)}
            />
          </details>
          {canManage && roomSettings}
        </>
      )}
      <AuthModal isOpen={authOpen} onClose={closeAuth} />
    </CallRoomStyled>
  )
}

export const CallRoomPage: React.FC = () => {
  const { roomId = '' } = useParams()
  return <CallRoomView key={roomId} id={roomId} />
}
