import type { CallConnectionStatus } from '../interfaces'
import { useEffect, useState } from 'react'

export const reconnectingHint =
  'Включённые камера, микрофон и демонстрация продолжают работать. Если связь с участниками сохранилась, вы можете продолжать разговор.'

export function useConnectionMessage(status: CallConnectionStatus): string {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (!status.nextAttemptAt) {
      return
    }
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [status.nextAttemptAt])
  const retry =
    status.phase === 'reconnecting'
      ? status.nextAttemptAt
        ? ` Попытка №${status.attempt + 1} через ${Math.max(0, Math.ceil((status.nextAttemptAt - now) / 1000))} с.`
        : ` Попытка №${status.attempt}.`
      : ''

  return status.message + retry
}
