import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const OptionStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 42px;
  box-sizing: border-box;
  padding: 10px 14px;
  cursor: pointer;
  outline: none;
  &[data-focused='true'],
  &:hover:not([data-disabled='true']) {
    background: #eef1e9;
  }
  &[data-selected='true'] {
    color: ${theme.colors.primary};
    font-weight: 700;
  }
  &[data-focused='true'] {
    box-shadow: inset 0 0 0 1px ${theme.colors.borderHover};
  }
  &[data-disabled='true'] {
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
  > svg {
    flex-shrink: 0;
  }
`
export const OptionContentStyled = styled.span`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`
