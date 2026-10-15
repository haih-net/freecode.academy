import { styled } from '@linaria/react'
export const ExerciseStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 1.5rem;
  overflow-wrap: anywhere;
  code {
    background: #ddd;
    padding: 2px 4px;
    font-size: 90%;
  }
  pre {
    white-space: pre-wrap;
  }
`
