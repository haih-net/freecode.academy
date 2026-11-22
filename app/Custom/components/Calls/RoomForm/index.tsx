import { useCallNotifications } from '../hooks/useCallNotifications'
import type { CallRoomFormData } from '../interfaces'
import { AccessSelect } from './AccessSelect'
import { TextField } from '../../controls/TextField'
import { useCallback } from 'react'
import type * as React from 'react'
import { useId } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  type ControllerProps,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../Button'
import { CallRoomFormStyled } from './styles'
import { callRoomSchema } from './schema'
export const CallRoomForm: React.FC<{
  initial?: CallRoomFormData
  editing?: boolean
  onCancel?: () => void
  onSave: (data: CallRoomFormData) => Promise<void>
}> = ({ initial, editing = false, onSave, onCancel }) => {
  const id = useId()
  const { reportError, addMessage } = useCallNotifications()
  const form = useForm<CallRoomFormData>({
    resolver: yupResolver(callRoomSchema),
    defaultValues: initial ?? {
      title: '',
      authenticatedOnly: false,
      accessCode: undefined,
    },
  })

  const save = form.handleSubmit(
    async (data) => {
      try {
        await onSave(data)
        if (editing) {
          form.reset({ ...data, accessCode: undefined })
        }
      } catch (err) {
        reportError(err)
      }
    },
    () => addMessage?.('Проверьте заполнение полей', { variant: 'warning' }),
  )

  const renderTitle: ControllerProps<CallRoomFormData, 'title'>['render'] =
    useCallback(
      ({ field }) => (
        <input
          {...field}
          id={`${id}-title`}
          maxLength={100}
          placeholder="Созвон"
        />
      ),
      [id],
    )

  const renderAccess: ControllerProps<
    CallRoomFormData,
    'authenticatedOnly'
  >['render'] = useCallback(
    ({ field }) => <AccessSelect field={field} id={`${id}-access`} />,
    [id],
  )

  const renderCode: ControllerProps<CallRoomFormData, 'accessCode'>['render'] =
    useCallback(
      ({ field }) => (
        <TextField
          {...field}
          value={field.value ?? ''}
          id={`${id}-code`}
          masked
          autoComplete="off"
          maxLength={64}
        />
      ),
      [id],
    )

  const removeCode = useCallback((): void => {
    form.setValue('accessCode', '', { shouldDirty: true })
  }, [form])

  return (
    <FormProvider {...form}>
      <CallRoomFormStyled onSubmit={save}>
        <label htmlFor={`${id}-title`}>Название комнаты</label>
        <Controller name="title" control={form.control} render={renderTitle} />
        {form.formState.errors.title && (
          <p role="alert">{form.formState.errors.title.message}</p>
        )}
        <label htmlFor={`${id}-access`}>Кто может войти</label>
        <Controller
          name="authenticatedOnly"
          control={form.control}
          render={renderAccess}
        />
        <label htmlFor={`${id}-code`}>
          {editing ? 'Новый код доступа' : 'Код доступа (необязательно)'}
        </label>
        <Controller
          name="accessCode"
          control={form.control}
          render={renderCode}
        />
        {form.formState.errors.accessCode && (
          <p role="alert">{form.formState.errors.accessCode.message}</p>
        )}
        <p className="hint">
          {editing
            ? 'Нетронутое поле сохраняет прежний код. Введите новый код для замены или нажмите «Убрать код». При включении обязательной авторизации подключённые гости будут отключены.'
            : 'Код попадёт в ссылку приглашения. Его можно использовать с любым режимом доступа.'}
        </p>
        {editing && (
          <Button
            className="code-actions"
            variant="secondary"
            size="small"
            onClick={removeCode}
          >
            Убрать код
          </Button>
        )}
        {editing && form.watch('accessCode') === '' && (
          <p role="status">После сохранения вход будет без кода.</p>
        )}
        <div className="form-actions">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? 'Сохранение…'
              : editing
                ? 'Сохранить настройки'
                : 'Создать комнату'}
          </Button>
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
            >
              Отмена
            </Button>
          )}
        </div>
      </CallRoomFormStyled>
    </FormProvider>
  )
}
