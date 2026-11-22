import type * as React from 'react'
import { useEffect } from 'react'
import { useCallRoomsQuery } from 'app/gql/generated'
import { useCallNotifications } from './hooks/useCallNotifications'
import { CallRoomListItem } from './RoomListItem'
import { CallRoomListStyled } from './styles'

export const CallRoomList: React.FC = () => {
  const { data, loading, error } = useCallRoomsQuery({
    fetchPolicy: 'network-only',
  })

  const { reportError } = useCallNotifications()
  useEffect(() => {
    if (error) {
      reportError(error)
    }
  }, [error, reportError])
  const rooms = data?.callRooms
  return (
    <CallRoomListStyled className="panel">
      <h2>Существующие звонки</h2>
      {loading && <p>Загрузка…</p>}
      {rooms?.length === 0 && <p>Звонков пока нет.</p>}
      <ul>
        {rooms?.map((room) => (
          <CallRoomListItem key={room.id} room={room} />
        ))}
      </ul>
    </CallRoomListStyled>
  )
}
