import { styled } from '@linaria/react'
import { theme } from '../../../theme'

export const TextFieldStyled = styled.span`
  display: block;
  position: relative;
  width: 100%;
  min-width: 0;

  input {
    width: 100%;
    box-sizing: border-box;
    min-height: 46px;
    padding: 12px 14px;
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    background: white;
    color: ${theme.colors.text.primary};
    font: inherit;
  }

  &&&& input {
    display: block;
    margin: 0;
  }

  &&[data-reveal] input {
    padding-right: 52px;
  }

  input[data-masked] {
    -webkit-text-security: disc;
  }

  input:disabled {
    background: #f2f3ef;
    opacity: 0.7;
  }

  && > button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 46px;
    min-height: 0;
    padding: 0;
    border-radius: 0 9px 9px 0;

    [data-icon='action'] {
      display: none;
    }

    &:focus-visible:not(:disabled) {
      [data-icon='state'] {
        display: none;
      }
      [data-icon='action'] {
        display: block;
      }
    }

    @media (hover: hover) {
      &:hover:not(:disabled) {
        [data-icon='state'] {
          display: none;
        }
        [data-icon='action'] {
          display: block;
        }
      }
    }
  }
`
