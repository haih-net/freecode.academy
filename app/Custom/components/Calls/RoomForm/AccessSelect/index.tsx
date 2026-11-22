import type { ControllerRenderProps } from 'react-hook-form'
import type { CallRoomFormData } from '../../interfaces'

interface AccessSelectProps {
  field: ControllerRenderProps<CallRoomFormData, 'authenticatedOnly'>
  id: string
}
import type * as React from 'react'
import { useCallback } from 'react'
import { Select } from '../../../controls/Select'
import type { ControlOption } from '../../../controls/ListBox/interfaces'

const options: ControlOption[] = [
  { id: 'everyone', text: 'Всем по ссылке' },
  { id: 'authenticated', text: 'Только авторизованным' },
]

export const AccessSelect: React.FC<AccessSelectProps> = ({ field, id }) => {
  const change = useCallback(
    (value: string | null): void => field.onChange(value === 'authenticated'),
    [field],
  )

  return (
    <Select
      {...field}
      id={id}
      aria-label="Кто может войти"
      value={field.value ? 'authenticated' : 'everyone'}
      onChange={change}
      options={options}
    />
  )
}
