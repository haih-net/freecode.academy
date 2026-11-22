import { randomUUID } from 'node:crypto'
import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { CallRoomSettingsInput } from '../inputs'
import { hashPassword } from '../../User/helpers/auth'
import { validateCallSettings } from '../helpers/validateCallSettings'
import type { CallRoomRecord } from '../interfaces'
builder.mutationField('createCallRoom', (t) =>
  t.field({
    type: CallRoom,
    args: { data: t.arg({ type: CallRoomSettingsInput, required: true }) },
    resolve: async (_, { data }, ctx) => {
      if (!ctx.currentUser) {
        throw new Error('Войдите, чтобы создать комнату')
      }
      validateCallSettings(data.title, data.accessCode)
      const room: CallRoomRecord = {
        id: randomUUID(),
        title: data.title.trim(),
        createdById: ctx.currentUser.id,
        authenticatedOnly: data.authenticatedOnly,
        accessCodeHash: data.accessCode
          ? await hashPassword(data.accessCode)
          : null,
        closed: false,
        version: 1,
      }

      await ctx.db('CallRoom').insert(room)
      return room
    },
  }),
)
