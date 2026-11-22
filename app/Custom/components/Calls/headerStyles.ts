import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const CallsHeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
  margin-left: auto;
  &[hidden] {
    display: none;
  }
  .call-item {
    font-size: 14px;
  }
  summary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    list-style: none;
    cursor: pointer;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:hover,
  .call-item[open] summary {
    background: #eef1e9;
  }
  .call-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: min(300px, calc(100vw - 32px));
    max-height: calc(100dvh - 72px);
    overflow-y: auto;
    padding: 8px;
    border: 1px solid ${theme.colors.border};
    border-radius: 12px;
    background: ${theme.backgrounds.page};
    box-shadow: 0 12px 32px #1d30251a;
  }
  .call-link,
  .call-status,
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    color: inherit;
    text-align: left;
    overflow-wrap: anywhere;
  }
  svg {
    flex-shrink: 0;
  }
  .call-link {
    font-weight: 700;
    text-decoration: none;
  }
  .call-status {
    font-size: 12px;
    color: ${theme.colors.text.secondary};
  }
  button {
    border: 0;
    background: transparent;
    font: inherit;
    cursor: pointer;
  }
  .call-link:hover,
  button:hover {
    background: #eef1e9;
  }
  button[aria-pressed='true'] {
    background: #cce6d2;
  }
  .call-leave,
  [data-error='true'] {
    color: #a52d28;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  :focus-visible {
    outline: 2px solid #24583f;
    outline-offset: 2px;
  }
`
