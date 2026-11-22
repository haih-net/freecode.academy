import { builder } from '../../builder'
import type { CallRoomRecord, CallIceServer } from './interfaces'
import { getCallIceServers } from './helpers/getCallIceServers'
const CallIceServerType = builder
  .objectRef<CallIceServer>('CallIceServer')
  .implement({
    fields: (t) => ({
      urls: t.exposeStringList('urls', { nullable: false }),
      username: t.exposeString('username', { nullable: true }),
      credential: t.exposeString('credential', { nullable: true }),
    }),
  })

export const CallRoom = builder
  .objectRef<CallRoomRecord>('CallRoom')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      title: t.exposeString('title', { nullable: false }),
      authenticatedOnly: t.boolean({
        nullable: false,
        resolve: (room) => Boolean(room.authenticatedOnly),
      }),
      hasAccessCode: t.boolean({
        nullable: false,
        resolve: (room) => Boolean(room.accessCodeHash),
      }),
      closed: t.boolean({
        nullable: false,
        resolve: (room) => Boolean(room.closed),
      }),
      isOwner: t.boolean({
        nullable: false,
        resolve: (room, _, ctx) => ctx.currentUser?.id === room.createdById,
      }),
      sessionToken: t.exposeString('sessionToken', { nullable: true }),
      iceServers: t.field({
        type: [CallIceServerType],
        nullable: false,
        resolve: (room) => (room.sessionToken ? getCallIceServers() : []),
      }),
    }),
  })
