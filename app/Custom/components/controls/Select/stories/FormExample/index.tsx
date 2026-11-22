import type * as React from 'react'
import { useCallback, useState } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  type ControllerProps,
} from 'react-hook-form'
import { Select } from '../..'
import { FormStyled } from '../../../../Form/styles'
import { Button } from '../../../../Button'
import { options } from '../options'

interface FormData {
  access: string | null
}

export const FormExample: React.FC = () => {
  const form = useForm<FormData>({ defaultValues: { access: '' } })
  const [saved, setSaved] = useState('')
  const renderAccess = useCallback<
    ControllerProps<FormData, 'access'>['render']
  >(
    ({ field }) => (
      <Select {...field} label="Кто может войти" options={options} />
    ),
    [],
  )

  const save = useCallback(
    (data: FormData): void => setSaved(JSON.stringify(data)),
    [],
  )

  const reset = useCallback((): void => form.reset(), [form])
  return (
    <FormProvider {...form}>
      <FormStyled onSubmit={form.handleSubmit(save)}>
        <Controller
          name="access"
          control={form.control}
          render={renderAccess}
        />
        <Button type="submit">Сохранить</Button>
        <Button onClick={reset}>Сбросить форму</Button>
        <output aria-label="Сохранённые данные">{saved}</output>
      </FormStyled>
    </FormProvider>
  )
}
