import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { getCallRoom } from '../helpers/getCallRoom'
builder.queryField('callRoom', (t) =>
  t.field({
    type: CallRoom,
    args: { id: t.arg.id({ required: true }) },
    resolve: (_, { id }, ctx) => getCallRoom(ctx.db, id),
  }),
)
