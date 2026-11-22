import type { CallsContextValue } from '../Calls/hooks/useCalls/interfaces'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useCalls } from '../Calls/hooks/useCalls'
import { CallsRuntime } from '../Calls/CallsRuntime'
import type { MeQuery } from 'app/gql/generated'

export type AppContextValue = {
  user: MeQuery['me']
  userLoading: boolean
  calls: CallsContextValue
  isFeedbackOpen: boolean
  openFeedback: () => void
  closeFeedback: () => void
}

export const Context = React.createContext<AppContextValue | null>(null)

type AppContextProviderProps = React.PropsWithChildren<{
  user: AppContextValue['user']
  userLoading: boolean
}>

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  user,
  userLoading,
  children,
}) => {
  const calls = useCalls()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const openFeedback = useCallback((): void => setIsFeedbackOpen(true), [])
  const closeFeedback = useCallback((): void => setIsFeedbackOpen(false), [])
  const context = useMemo<AppContextValue>(() => {
    return {
      user,
      userLoading,
      calls,
      isFeedbackOpen,
      openFeedback,
      closeFeedback,
    }
  }, [user, userLoading, calls, isFeedbackOpen, openFeedback, closeFeedback])

  return (
    <Context.Provider value={context}>
      <CallsRuntime />
      {children}
    </Context.Provider>
  )
}

// Cold dev SSR can temporarily lose context during WyW/Vite module reloads.
// Consumers must handle null; this workaround does not fix module invalidation.
export function useAppContext(): AppContextValue | null {
  return useContext(Context)
}
