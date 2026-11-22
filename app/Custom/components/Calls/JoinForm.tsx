import { useCallNotifications } from './hooks/useCallNotifications'
import { TextField } from '../controls/TextField'
import { useCallback } from 'react'
import type * as React from 'react'
import { useEffect, useId } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Controller,
  FormProvider,
  useForm,
  type ControllerProps,
} from 'react-hook-form'
import { type JoinCallRoomMutationVariables } from 'app/gql/generated'
import { Button } from '../Button'
import { FormStyled } from '../Form/styles'

type FormData = JoinCallRoomMutationVariables['data']
const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup
    .string()
    .trim()
    .required('Укажите имя')
    .max(60, 'Максимум 60 символов'),
  accessCode: yup.string().nullable().max(64, 'Максимум 64 символа'),
})

export const JoinCallForm: React.FC<{
  hasCode: boolean
  code: string
  name: string
  onJoin: (data: FormData) => Promise<void>
}> = ({ hasCode, code, name, onJoin }) => {
  const id = useId()
  const { reportError, addMessage } = useCallNotifications()
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name, accessCode: code },
  })

  useEffect(() => {
    form.setValue('accessCode', code)
  }, [code, form])
  const renderName: ControllerProps<FormData, 'name'>['render'] = useCallback(
    ({ field }) => (
      <input
        {...field}
        id={`${id}-name`}
        maxLength={60}
        autoComplete="nickname"
      />
    ),
    [id],
  )

  const renderCode: ControllerProps<FormData, 'accessCode'>['render'] =
    useCallback(
      ({ field }) => (
        <TextField
          {...field}
          value={field.value ?? ''}
          id={`${id}-code`}
          masked
          maxLength={64}
          autoComplete="off"
        />
      ),
      [id],
    )

  return (
    <FormProvider {...form}>
      <FormStyled
        onSubmit={form.handleSubmit(
          async (data) => {
            try {
              await onJoin(data)
            } catch (err) {
              reportError(err)
            }
          },
          () =>
            addMessage?.('Проверьте заполнение полей', { variant: 'warning' }),
        )}
      >
        <label htmlFor={`${id}-name`}>Ваше имя</label>
        <Controller name="name" control={form.control} render={renderName} />
        {form.formState.errors.name && (
          <p role="alert">{form.formState.errors.name.message}</p>
        )}
        {hasCode && (
          <>
            <label htmlFor={`${id}-code`}>Код доступа</label>
            <Controller
              name="accessCode"
              control={form.control}
              render={renderCode}
            />
          </>
        )}
        {form.formState.errors.accessCode && (
          <p role="alert">{form.formState.errors.accessCode.message}</p>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Вход…' : 'Войти в звонок'}
        </Button>
      </FormStyled>
    </FormProvider>
  )
}
