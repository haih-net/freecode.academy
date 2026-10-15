import { styled } from '@linaria/react'
export const WorldStyled = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - 115px);
  min-height: 400px;
  background: #87ceeb;
  .world-status {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(0, 0, 0, 0.65);
    color: white;
    text-align: center;
  }
  button {
    padding: 10px 24px;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    font: inherit;
  }
`
