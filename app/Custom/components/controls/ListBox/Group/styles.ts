import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const GroupStyled = styled.li`
  list-style: none;
`
export const GroupTitleStyled = styled.div`
  padding: 12px 14px 6px;
  font-weight: 700;
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`
export const GroupItemsStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
