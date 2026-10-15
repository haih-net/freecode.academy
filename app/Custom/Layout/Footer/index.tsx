import type { FC } from 'react'
import { Logo } from '../styles'
import { FooterStyled, FootInner } from './styles'

export const Footer: FC = () => (
  <FooterStyled>
    <FootInner>
      <Logo to="/">Freecode Academy</Logo>
      <div>
        © {new Date().getFullYear()} Freecode Academy Network {' · '}
        <a href="https://fi1osof.ru" target="_blank" rel="noopener noreferrer">
          By 𝕱
        </a>
      </div>
    </FootInner>
  </FooterStyled>
)
