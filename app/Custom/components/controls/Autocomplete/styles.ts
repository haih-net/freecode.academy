import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const AutocompleteStyled = styled.div`
  font-family: ${theme.font};
  min-width: 0;
  width: 100%;
`
export const AutocompleteLabelStyled = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 700;
`
export const AutocompleteFieldStyled = styled.div`
  position: relative;
  min-width: 0;
  &&&& input {
    display: block;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    min-height: 46px;
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    background: ${theme.colors.background};
    font: inherit;
    padding: 12px 84px 12px 14px;
    color: ${theme.colors.foreground};
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
    &:disabled {
      background: #f2f3ef;
      opacity: 0.7;
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.error};
    }
  }
`
export const AutocompleteTriggerStyled = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 0 9px 9px 0;
  background: transparent;
  color: ${theme.colors.foreground};
  cursor: pointer;
  &:hover:not(:disabled) {
    background: #eef1e9;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
