import { styled } from '@linaria/react'
import { Link } from 'react-router'
import { theme } from '../theme'

export const HtmlStyled = styled.html`
  background: ${theme.bg};
  color: ${theme.ink};
  font-family: ${theme.font};
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  body {
    margin: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  @keyframes freecodeFadeUp {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`
export const Container = styled.div`
  max-width: ${theme.maxw};
  margin: 0 auto;
  padding: 0 24px;
`
export const Logo = styled(Link)`
  font-family: ${theme.serif};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, ${theme.brand}, #b82f00);
    box-shadow: 0 2px 10px rgba(255, 91, 46, 0.35);
  }
`

export const LayoutStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    min-width: 0;
  }
  :where(p, h1, h2, h3, h4, ul) {
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    display: block;
    max-width: 100%;
  }
  :focus-visible {
    outline: 2px solid ${theme.brand};
    outline-offset: 4px;
  }
  .skip-link {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 100;
    padding: 12px;
    background: white;
    transform: translateY(-150%);
  }
  .skip-link:focus {
    transform: none;
  }
`
