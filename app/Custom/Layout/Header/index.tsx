import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type MouseEvent,
} from 'react'
import { Link } from 'react-router'
import { Logo } from '../styles'
import { HeaderStyled, MenuButton, NavInner, NavLinks } from './styles'

const navigation: readonly [string, string][] = [
  ['/about', 'О нас'],
  ['/people', 'Участники'],
  ['/teams', 'Команды'],
  ['/offers', 'Предложения'],
  ['/projects', 'Проекты'],
  ['/tasks', 'Задачи'],
  ['/topics', 'Топики'],
]

export const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const toggleMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen((value) => !value)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }
    const closeMenu = () => setOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('click', closeMenu)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', closeMenu)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <HeaderStyled>
      <NavInner>
        <Logo to="/">Freecode Academy</Logo>
        <MenuButton
          ref={menuButton}
          type="button"
          aria-label="Меню"
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </MenuButton>
        <NavLinks
          id="site-navigation"
          aria-label="Основная навигация"
          data-open={open}
        >
          {navigation.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </NavLinks>
      </NavInner>
    </HeaderStyled>
  )
}
