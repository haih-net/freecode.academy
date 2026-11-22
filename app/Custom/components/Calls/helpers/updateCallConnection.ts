import type { CallConnection, CallConnectionEvent } from '../interfaces'

export function updateCallConnection(
  connection: CallConnection,
  event: CallConnectionEvent,
): CallConnection {
  switch (event.type) {
    case 'statusChanged':
      return { ...connection, status: event.status }
    case 'selfReceived':
      return { ...connection, self: event.self }
    case 'peerJoined':
      return { ...connection, peers: [...connection.peers, event.peer] }
    case 'peerLeft':
      return {
        ...connection,
        peers: connection.peers.filter((peer) => peer.id !== event.id),
      }
    case 'peerUpdated':
      return {
        ...connection,
        peers: connection.peers.map((peer) =>
          peer.id === event.id ? { ...peer, ...event.changes } : peer,
        ),
      }
    case 'peerStreamReceived':
      return {
        ...connection,
        peers: connection.peers.map((peer) =>
          peer.id === event.id
            ? {
                ...peer,
                streams: { ...peer.streams, [event.kind]: event.stream },
              }
            : peer,
        ),
      }
    case 'connectionError':
      return connection
  }
}
