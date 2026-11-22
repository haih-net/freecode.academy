import type * as React from 'react'
import { X } from 'lucide-react'
import type { ClearButtonProps } from './interfaces'
import { ClearButtonStyled } from './styles'

export const ClearButton: React.FC<ClearButtonProps> = ({
  onClear,
  disabled,
}) => (
  <ClearButtonStyled
    data-react-aria-top-layer
    type="button"
    disabled={disabled}
    aria-label="Сбросить выбор"
    onClick={onClear}
  >
    <X size={18} aria-hidden="true" />
  </ClearButtonStyled>
)
