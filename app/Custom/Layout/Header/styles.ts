import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const HeaderNavStyled = styled.nav`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 20px 24px 28px;
  background: ${theme.backgrounds.page};
  box-shadow: 0 16px 24px #182e2012;
  border-bottom: 1px solid ${theme.colors.border};
  align-items: stretch;
  gap: 6px;
  font-size: 14px;

  @media (min-width: ${theme.breakpoints.lg}px) {
    display: flex;
    position: static;
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-bottom: 0;
    align-items: center;
    gap: 12px;
    flex: 1;
    flex-wrap: wrap;
    min-width: 0;
    white-space: nowrap;
  }

  @media (min-width: ${theme.breakpoints.md}px) {
    gap: 16px;
  }

  &[data-open='true'] {
    display: flex;
    flex-direction: column;

    @media (min-width: ${theme.breakpoints.lg}px) {
      flex-direction: row;
    }
  }
  & a {
    padding: 12px 0;

    @media (min-width: ${theme.breakpoints.lg}px) {
      padding: 10px 0;
    }
  }
  & a[aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 6px;
  }
`

export const HeaderLogoStyled = styled.img`
  height: 24px;
`

export const HeaderInnerStyled = styled.div`
  max-width: 1328px;
  margin: auto;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (min-width: ${theme.breakpoints.xs}px) {
    padding: 6px 24px;
    gap: 16px;
  }

  @media (min-width: ${theme.breakpoints.lg}px) {
    min-height: 56px;
    padding: 6px 24px;
  }
`

export const HeaderStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 300;
  background: ${theme.backgrounds.page};
  border-bottom: 1px solid ${theme.colors.border};

  nav .ai-button {
    padding: 10px 16px;
    line-height: inherit;
    justify-content: center;

    @media (min-width: ${theme.breakpoints.lg}px) {
      justify-content: flex-start;
    }
  }
  .menu-toggle {
    display: flex;
    background: transparent;
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    color: inherit;

    @media (min-width: ${theme.breakpoints.lg}px) {
      display: none;
    }
  }

  nav .feedback-button,
  nav .signin-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 36px;
    padding: 6px 8px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
    color: ${theme.colors.foreground};
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
  }
  .feedback-button:hover,
  .signin-link:hover {
    background: #f3f3f3;
  }
  .feedback-button:focus-visible,
  .signin-link:focus-visible {
    border-color: ${theme.colors.primary};
  }
  .feedback-button svg,
  .signin-link svg {
    flex-shrink: 0;
  }
  @media (max-width: ${theme.breakpoints.lg - 1}px) {
    nav .feedback-button,
    nav .signin-link {
      min-height: 44px;
    }
  }
  .account-menu {
    position: relative;
    min-width: 0;
  }
  .account-menu summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    list-style: none;
  }
  .account-menu summary::-webkit-details-marker {
    display: none;
  }
  .account-menu summary:hover,
  .account-menu[open] summary {
    background: #eef1e9;
  }
  .account-name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .account-chevron {
    display: block;
    flex-shrink: 0;
  }
  .account-dropdown {
    padding: 10px;
    margin-top: 8px;
    border: 1px solid ${theme.colors.border};
    border-radius: 12px;
    background: white;
    box-shadow: 0 12px 32px #1d30251a;
    min-width: 220px;
    @media (min-width: ${theme.breakpoints.lg}px) {
      position: absolute;
      right: 0;
      top: 100%;
    }
  }
  .account-dropdown p {
    margin: 4px 12px 8px;
    color: ${theme.colors.text.secondary};
    font-size: 12px;
  }
  .account-dropdown a,
  .account-dropdown button {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: ${theme.colors.text.primary};
  }
  .account-dropdown a:hover {
    background: #eef1e9;
  }
  .account-dropdown button {
    margin-top: 4px;
    border-top: 1px solid ${theme.colors.border};
  }
`
