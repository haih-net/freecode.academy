import { ChatProvider } from '../components/Chat/ChatWidget/context'
import { ChatWidget } from '../components/Chat/ChatWidget'
import { FeedbackForm } from '../components/Feedback'
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
    <ChatProvider>
      <LayoutStyled>
        <a className="skip-link" href="#main-content">
          Перейти к содержимому
        </a>
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          data-application={/^\/(signin|signup|panel|users|admin-panel|calls|docs|ai)(\/|$)/.test(
            pathname,
          )}
        >
          {children}
        </main>
        <Footer />
        <FeedbackForm />
        {pathname !== '/ai' && <ChatWidget />}
      </LayoutStyled>
    </ChatProvider>
  )
}
