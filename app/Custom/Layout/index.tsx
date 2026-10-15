import { useEffect, useRef, type FC, type PropsWithChildren } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { LayoutStyled } from './styles'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()
  const action = useNavigationType()
  const previous = useRef(pathname)

  useEffect(() => {
    if (previous.current !== pathname && action !== 'POP') {
      document
        .querySelector<HTMLElement>('#main-content h1')
        ?.focus({ preventScroll: true })
    }
    previous.current = pathname
  }, [pathname, action])

  return (
    <LayoutStyled>
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </LayoutStyled>
  )
}
