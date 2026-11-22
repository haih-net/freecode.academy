import type { CallRoomFormData } from './interfaces'
import type * as React from 'react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import type { CallRoomNoNestingFragment } from 'app/gql/generated'
import { useCallRoomMutations } from './hooks/useCallRoomMutations'
import { useCallNotifications } from './hooks/useCallNotifications'
import { Button } from '../Button'
import { CallRoomForm } from './RoomForm'

type RoomAction = 'settings' | 'close' | 'delete' | null

export const CallRoomListItem: React.FC<{
  room: CallRoomNoNestingFragment
}> = ({ room }) => {
  const [action, setAction] = useState<RoomAction>(null)
  const {
    saveRoom: update,
    closeRoom: close,
    deleteRoom: remove,
    closing,
    deleting,
  } = useCallRoomMutations()

  const { reportError } = useCallNotifications()
  const busy = closing || deleting

  const cancel = useCallback((): void => setAction(null), [])
  const select = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const value = event.currentTarget.dataset.action
      if (value === 'settings' || value === 'close' || value === 'delete') {
        setAction(value)
      }
    },
    [],
  )

  const save = useCallback(
    async (data: CallRoomFormData): Promise<void> => {
      if (!update) {
        throw new Error('Управление звонками недоступно')
      }
      await update(room.id, data)
      setAction(null)
    },
    [update, room.id],
  )

  const confirm = useCallback(async (): Promise<void> => {
    try {
      if (!remove || !close) {
        throw new Error('Управление звонками недоступно')
      }
      if (action === 'delete') {
        await remove(room.id)
      } else if (action === 'close') {
        await close(room.id)
      } else {
        return
      }
      setAction(null)
    } catch (err) {
      reportError(err)
    }
  }, [action, remove, close, room.id, reportError])

  return (
    <li>
      <div className="room-row">
        <div className="room-info">
          <Link className="room-title" to={`/calls/${room.id}`}>
            {room.title}
          </Link>
          <div className="room-details">
            <span>{room.closed ? 'Комната закрыта' : 'Комната открыта'}</span>
            <span>
              {room.authenticatedOnly
                ? 'Только авторизованным'
                : 'Всем по ссылке'}
            </span>
            <span>
              {room.hasAccessCode ? 'Защищено кодом' : 'Без кода доступа'}
            </span>
          </div>
        </div>
        {!action && (
          <div className="room-actions">
            {!room.closed && (
              <>
                <Button
                  size="small"
                  variant="secondary"
                  data-action="settings"
                  onClick={select}
                >
                  Настройки
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  data-action="close"
                  onClick={select}
                >
                  Завершить звонок
                </Button>
              </>
            )}
            <Button
              size="small"
              variant="danger"
              data-action="delete"
              onClick={select}
            >
              Удалить
            </Button>
          </div>
        )}
      </div>
      {action === 'settings' && !room.closed && (
        <div className="room-settings">
          <CallRoomForm
            editing
            initial={{
              title: room.title,
              authenticatedOnly: room.authenticatedOnly,
            }}
            onSave={save}
            onCancel={cancel}
          />
        </div>
      )}
      {(action === 'close' || action === 'delete') && (
        <div className="room-confirmation">
          <p>
            {action === 'delete'
              ? 'Удалить комнату и отключить всех участников? Отменить удаление нельзя.'
              : 'Завершить звонок для всех и закрыть комнату? Повторное открытие недоступно.'}
          </p>
          <Button
            size="small"
            variant="danger"
            disabled={busy}
            onClick={confirm}
          >
            {action === 'delete' ? 'Да, удалить' : 'Да, завершить для всех'}
          </Button>
          <Button
            size="small"
            variant="secondary"
            disabled={busy}
            onClick={cancel}
          >
            Отмена
          </Button>
        </div>
      )}
    </li>
  )
}
