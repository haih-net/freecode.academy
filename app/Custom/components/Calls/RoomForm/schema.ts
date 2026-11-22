import type { CallRoomFormData } from '../interfaces'
import * as yup from 'yup'
export const callRoomSchema: yup.ObjectSchema<CallRoomFormData> = yup.object({
  title: yup
    .string()
    .trim()
    .required('Укажите название')
    .max(100, 'Максимум 100 символов'),
  authenticatedOnly: yup.boolean().required(),
  accessCode: yup
    .string()
    .nullable()
    .max(64, 'Максимум 64 символа')
    .test(
      'bytes',
      'Код слишком длинный: максимум 72 байта',
      (value) => !value || new TextEncoder().encode(value).length <= 72,
    ),
})
