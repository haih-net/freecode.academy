import type * as React from 'react'
import { useContext, useEffect, useEffectEvent } from 'react'
import { getApolloContext } from '@apollo/client/react'
import { useCallRoomQuery } from 'app/gql/generated'
import { useCallsContext } from './hooks/useCallsContext'
import { useCallNotifications } from './hooks/useCallNotifications'
import { useCallAudio } from './hooks/useCallAudio'
import { roomMediaId } from './hooks/useCallMedia'
import { createCallConnection } from './helpers/createCallConnection'
import { createCallMedia } from './helpers/createCallMedia'

const MediaRuntime: React.FC<{ id: string }> = ({ id }) => {
  const { state, dispatch } = useCallsContext()
  const { reportError } = useCallNotifications()
  const read = useEffectEvent(() => state.media[id])
  const allowed = useEffectEvent(() => {
    const room = id.startsWith('room:') ? state.rooms[id.slice(5)] : undefined
    return !room?.room?.closed && room?.connection.status.phase !== 'denied'
  })

  useEffect(() => {
    const handle = createCallMedia(
      state.pool,
      () => read(),
      (media) => dispatch({ type: 'mediaChanged', id, media }),
      reportError,
      () => allowed(),
    )

    dispatch({ type: 'mediaChanged', id, media: { handle } })
    return () => handle.close()
  }, [id, state.pool, dispatch, reportError])
  return null
}

const RoomRuntime: React.FC<{ id: string }> = ({ id }) => {
  const { state, dispatch } = useCallsContext()
  const { reportError } = useCallNotifications()
  const { client } = useContext(getApolloContext())
  const { data, loading, error, refetch } = useCallRoomQuery({
    variables: { id },
    fetchPolicy: 'network-only',
    pollInterval: 15000,
  })

  const room = state.rooms[id]
  const media = state.media[roomMediaId(id)]
  const session = room.session
  const closed = room.room?.closed
  const streams = useEffectEvent(() => media.streams)
  const refresh = useEffectEvent(() => {
    void refetch().catch(reportError)
  })

  useEffect(() => {
    if (error) {
      reportError(error)
    }
  }, [error, reportError])
  useEffect(() => {
    dispatch({
      type: 'roomChanged',
      id,
      room: { room: data?.callRoom, loading },
    })
  }, [id, data, loading, dispatch])
  useEffect(() => {
    if (!session || closed || !media?.handle) {
      return
    }
    const handle = createCallConnection(
      session,
      streams(),
      (event) => {
        if (event.type === 'connectionError') {
          if (event.message) {
            reportError(new Error(event.message))
          }
        } else {
          dispatch({ type: 'connectionChanged', id, event })
          if (
            event.type === 'statusChanged' &&
            event.status.phase === 'denied'
          ) {
            reportError(new Error(event.status.message))
          }
        }
      },
      () => refresh(),
      () => {
        media.handle?.stopAll()
      },
    )

    dispatch({ type: 'roomChanged', id, room: { handle } })
    return () => handle.close()
    // Потоки обновляются отдельно без пересоздания соединения.
  }, [id, session, closed, media?.handle, dispatch, reportError])
  const mediaStreams = media?.streams
  useEffect(() => {
    if (mediaStreams) {
      room.handle?.updateStreams(mediaStreams)
    }
  }, [room.handle, mediaStreams])
  useEffect(() => {
    if (closed) {
      media?.handle?.stopAll()
    }
  }, [closed, media?.handle])
  const disconnect = useEffectEvent(() => {
    media?.handle?.stopAll()
    dispatch({ type: 'roomChanged', id, room: { session: null, handle: null } })
  })

  useEffect(() => () => disconnect(), [client])
  return null
}

export const CallsRuntime: React.FC = () => {
  const { state, dispatch } = useCallsContext()
  const { client } = useContext(getApolloContext())
  useCallAudio()
  useEffect(() => {
    for (const [id, room] of Object.entries(state.rooms)) {
      if (!room.viewed && !room.session) {
        dispatch({ type: 'roomRemoved', id })
        dispatch({ type: 'mediaRemoved', id: roomMediaId(id) })
      }
    }
  }, [state.rooms, dispatch])
  return (
    <>
      {Object.keys(state.media).map((id) => (
        <MediaRuntime key={id} id={id} />
      ))}
      {client &&
        Object.keys(state.rooms).map((id) => <RoomRuntime key={id} id={id} />)}
    </>
  )
}
