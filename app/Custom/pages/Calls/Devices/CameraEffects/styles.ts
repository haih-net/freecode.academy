import { styled } from '@linaria/react'

export const CameraEffectsStyled = styled.div`
  .effect-preview {
    position: relative;
  }
  .effect-preview video {
    display: block;
  }
  canvas {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #162d26;
    border-radius: 12px;
  }
  canvas[hidden] {
    display: none;
  }
  input[type='file'] {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin-top: 6px;
  }
`
