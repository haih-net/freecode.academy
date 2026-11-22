import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { getCallRoom } from '../helpers/getCallRoom'
import { callEvents } from '../helpers/callRuntime'

builder.mutationField('kickCallRoomParticipant', (t) =>
  t.field({
    authScopes: { $all: { active: true, sudo: true } },
    type: CallRoom,
    args: {
      id: t.arg.id({ required: true }),
      participantId: t.arg.id({ required: true }),
    },
    resolve: async (_, { id, participantId }, ctx) => {
      const room = await getCallRoom(ctx.db, id)
      callEvents.emit('kick', id, participantId)
      return room
    },
  }),
)
