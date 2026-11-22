import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const ClearButtonStyled = styled.button`
  position: absolute;
  right: 44px;
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  &:hover:not(:disabled) {
    background: #eef1e9;
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
