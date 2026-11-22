import { builder } from '../../../builder'
import { CallRoom } from '../types'
import type { CallRoomRecord } from '../interfaces'

builder.queryField('callRooms', (t) =>
  t.field({
    authScopes: { $all: { active: true, sudo: true } },
    type: [CallRoom],
    nullable: false,
    resolve: async (_, __, ctx): Promise<CallRoomRecord[]> =>
      ctx.db<CallRoomRecord>('CallRoom').orderBy('title').orderBy('id'),
  }),
)
