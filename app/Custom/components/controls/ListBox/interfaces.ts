import type * as React from 'react'
import type { AriaListBoxOptions } from 'react-aria'
import type { ListState } from 'react-stately'

export interface ControlOption {
  id: string
  text: string
  content?: React.ReactNode
  disabled?: boolean
}

export interface ControlGroup {
  id: string
  label: string
  hideLabel?: boolean
  items: ControlOption[]
}

export interface ControlCollectionProps {
  options?: ControlOption[]
  groups?: ControlGroup[]
}

export interface ListBoxProps {
  state: ListState<ControlOption>
  listBoxProps: AriaListBoxOptions<ControlOption>
  listBoxRef: React.RefObject<HTMLUListElement | null>
  loading?: boolean
  error?: string
  renderEmptyContent?: (close: () => void) => React.ReactNode
  onClose: () => void
}
