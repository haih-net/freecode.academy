import { useCallRoomMutations } from './hooks/useCallRoomMutations'
import { useCallNotifications } from './hooks/useCallNotifications'
import type * as React from 'react'
import { useCallback } from 'react'
import { useAppContext } from '../AppContext'
import { Button } from '../Button'

export const KickCallParticipant: React.FC<{
  roomId: string
  participantId: string
  name: string
}> = ({ roomId, participantId, name }) => {
  const { user } = useAppContext() ?? {}
  const { kickParticipant: kick, kicking: loading } = useCallRoomMutations()
  const { reportError } = useCallNotifications()
  const kickParticipant = useCallback(async (): Promise<void> => {
    if (!window.confirm(`Исключить участника «${name}» из звонка?`)) {
      return
    }
    try {
      if (!kick) {
        throw new Error('Управление звонками недоступно')
      }
      await kick(roomId, participantId)
    } catch (err) {
      reportError(err)
    }
  }, [kick, roomId, participantId, name, reportError])

  if (!user?.sudo || user.status !== 'active') {
    return null
  }
  return (
    <div>
      <Button variant="danger" disabled={loading} onClick={kickParticipant}>
        Исключить участника
      </Button>
    </div>
  )
}
