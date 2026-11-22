import { useCallback } from 'react'
import { useSnackbar } from 'app/Custom/hooks/useSnackbar'

export function useCallNotifications() {
  const { addMessage } = useSnackbar() ?? {}
  const reportError = useCallback(
    (error: unknown): void => {
      addMessage?.(
        error instanceof Error
          ? error.message
          : 'Не удалось выполнить действие со звонком',
        { variant: 'error' },
      )
    },
    [addMessage],
  )

  return { addMessage, reportError }
}
