import { useCallback, useEffect } from 'react'
import {
  useJoinCallRoomMutation,
  type JoinCallRoomMutationVariables,
} from 'app/gql/generated'
import { useCallsContext } from './useCallsContext'
import { roomMediaId } from './useCallMedia'
import { initialCallConnection } from '../helpers/createCallConnection'

export function useOpenCallRoom(id: string): void {
  const { dispatch } = useCallsContext()
  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1))
    const code = params.get('code')
    if (code !== null) {
      dispatch({ type: 'codeChanged', id, code })
      params.delete('code')
      const hash = params.toString()
      history.replaceState(
        history.state,
        '',
        location.pathname + location.search + (hash ? `#${hash}` : ''),
      )
    }
    dispatch({ type: 'roomOpened', id })
    dispatch({ type: 'mediaOpened', id: roomMediaId(id) })
    return () => dispatch({ type: 'roomChanged', id, room: { viewed: false } })
  }, [id, dispatch])
}

export function useCallRoom(id: string) {
  const { state, dispatch } = useCallsContext()
  const [joinMutation] = useJoinCallRoomMutation()
  const media = state.media[roomMediaId(id)]
  const leave = useCallback((): void => {
    media?.handle?.stopAll()
    dispatch({
      type: 'roomChanged',
      id,
      room: { session: null, connection: initialCallConnection },
    })
  }, [media, dispatch, id])

  const join = useCallback(
    async (data: JoinCallRoomMutationVariables['data']): Promise<void> => {
      const result = await joinMutation({
        variables: { id, data },
        fetchPolicy: 'no-cache',
      })

      const session = result.data?.joinCallRoom
      if (!session?.sessionToken) {
        throw new Error('Не удалось войти в комнату')
      }
      dispatch({ type: 'codeChanged', id, code: data.accessCode ?? '' })
      dispatch({
        type: 'roomChanged',
        id,
        room: { session, connection: initialCallConnection },
      })
    },
    [id, dispatch, joinMutation],
  )

  return { join, leave }
}
