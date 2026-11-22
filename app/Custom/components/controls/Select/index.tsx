import type * as React from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { HiddenSelect, useButton, useObjectRef, useSelect } from 'react-aria'
import { useSelectState } from 'react-stately'
import { ChevronDown } from 'lucide-react'
import type { Key } from '@react-types/shared'
import type { ControlOption } from '../ListBox/interfaces'
import { createCollection } from '../ListBox/helpers/createCollection'
import { getDisabledKeys } from '../ListBox/helpers/getDisabledKeys'
import { ListBox } from '../ListBox'
import { Popover } from '../Popover'
import type { SelectProps } from './interfaces'
import {
  SelectStyled,
  SelectLabelStyled,
  SelectTriggerStyled,
  SelectValueStyled,
} from './styles'

export const Select: React.FC<SelectProps> = ({
  options,
  groups,
  ref,
  disabled,
  required,
  placeholder = 'Выберите значение',
  onChange,
  ...props
}) => {
  const triggerRef = useObjectRef(ref)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const children = useMemo(
    () => createCollection({ options, groups }),
    [options, groups],
  )

  const disabledKeys = useMemo(
    () => getDisabledKeys({ options, groups }),
    [options, groups],
  )

  const change = useCallback(
    (key: Key | null): void => onChange?.(key === null ? null : String(key)),
    [onChange],
  )

  const selectProps = {
    ...props,
    onChange: change,
    isDisabled: disabled,
    isRequired: required,
    isInvalid: props['aria-invalid'],
    children,
    disabledKeys,
    validationBehavior: 'aria' as const,
  }

  const state = useSelectState<ControlOption>(selectProps)
  const { labelProps, triggerProps, valueProps, menuProps, hiddenSelectProps } =
    useSelect(selectProps, state, triggerRef)

  const { buttonProps } = useButton(triggerProps, triggerRef)
  return (
    <SelectStyled>
      {props.label && (
        <SelectLabelStyled {...labelProps}>{props.label}</SelectLabelStyled>
      )}
      <HiddenSelect {...hiddenSelectProps} />
      <SelectTriggerStyled
        {...buttonProps}
        ref={triggerRef}
        data-placeholder={state.value === null}
      >
        <SelectValueStyled {...valueProps}>
          {state.selectedItems[0]?.rendered ?? placeholder}
        </SelectValueStyled>
        <ChevronDown size={20} aria-hidden="true" />
      </SelectTriggerStyled>
      {state.isOpen && (
        <Popover state={state} triggerRef={triggerRef} popoverRef={popoverRef}>
          <ListBox
            state={state}
            listBoxProps={menuProps}
            listBoxRef={listBoxRef}
            onClose={state.close}
          />
        </Popover>
      )}
    </SelectStyled>
  )
}
