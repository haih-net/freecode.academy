import { useAppContext } from '../../AppContext'
import type { CallsContextValue } from './useCalls/interfaces'

export function useCallsContext(): CallsContextValue {
  const context = useAppContext()
  if (!context) {
    throw new Error('Контекст звонков недоступен')
  }
  return context.calls
}
