import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const SelectStyled = styled.div`
  font-family: ${theme.font};
  width: 100%;
  min-width: 0;
`
export const SelectLabelStyled = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 700;
`
export const SelectTriggerStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-height: 46px;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  background: ${theme.colors.background};
  color: ${theme.colors.foreground};
  font: inherit;
  text-align: left;
  cursor: pointer;
  &:hover:not(:disabled) {
    border-color: ${theme.colors.borderHover};
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  &:disabled {
    background: #f2f3ef;
    opacity: 0.7;
    cursor: not-allowed;
  }
  &[aria-invalid='true'] {
    border-color: ${theme.colors.error};
  }
  &[data-placeholder='true'] {
    color: ${theme.colors.text.secondary};
  }
  > svg {
    flex-shrink: 0;
  }
`
export const SelectValueStyled = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`
