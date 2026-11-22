import type { Dispatch } from 'react'
import type { CallRoomQuery } from 'app/gql/generated'
import type {
  CallAudioState,
  CallConnectionEvent,
  CallConnection,
  CallMedia,
  CallMediaPool,
  JoinedCallRoom,
} from '../../interfaces'
import type { CallMediaRuntime } from '../../helpers/createCallMedia'
import type { CallConnectionRuntime } from '../../helpers/createCallConnection'

export interface CallRoomState {
  viewed: boolean
  room: CallRoomQuery['callRoom']
  loading: boolean
  session: JoinedCallRoom | null
  connection: CallConnection
  handle: CallConnectionRuntime | null
}

export interface CallMediaState extends CallMedia {
  handle: CallMediaRuntime | null
}

export interface CallsState {
  rooms: Record<string, CallRoomState>
  media: Record<string, CallMediaState>
  codes: Record<string, string>
  audio: CallAudioState
  pool: CallMediaPool
}

export type CallsEvent =
  | { type: 'roomOpened'; id: string }
  | { type: 'roomChanged'; id: string; room: Partial<CallRoomState> }
  | { type: 'roomRemoved'; id: string }
  | { type: 'connectionChanged'; id: string; event: CallConnectionEvent }
  | { type: 'mediaOpened'; id: string }
  | { type: 'mediaChanged'; id: string; media: Partial<CallMediaState> }
  | { type: 'mediaRemoved'; id: string }
  | { type: 'codeChanged'; id: string; code: string }
  | { type: 'codeRemoved'; id: string }
  | { type: 'audioChanged'; audio: Partial<CallAudioState> }

export interface CallsContextValue {
  state: CallsState
  dispatch: Dispatch<CallsEvent>
}
