import { styled } from '@linaria/react'

export const ConferenceStyled = styled.div`
  height: 100%;
  min-height: 0;
  min-width: 0;
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  gap: 6px;
  padding: 10px 10px 72px;
  background: #192421;
  color: #fffaf4;
  h1 {
    font-size: 16px;
    margin: 0;
    overflow-wrap: anywhere;
  }
  h2 {
    font-size: 12px;
    margin: 0;
  }
  p {
    margin: 0;
    line-height: 1.35;
  }
  .participants-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .participants-toggle,
  .participants-close {
    min-height: 32px;
    min-width: 32px;
    padding: 6px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
  .participants-close {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .participants-toggle:hover,
  .participants-close:hover,
  .participants-toggle[aria-expanded='true'] {
    background: #34483f;
  }
  .participants-toggle:focus-visible,
  .participants-close:focus-visible {
    outline: 2px solid #afd3b9;
    outline-offset: 2px;
  }
  .participants-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }
  .participants-heading h2 {
    flex-shrink: 0;
  }
  .participants-heading .participants-close {
    margin-left: auto;
  }
  .conference-sidebar[hidden] {
    display: none;
  }
  .conference-workspace[data-participants-open='false'] {
    grid-template-columns: minmax(0, 1fr);
  }
  .conference-workspace {
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 96px;
    gap: 8px;
  }
  .conference-stage {
    position: relative;
    min-height: 0;
    min-width: 0;
    border-radius: 14px;
    background: #101a17;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
  }
  .conference-stage video {
    width: 100%;
    height: 100%;
    min-height: 0;
    max-height: none;
    object-fit: contain;
    background: transparent;
    border-radius: 12px;
  }
  .stage-caption {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    padding: 10px 12px;
    font-size: 12px;
    overflow-wrap: anywhere;
  }
  .stage-placeholder {
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 12px;
    text-align: center;
    font-size: 12px;
  }
  .conference-avatar {
    width: clamp(48px, 12vw, 120px);
    aspect-ratio: 1;
    flex-shrink: 0;
    border-radius: 50%;
    background: #ddc9ad;
    color: #24483e;
    display: grid;
    place-items: center;
    font-size: clamp(24px, 4vw, 48px);
  }
  .waiting-copy {
    max-width: 320px;
    color: #b9c8c0;
  }
  .conference-sidebar {
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 8px;
  }
  .conference-rail {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  button.conference-tile {
    flex: 1 1 0;
    min-height: 0;
    max-height: 190px;
    width: 100%;
    padding: 6px;
    border-radius: 12px;
    border: 2px solid transparent;
    background: #2a3932;
    color: inherit;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto auto;
    gap: 4px;
    text-align: left;
  }
  button.conference-tile[aria-pressed='true'] {
    border-color: #a9d4b7;
  }
  .tile-picture {
    min-height: 0;
    min-width: 0;
    height: 100%;
    display: grid;
    place-items: center;
  }
  .tile-picture video {
    width: 100%;
    height: 100%;
    min-height: 0;
    max-height: none;
    object-fit: contain;
    background: transparent;
    border-radius: 6px;
  }
  .tile-avatar {
    display: grid;
    place-items: center;
    background: #dfc9ae;
    color: #23473a;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  .tile-caption {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    font-size: 10px;
  }
  .tile-caption span {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .tile-caption svg {
    flex-shrink: 0;
  }
  .tile-status {
    font-size: 9px;
    line-height: 1.2;
    color: #c1cec6;
    overflow-wrap: anywhere;
  }
  .rail-pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    gap: 2px;
  }
  .rail-pager button {
    padding: 4px;
    border: 0;
    color: inherit;
    background: #304037;
    border-radius: 6px;
  }
  .conference-toolbar {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    max-width: calc(100% - 16px);
    overflow-x: auto;
    align-items: center;
    gap: 4px;
    padding: 6px;
    border-radius: 16px;
    background: #34453b;
    box-shadow: 0 6px 24px #0003;
  }
  .conference-toolbar button {
    flex-shrink: 0;
    width: 36px;
    height: 40px;
    padding: 8px;
    border: 0;
    border-radius: 10px;
    background: #4a5b50;
    color: white;
  }
  .conference-toolbar svg {
    width: 19px;
    height: 19px;
    flex-shrink: 0;
  }
  .conference-toolbar button[data-off='true'] {
    background: #f3d2ca;
    color: #713e36;
  }
  .conference-toolbar button[aria-pressed='true'] {
    background: #53775e;
  }
  .conference-toolbar button.hangup {
    background: #c63b36;
    width: 44px;
  }
  button:focus-visible {
    outline: 2px solid #b8e5c5;
    outline-offset: 2px;
  }
  .conference-dialog {
    width: min(600px, calc(100vw - 24px));
    padding: 28px 18px 18px;
    border: 1px solid #d8c9b9;
    border-radius: 18px;
    background: #fffaf4;
    color: #101d29;
  }
  .conference-dialog::backdrop {
    background: #07100c99;
  }
  .conference-dialog .dialog-close {
    position: absolute;
    right: 8px;
    top: 6px;
    padding: 4px;
    background: transparent;
    border: 0;
  }
  .conference-dialog .panel {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .stage-caption h3 {
    font-size: inherit;
    margin: 0;
  }
  .conference-dialog .device-tabs {
    display: flex;
    gap: 6px;
    margin-top: 10px;
  }
  .conference-dialog .device-tabs button {
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #d8c9b9;
    background: transparent;
    color: inherit;
    font-size: 12px;
  }
  .conference-dialog .device-tabs button[aria-pressed='true'] {
    background: #24583f;
    color: white;
  }
  .conference-dialog .device-selects {
    grid-template-columns: minmax(0, 1fr);
  }
  .conference-dialog h2 {
    font-size: 18px;
  }

  .conference-dialog .hint {
    font-size: 12px;
  }
  .conference-dialog label {
    margin: 4px 0;
  }
  .conference-dialog form {
    display: grid;
    grid-template-columns: minmax(90px, 0.65fr) minmax(0, 1fr);
    align-items: center;
    gap: 4px 10px;
  }
  .conference-dialog form p,
  .conference-dialog form button {
    grid-column: 1 / -1;
  }

  .conference-dialog form input:not([type='checkbox']),
  .conference-dialog form select {
    min-height: 34px;
    padding: 6px 10px;
    margin: 0;
  }
  .conference-dialog form button {
    padding: 7px 12px;
  }
  .conference-dialog form [role='alert'] {
    padding: 6px;
    margin: 0;
  }

  .conference-dialog .actions {
    margin: 10px 0;
  }
  @media (min-width: 700px) {
    padding: 12px 20px 80px;
    gap: 8px;
    h1 {
      font-size: 18px;
    }
    h2 {
      font-size: 14px;
    }
    .conference-workspace {
      grid-template-columns: minmax(0, 1fr) clamp(180px, 20vw, 280px);
      gap: 14px;
    }
    .tile-caption {
      font-size: 13px;
    }
    .tile-status {
      font-size: 11px;
    }
    .tile-avatar {
      width: 48px;
      height: 48px;
      font-size: 24px;
    }
    .conference-toolbar {
      gap: 8px;
      padding: 8px;
    }
    .conference-toolbar button {
      width: 44px;
      height: 44px;
    }
    .conference-toolbar button.hangup {
      width: 60px;
    }
  }
  @media (max-height: 500px) {
    padding-top: 6px;
    padding-bottom: 60px;
    gap: 4px;
    .conference-toolbar {
      bottom: 6px;
      padding: 4px;
    }
    .conference-toolbar button {
      height: 36px;
    }
    .stage-placeholder {
      gap: 6px;
      font-size: 10px;
    }
    .conference-avatar {
      width: 40px;
      font-size: 20px;
    }
    .stage-caption {
      padding: 4px 8px;
    }
    .conference-dialog {
      padding: 24px 16px 12px;
    }
    .conference-dialog form {
      display: grid;
      grid-template-columns: minmax(120px, 0.7fr) minmax(0, 1fr);
      align-items: center;
    }
    .conference-dialog form p {
      grid-column: 1 / -1;
    }
    .conference-dialog .actions {
      margin: 6px 0;
    }
    .conference-dialog .device-selects label {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .conference-dialog .device-selects select {
      margin-top: 0;
    }
    .conference-dialog summary {
      font-size: 14px;
    }
  }
`
