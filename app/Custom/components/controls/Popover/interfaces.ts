import type * as React from 'react'
import type { OverlayTriggerState } from 'react-stately'

export interface PopoverProps {
  state: OverlayTriggerState
  triggerRef: React.RefObject<HTMLElement | null>
  popoverRef: React.RefObject<HTMLDivElement | null>
  isNonModal?: boolean
  children: React.ReactNode
}
