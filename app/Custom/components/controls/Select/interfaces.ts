import type * as React from 'react'
import type { ControlCollectionProps } from '../ListBox/interfaces'

export interface SelectProps extends ControlCollectionProps {
  id?: string
  name?: string
  label?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  value?: string | null
  defaultValue?: string | null
  onChange?: (value: string | null) => void
  onBlur?: React.FocusEventHandler<Element>
  ref?: React.Ref<HTMLButtonElement>
  disabled?: boolean
  required?: boolean
  placeholder?: string
  autoComplete?: string
}
