import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { getCallRoom } from '../helpers/getCallRoom'
import { callEvents } from '../helpers/callRuntime'

builder.mutationField('deleteCallRoom', (t) =>
  t.field({
    authScopes: { $all: { active: true, sudo: true } },
    type: CallRoom,
    args: { id: t.arg.id({ required: true }) },
    resolve: async (_, { id }, ctx) => {
      const room = await getCallRoom(ctx.db, id)
      await ctx.db('CallRoom').where({ id }).delete()
      callEvents.emit('closed', id)
      return { ...room, closed: true }
    },
  }),
)
