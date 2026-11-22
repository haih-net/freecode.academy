import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { getCallRoom } from '../helpers/getCallRoom'
import { callEvents } from '../helpers/callRuntime'
builder.mutationField('closeCallRoom', (t) =>
  t.field({
    type: CallRoom,
    args: { id: t.arg.id({ required: true }) },
    resolve: async (_, { id }, ctx) => {
      const room = await getCallRoom(ctx.db, id)
      if (
        !ctx.currentUser ||
        (ctx.currentUser.id !== room.createdById &&
          !(
            ctx.currentUser.sudo === true && ctx.currentUser.status === 'active'
          ))
      ) {
        throw new Error('Завершить комнату может создатель или администратор')
      }
      await ctx
        .db('CallRoom')
        .where({ id })
        .update({ closed: true, version: ctx.db.raw('version + 1') })
      callEvents.emit('closed', id)
      return { ...room, closed: true }
    },
  }),
)
