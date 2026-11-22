import type {
  CreateCallRoomMutationVariables,
  JoinCallRoomMutation,
} from 'app/gql/generated'

export type CallMediaKind = 'microphone' | 'camera' | 'screen'

export type CallMediaStreams = Record<CallMediaKind, MediaStream | null>

export interface CallMediaStatus {
  microphone: boolean
  camera: boolean
  screen: boolean
}

export interface CallMedia {
  streams: CallMediaStreams
  busy: Record<CallMediaKind, boolean>
  selectedDevices: Record<CallMediaKind, string>
  devices: MediaDeviceInfo[]
}

export interface CallMediaLease {
  stream: Promise<MediaStream>
  release: () => void
}

export interface CallMediaPool {
  acquire: (kind: CallMediaKind, deviceId?: string) => CallMediaLease
}

export type JoinedCallRoom = NonNullable<JoinCallRoomMutation['joinCallRoom']>

export type CallRoomFormData = CreateCallRoomMutationVariables['data']

export interface CallSignal {
  description?: RTCSessionDescriptionInit
  candidate?: RTCIceCandidateInit
  media?: CallMediaStatus
  connectionId?: string
  reset?: boolean
}

export interface CallPeer {
  id: string
  name: string
  connected: boolean
  image?: string | null
}

export type CallServerMessage =
  | {
      type: 'welcome'
      id: string
      self?: CallPeer
      peers: CallPeer[]
      epoch: string
      sessionToken: string
      iceServers: RTCIceServer[]
    }
  | { type: 'joined'; peer: CallPeer }
  | { type: 'peer-status'; id: string; connected: boolean }
  | { type: 'left'; id: string }
  | { type: 'signal'; from: string; payload: CallSignal }
  | { type: 'settings' | 'closed' | 'pong' }
  | { type: 'error'; message: string }

export interface CallConnectionStatus {
  phase: 'connecting' | 'connected' | 'reconnecting' | 'denied'
  attempt: number
  nextAttemptAt: number | null
  message: string
}

export interface CallSignalingOptions {
  url: string
  sessionToken: string
  onMessage: (message: CallServerMessage) => void
  onStatus: (status: CallConnectionStatus) => void
  onStopped: () => void
}

export interface CallSignaling {
  send: (message: unknown) => boolean
  close: () => void
}

export interface RemoteCallPeer {
  id: string
  name: string
  image: string | null
  streams: CallMediaStreams
  media: CallMediaStatus
  signalingConnected: boolean
  state: RTCPeerConnectionState
}

export interface CallConnection {
  peers: RemoteCallPeer[]
  self: CallPeer | null
  status: CallConnectionStatus
}

export type CallConnectionEvent =
  | { type: 'statusChanged'; status: CallConnectionStatus }
  | { type: 'selfReceived'; self: CallPeer | null }
  | { type: 'peerJoined'; peer: RemoteCallPeer }
  | {
      type: 'peerUpdated'
      id: string
      changes: Partial<Omit<RemoteCallPeer, 'id' | 'streams'>>
    }
  | { type: 'peerLeft'; id: string }
  | {
      type: 'peerStreamReceived'
      id: string
      kind: CallMediaKind
      stream: MediaStream
    }
  | { type: 'connectionError'; message: string }

export interface CallAudioState {
  volume: number
  muted: boolean
  blocked: boolean
  level: number
  resumeRequest: number
}
