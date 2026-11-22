import { builder } from '../../../builder'
import { CallRoom } from '../types'
import { CallRoomSettingsInput } from '../inputs'
import { hashPassword } from '../../User/helpers/auth'
import { getCallRoom } from '../helpers/getCallRoom'
import { validateCallSettings } from '../helpers/validateCallSettings'
import { callEvents } from '../helpers/callRuntime'
builder.mutationField('updateCallRoom', (t) =>
  t.field({
    type: CallRoom,
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: CallRoomSettingsInput, required: true }),
    },
    resolve: async (_, { id, data }, ctx) => {
      const room = await getCallRoom(ctx.db, id)
      if (
        !ctx.currentUser ||
        (ctx.currentUser.id !== room.createdById &&
          !(
            ctx.currentUser.sudo === true && ctx.currentUser.status === 'active'
          ))
      ) {
        throw new Error('Настройки доступны создателю и администратору')
      }
      if (room.closed) {
        throw new Error('Комната закрыта')
      }
      validateCallSettings(data.title, data.accessCode)
      const updated = {
        title: data.title.trim(),
        authenticatedOnly: data.authenticatedOnly,
        accessCodeHash:
          data.accessCode === null || data.accessCode === undefined
            ? room.accessCodeHash
            : data.accessCode
              ? await hashPassword(data.accessCode)
              : null,
        version: room.version + 1,
      }

      const changed = await ctx
        .db('CallRoom')
        .where({ id, version: room.version, closed: false })
        .update(updated)

      if (!changed) {
        throw new Error('Настройки изменились. Обновите страницу.')
      }
      callEvents.emit('settings', id, data.authenticatedOnly)
      return { ...room, ...updated }
    },
  }),
)
