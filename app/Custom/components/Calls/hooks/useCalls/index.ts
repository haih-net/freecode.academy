import { useReducer } from 'react'
import { createCallMediaPool } from '../../helpers/createCallMediaPool'
import { initialCallConnection } from '../../helpers/createCallConnection'
import { updateCallConnection } from '../../helpers/updateCallConnection'
import type { CallsContextValue, CallsEvent, CallsState } from './interfaces'

export function createCallsState(): CallsState {
  return {
    rooms: {},
    media: {},
    codes: {},
    audio: {
      volume: 1,
      muted: false,
      blocked: false,
      level: 0,
      resumeRequest: 0,
    },
    pool: createCallMediaPool(),
  }
}

export function callsReducer(state: CallsState, event: CallsEvent): CallsState {
  switch (event.type) {
    case 'roomOpened':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [event.id]: state.rooms[event.id]
            ? { ...state.rooms[event.id], viewed: true }
            : {
                viewed: true,
                room: undefined,
                loading: true,
                session: null,
                connection: initialCallConnection,
                handle: null,
              },
        },
      }
    case 'roomChanged':
      return state.rooms[event.id]
        ? {
            ...state,
            rooms: {
              ...state.rooms,
              [event.id]: { ...state.rooms[event.id], ...event.room },
            },
          }
        : state
    case 'connectionChanged': {
      const room = state.rooms[event.id]
      return room
        ? {
            ...state,
            rooms: {
              ...state.rooms,
              [event.id]: {
                ...room,
                connection: updateCallConnection(room.connection, event.event),
              },
            },
          }
        : state
    }
    case 'roomRemoved': {
      const rooms = { ...state.rooms }
      delete rooms[event.id]
      return { ...state, rooms }
    }
    case 'mediaOpened':
      return state.media[event.id]
        ? state
        : {
            ...state,
            media: {
              ...state.media,
              [event.id]: {
                handle: null,
                devices: [],
                streams: { microphone: null, camera: null, screen: null },
                busy: { microphone: false, camera: false, screen: false },
                selectedDevices: { microphone: '', camera: '', screen: '' },
              },
            },
          }
    case 'mediaChanged':
      return state.media[event.id]
        ? {
            ...state,
            media: {
              ...state.media,
              [event.id]: { ...state.media[event.id], ...event.media },
            },
          }
        : state
    case 'mediaRemoved': {
      const media = { ...state.media }
      delete media[event.id]
      return { ...state, media }
    }
    case 'codeChanged':
      return { ...state, codes: { ...state.codes, [event.id]: event.code } }
    case 'codeRemoved': {
      const codes = { ...state.codes }
      delete codes[event.id]
      return { ...state, codes }
    }
    case 'audioChanged':
      return { ...state, audio: { ...state.audio, ...event.audio } }
  }
}

export function useCalls(): CallsContextValue {
  const [state, dispatch] = useReducer(
    callsReducer,
    undefined,
    createCallsState,
  )

  return { state, dispatch }
}
