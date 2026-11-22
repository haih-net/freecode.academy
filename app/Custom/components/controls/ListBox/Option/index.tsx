import type * as React from 'react'
import { useRef } from 'react'
import { useOption } from 'react-aria'
import { Check } from 'lucide-react'
import type { OptionProps } from './interfaces'
import { OptionStyled, OptionContentStyled } from './styles'

export const Option: React.FC<OptionProps> = ({ item, state }) => {
  const ref = useRef<HTMLLIElement>(null)
  const { optionProps, isFocused, isSelected, isDisabled } = useOption(
    { key: item.key },
    state,
    ref,
  )

  return (
    <OptionStyled
      {...optionProps}
      ref={ref}
      data-focused={isFocused}
      data-selected={isSelected}
      data-disabled={isDisabled}
    >
      <OptionContentStyled>{item.rendered}</OptionContentStyled>
      {isSelected && <Check size={18} aria-hidden="true" />}
    </OptionStyled>
  )
}
