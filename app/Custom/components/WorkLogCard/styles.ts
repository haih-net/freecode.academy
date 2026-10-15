import { styled } from '@linaria/react'
import { theme } from '../../theme'
export const WorkLogStyled = styled.article`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  min-width: 0;
  overflow-wrap: anywhere;
`
export const WorkLogMeta = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`
