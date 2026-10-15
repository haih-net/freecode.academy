import { styled } from '@linaria/react'
import { theme } from '../../../theme'
export const TaskStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-wrap: anywhere;
`
export const TaskCard = styled.article`
  background: ${theme.backgrounds.paper};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`
export const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
export const DateStyled = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
`
export const Description = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
`
