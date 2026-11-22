import { builder } from '../../builder'
export const CallRoomSettingsInput = builder.inputType(
  'CallRoomSettingsInput',
  {
    fields: (t) => ({
      title: t.string({ required: true }),
      authenticatedOnly: t.boolean({ required: true }),
      accessCode: t.string(),
    }),
  },
)
export const JoinCallRoomInput = builder.inputType('JoinCallRoomInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    accessCode: t.string(),
  }),
})
