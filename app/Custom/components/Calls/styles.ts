import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'
import { ButtonStyled } from '../Button/styles'
export const CallsStyled = styled.section`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  min-width: 0;
  nav,
  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    margin: 16px 0;
  }
  .panel {
    border: 1px solid ${theme.colors.border};
    background: ${theme.backgrounds.paper};
    padding: 20px;
    border-radius: 16px;
    margin: 20px 0;
    min-width: 0;
  }
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1fr);
  }
  video {
    width: 100%;
    max-height: 440px;
    background: #162d26;
    border-radius: 12px;
    object-fit: contain;
  }
  audio {
    width: 100%;
  }
  select,
  input:not([type='checkbox']) {
    max-width: 100%;
    padding: 10px;
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
    font: inherit;
  }
  label {
    display: block;
    margin: 12px 0;
  }
  label select {
    display: block;
    width: 100%;
    margin-top: 6px;
  }
  meter {
    width: 100%;
    height: 24px;
  }
  [role='alert'] {
    color: #9e2929;
    overflow-wrap: anywhere;
  }
  .hint {
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }
  .invitation {
    width: 100%;
    box-sizing: border-box;
  }
  h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin: 16px 0;
  }
  h2 {
    margin: 0 0 14px;
  }
  h3 {
    margin: 12px 0;
  }
  p {
    line-height: 1.65;
  }
  summary {
    cursor: pointer;
    font-weight: 700;
    padding: 4px 0;
  }
  ${ButtonStyled} {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
  input,
  select {
    box-sizing: border-box;
    background: ${theme.backgrounds.paper};
    color: ${theme.colors.foreground};
  }
  .eyebrow {
    display: block;
    color: ${theme.colors.primary};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .calls-content {
    padding: 12px 0 40px;
    width: 100%;
  }
  .create-room {
    margin: 0 auto 32px;
  }
  .call-invite {
    display: flex;
    gap: 16px;
    padding: 20px;
    background: ${theme.backgrounds.elevated};
    border-radius: 16px;
    margin-top: 24px;
  }
  .call-invite svg {
    flex-shrink: 0;
    color: ${theme.colors.primary};
  }
  .call-invite p {
    margin: 6px 0 0;
  }
  .feature-grid {
    display: grid;
    gap: 16px;
  }
  .feature {
    padding: 24px;
    border: 1px solid ${theme.colors.border};
    border-radius: 20px;
    background: ${theme.backgrounds.paper};
  }
  .feature svg {
    color: ${theme.colors.primary};
  }
  .feature p {
    margin-bottom: 0;
  }
  .device-preview {
    position: relative;
  }
  .device-preview video {
    display: block;
    aspect-ratio: 16 / 9;
  }
  .preview-off {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    color: #e8d3ba;
    pointer-events: none;
  }
  .device-selects {
    display: grid;
    gap: 12px;
  }
  .device-selects label {
    min-width: 0;
  }
  .device-toggles button {
    flex: 1;
  }
  .prejoin-layout {
    display: grid;
    gap: 24px;
    align-items: start;
    margin: 28px 0;
  }
  .prejoin-layout .panel {
    margin: 0;
  }
  .prejoin-preview video {
    aspect-ratio: 16 / 9;
    display: block;
  }
  .prejoin-preview .grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .join-panel {
    padding: 28px;
  }
  .invitation-panel .panel {
    padding: 16px 0 0;
    border: 0;
    margin: 0;
  }
  @media (min-width: 800px) {
    .device-selects {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .feature-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .prejoin-layout {
      grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
    }
    .join-panel {
      position: sticky;
      top: 24px;
    }
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`

export const CallRoomListStyled = styled.section`
  h2 {
    margin: 0 0 8px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 12px 0;
  }
  li + li {
    border-top: 1px solid #d8ddd7;
  }
  li:last-child {
    padding-bottom: 0;
  }
  .room-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 16px;
  }
  .room-info {
    flex: 1 1 160px;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .room-details,
  .room-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .room-details {
    margin-top: 4px;
  }
  .room-details span + span::before {
    content: '·';
    margin-right: 8px;
  }
  .room-settings {
    max-width: 560px;
    margin-top: 16px;
  }
  .room-details {
    color: #58665e;
    font-size: 0.9rem;
  }
  .room-confirmation {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .room-confirmation p {
    flex-basis: 100%;
    margin: 0;
  }
`
