import { styled } from '@linaria/react'
import { theme } from '../../../../theme'
export const MembersStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`
export const Member = styled.div`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`
