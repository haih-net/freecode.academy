import { styled } from '@linaria/react'
import { Link } from 'react-router'
import { theme } from '../../theme'
export const PaginationStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  flex-wrap: wrap;
  [aria-disabled] {
    opacity: 0.5;
    padding: 8px 16px;
  }
`
export const PageLink = styled(Link)`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  background: ${theme.colors.background};
  &:hover {
    background: ${theme.colors.gray[100]};
  }
`
export const PageInfo = styled.span`
  font-size: ${theme.fontSizes.sm};
`
