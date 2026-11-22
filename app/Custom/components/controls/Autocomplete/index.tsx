import type * as React from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useButton, useComboBox, useFilter, useObjectRef } from 'react-aria'
import { useComboBoxState } from 'react-stately'
import type { Key } from '@react-types/shared'
import type { ControlOption } from '../ListBox/interfaces'
import { createCollection } from '../ListBox/helpers/createCollection'
import { getDisabledKeys } from '../ListBox/helpers/getDisabledKeys'
import { ListBox } from '../ListBox'
import { Popover } from '../Popover'
import { ClearButton } from './ClearButton'
import { useAutocompleteSearch } from './hooks/useAutocompleteSearch'
import type { AutocompleteProps } from './interfaces'
import {
  AutocompleteStyled,
  AutocompleteLabelStyled,
  AutocompleteFieldStyled,
  AutocompleteTriggerStyled,
} from './styles'

const acceptAll = (): boolean => true

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  groups,
  ref,
  anchorRef,
  disabled,
  required,
  loading,
  error,
  onSearch,
  searchDelay = 250,
  onSubmit,
  onClear,
  renderEmptyContent,
  onChange,
  name,
  placeholder = 'Начните вводить',
  ...props
}) => {
  const inputRef = useObjectRef(ref)
  const fieldRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { contains } = useFilter({ sensitivity: 'base' })
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

  const comboProps = {
    ...props,
    onChange: change,
    children,
    disabledKeys,
    isDisabled: disabled,
    isRequired: required,
    isInvalid: props['aria-invalid'],
    allowsEmptyCollection: true,
    menuTrigger: 'focus' as const,
    validationBehavior: 'aria' as const,
  }

  const state = useComboBoxState<ControlOption>({
    ...comboProps,
    defaultFilter: onSearch ? acceptAll : contains,
  })

  const {
    inputProps,
    listBoxProps,
    buttonProps: triggerProps,
    labelProps,
  } = useComboBox(
    { ...comboProps, inputRef, listBoxRef, popoverRef, buttonRef },
    state,
  )

  const { buttonProps } = useButton(triggerProps, buttonRef)
  const search = useAutocompleteSearch(
    state.inputValue,
    onSearch,
    searchDelay,
    disabled,
  )

  const clear = useCallback((): void => {
    state.close()
    state.setValue(null)
    state.setInputValue('')
    onClear?.()
    inputRef.current?.focus()
  }, [state, onClear, inputRef])

  const keyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (
        onSubmit &&
        event.key === 'Enter' &&
        !event.nativeEvent.isComposing &&
        (!state.isOpen || state.selectionManager.focusedKey === null)
      ) {
        event.preventDefault()
        state.close()
        onSubmit()
        return
      }
      inputProps.onKeyDown?.(event)
    },
    [state, onSubmit, inputProps],
  )

  return (
    <AutocompleteStyled>
      {props.label && (
        <AutocompleteLabelStyled {...labelProps}>
          {props.label}
        </AutocompleteLabelStyled>
      )}
      <AutocompleteFieldStyled ref={fieldRef}>
        <input
          {...inputProps}
          onKeyDown={keyDown}
          ref={inputRef}
          placeholder={placeholder}
        />
        {state.inputValue.length > 0 && (
          <ClearButton onClear={clear} disabled={disabled} />
        )}
        <AutocompleteTriggerStyled {...buttonProps} ref={buttonRef}>
          <ChevronDown size={20} aria-hidden="true" />
        </AutocompleteTriggerStyled>
      </AutocompleteFieldStyled>
      {name && (
        <input
          type="hidden"
          name={name}
          value={state.value ?? ''}
          disabled={disabled}
        />
      )}
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={anchorRef ?? fieldRef}
          popoverRef={popoverRef}
          isNonModal
        >
          <ListBox
            state={state}
            listBoxProps={listBoxProps}
            listBoxRef={listBoxRef}
            loading={loading || search.loading}
            error={error ?? search.error}
            renderEmptyContent={renderEmptyContent}
            onClose={state.close}
          />
        </Popover>
      )}
    </AutocompleteStyled>
  )
}
