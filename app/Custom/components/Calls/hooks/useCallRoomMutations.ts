import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client/react'
import {
  CallRoomsDocument,
  useCreateCallRoomMutation,
  useUpdateCallRoomMutation,
  useCloseCallRoomMutation,
  useDeleteCallRoomMutation,
  useKickCallRoomParticipantMutation,
  type CreateCallRoomMutationVariables,
  type UpdateCallRoomMutationVariables,
} from 'app/gql/generated'
import { useCallsContext } from './useCallsContext'
import { useCallNotifications } from './useCallNotifications'

export function useCallRoomMutations() {
  const { dispatch } = useCallsContext()
  const client = useApolloClient()
  const { addMessage } = useCallNotifications()
  const [create] = useCreateCallRoomMutation()
  const [save] = useUpdateCallRoomMutation()
  const [close, closing] = useCloseCallRoomMutation()
  const [remove, deleting] = useDeleteCallRoomMutation()
  const [kick, kicking] = useKickCallRoomParticipantMutation()
  const createRoom = useCallback(
    async (data: CreateCallRoomMutationVariables['data']): Promise<string> => {
      const result = await create({ variables: { data } })
      const room = result.data?.createCallRoom
      if (!room) {
        throw new Error('Сервер не вернул комнату')
      }
      dispatch({
        type: 'codeChanged',
        id: room.id,
        code: data.accessCode ?? '',
      })
      await client.refetchQueries({ include: [CallRoomsDocument] })
      addMessage?.('Комната создана', { variant: 'success' })
      return room.id
    },
    [create, dispatch, client, addMessage],
  )

  const saveRoom = useCallback(
    async (
      id: string,
      data: UpdateCallRoomMutationVariables['data'],
    ): Promise<void> => {
      const result = await save({ variables: { id, data } })
      const room = result.data?.updateCallRoom
      if (!room) {
        throw new Error('Сервер не вернул комнату')
      }
      if (data.accessCode !== null && data.accessCode !== undefined) {
        dispatch({ type: 'codeChanged', id, code: data.accessCode })
      }
      dispatch({ type: 'roomChanged', id, room: { room } })
      addMessage?.('Настройки сохранены', { variant: 'success' })
    },
    [save, dispatch, addMessage],
  )

  const closeRoom = useCallback(
    async (id: string): Promise<void> => {
      const result = await close({ variables: { id } })
      const room = result.data?.closeCallRoom
      if (!room) {
        throw new Error('Сервер не вернул комнату')
      }
      dispatch({ type: 'roomChanged', id, room: { room, session: null } })
      addMessage?.('Звонок завершён', { variant: 'success' })
    },
    [close, dispatch, addMessage],
  )

  const deleteRoom = useCallback(
    async (id: string): Promise<void> => {
      const result = await remove({ variables: { id } })
      if (!result.data?.deleteCallRoom) {
        throw new Error('Сервер не вернул комнату')
      }
      dispatch({
        type: 'roomChanged',
        id,
        room: {
          room: { ...result.data.deleteCallRoom, closed: true },
          session: null,
        },
      })
      dispatch({ type: 'codeRemoved', id })
      await client.refetchQueries({ include: [CallRoomsDocument] })
      addMessage?.('Комната удалена', { variant: 'success' })
    },
    [remove, dispatch, client, addMessage],
  )

  const kickParticipant = useCallback(
    async (id: string, participantId: string): Promise<void> => {
      const result = await kick({ variables: { id, participantId } })
      if (!result.data?.kickCallRoomParticipant) {
        throw new Error('Сервер не вернул комнату')
      }
      addMessage?.('Участник исключён', { variant: 'success' })
    },
    [kick, addMessage],
  )

  return {
    createRoom,
    saveRoom,
    closeRoom,
    deleteRoom,
    kickParticipant,
    closing: closing.loading,
    deleting: deleting.loading,
    kicking: kicking.loading,
  }
}
