import { styled } from '@linaria/react'
import { theme } from '../../theme'
import { Container } from '../styles'

export const FooterStyled = styled.footer`
  border-top: 1px solid ${theme.line};
  padding: 40px 0;
  color: ${theme.muted};
  font-size: 14px;
`
export const FootInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`
