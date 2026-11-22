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

  textarea, input {
    &:focus-visible {
      outline: none;
    }
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
  white-space: nowrap;
  flex-shrink: 0;
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
  main[data-application='true'] {
    width: 100%;
    max-width: 1328px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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

export const CustomLayoutSectionStyled = styled.section`
  display: contents;
`

export const CustomLayoutGridStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: ${theme.breakpoints.xs}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${theme.breakpoints.sm}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

export const CustomLayoutMainStyled = styled.main`
  flex: 1;
  width: 100%;
  min-width: 0;
  max-width: 1328px;
  min-height: 0;
  padding: 44px 24px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.sm}px) {
    padding: 64px 40px;
  }
`

export const CustomLayoutStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.foreground};
  background: ${theme.backgrounds.page};
  .ai-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 14px 20px;
    background: ${theme.colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    transition: background 0.2s;
    text-decoration: none;
  }
  .ai-button:hover {
    background: #28583f;
    text-decoration: none;
  }
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    padding: 12px 20px;
    background: white;
    z-index: 1100;
  }
  .skip-link:focus {
    top: 12px;
  }
`
