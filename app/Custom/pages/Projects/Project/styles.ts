import { styled } from '@linaria/react'
export const ProjectStyled = styled.section`
  overflow-wrap: anywhere;
`
export const Title = styled.h1`
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
`
export const TasksStyled = styled.div`
  margin: 48px auto;
  max-width: 1200px;
  padding: 0 24px;
`
export const AllTasks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`
