import { styled } from '@linaria/react'
import { theme } from '../../theme'
import { Container, Logo } from '../styles'

export const HeaderStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(140%) blur(14px);
  background: rgba(251, 250, 246, 0.78);
  border-bottom: 1px solid ${theme.line};
`
export const NavInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  ${Logo} {
    margin: 10px;
  }
`
export const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  margin-right: 12px;
  padding: 10px;
  border: 0;
  background: transparent;
  cursor: pointer;
  span {
    width: 100%;
    height: 2px;
    background: ${theme.ink};
    border-radius: 2px;
  }
  &[aria-expanded='true'] span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  &[aria-expanded='true'] span:nth-child(2) {
    opacity: 0;
  }
  &[aria-expanded='true'] span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
  @media (min-width: 880px) {
    display: none;
  }
`
export const NavLinks = styled.nav`
  display: none;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  width: 100%;
  order: 10;
  font-size: 16px;
  color: ${theme.ink2};
  background: ${theme.bg};
  &[data-open='true'] {
    display: flex;
  }
  @media (min-width: 880px) {
    display: flex;
    flex-direction: row;
    width: auto;
    gap: 24px;
    padding: 0 10px;
    font-size: 14px;
    background: transparent;
  }
`
