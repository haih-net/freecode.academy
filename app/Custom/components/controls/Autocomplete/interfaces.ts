import type * as React from 'react'
import type { SelectProps } from '../Select/interfaces'

export interface AutocompleteProps extends Omit<SelectProps, 'onBlur' | 'ref'> {
  ref?: React.Ref<HTMLInputElement>
  anchorRef?: React.RefObject<HTMLElement | null>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  inputValue?: string
  defaultInputValue?: string
  onInputChange?: (value: string) => void
  onSearch?: (query: string, signal: AbortSignal) => void | Promise<void>
  searchDelay?: number
  loading?: boolean
  error?: string
  allowsCustomValue?: boolean
  onSubmit?: () => void
  onClear?: () => void
  renderEmptyContent?: (close: () => void) => React.ReactNode
}
