import type {
  CallConnectionStatus,
  CallServerMessage,
  CallSignaling,
  CallSignalingOptions,
} from '../interfaces'

export function createCallSignaling(
  options: CallSignalingOptions,
): CallSignaling {
  let socket: WebSocket | null = null
  let disposed = false
  let ready = false
  let stopped = false
  let sessionToken = options.sessionToken
  let attempt = 0
  let lastMessage = 0
  let retryTimer: ReturnType<typeof setTimeout> | undefined
  let recoveryDeadline: ReturnType<typeof setTimeout> | undefined
  let heartbeat: ReturnType<typeof setInterval> | undefined
  const clearTimers = (): void => {
    clearTimeout(retryTimer)
    clearTimeout(recoveryDeadline)
    clearInterval(heartbeat)
  }

  const publish = (
    phase: CallConnectionStatus['phase'],
    message: string,
    nextAttemptAt: number | null = null,
  ): void => options.onStatus({ phase, message, attempt, nextAttemptAt })

  const detach = (leave: boolean): void => {
    const previous = socket
    socket = null
    ready = false
    if (previous) {
      previous.onopen = null
      previous.onmessage = null
      previous.onerror = null
      previous.onclose = null
      if (leave && previous.readyState === WebSocket.OPEN) {
        previous.send(JSON.stringify({ type: 'leave' }))
      }
      previous.close()
    }
  }

  const stop = (message: string): void => {
    stopped = true
    clearTimers()
    detach(true)
    publish('denied', message)
    options.onStopped()
  }

  const lost = (): void => {
    if (disposed || stopped) {
      return
    }
    if (!recoveryDeadline) {
      recoveryDeadline = setTimeout(
        () => {
          stop(
            'Не удалось восстановить связь за 10 минут. Войдите в звонок заново.',
          )
        },
        10 * 60 * 1000,
      )
    }
    clearInterval(heartbeat)
    detach(false)
    const delay = Math.min(1000 * 2 ** Math.min(attempt, 4), 10000)
    publish(
      'reconnecting',
      'Связь с сервером потеряна. Переподключаемся…',
      Date.now() + delay,
    )
    clearTimeout(retryTimer)
    retryTimer = setTimeout(() => {
      attempt++
      connect()
    }, delay)
  }

  const connect = (): void => {
    if (disposed || stopped) {
      return
    }
    publish(
      attempt ? 'reconnecting' : 'connecting',
      attempt ? 'Восстанавливаем связь с сервером…' : 'Подключение к серверу…',
    )
    let current: WebSocket
    try {
      current = new WebSocket(options.url)
    } catch {
      lost()
      return
    }
    socket = current
    lastMessage = Date.now()
    heartbeat = setInterval(() => {
      if (Date.now() - lastMessage >= 15000) {
        lost()
      } else if (ready && current.readyState === WebSocket.OPEN) {
        current.send(JSON.stringify({ type: 'ping' }))
      }
    }, 5000)
    current.onopen = () => {
      if (current !== socket || disposed) {
        return
      }
      current.send(JSON.stringify({ type: 'join', token: sessionToken }))
    }
    current.onmessage = (event) => {
      if (current !== socket || disposed || stopped) {
        return
      }
      let message: CallServerMessage
      try {
        message = JSON.parse(event.data) as CallServerMessage
      } catch {
        stop('Сервер вернул некорректное сообщение.')
        return
      }
      lastMessage = Date.now()
      if (message.type === 'closed') {
        stop('Звонок завершён или удалён.')
        return
      }
      if (message.type === 'error') {
        stop(message.message)
        return
      }
      if (message.type === 'welcome') {
        clearTimeout(recoveryDeadline)
        recoveryDeadline = undefined
        ready = true
        sessionToken = message.sessionToken
        publish('connected', 'В комнате · связь с сервером установлена')
        attempt = 0
      }
      options.onMessage(message)
    }
    current.onerror = () => {
      // The close event starts recovery; a handshake deadline covers silent failures.
    }
    current.onclose = (event) => {
      if (current !== socket || disposed || stopped) {
        return
      }
      if ([1008, 4001, 4003].includes(event.code)) {
        stop(
          event.code === 4001
            ? 'Сессия открыта в другом подключении. Войдите заново.'
            : 'Доступ к звонку прекращён. Войдите заново.',
        )
      } else {
        lost()
      }
    }
  }

  connect()
  return {
    send: (message) => {
      if (!ready || socket?.readyState !== WebSocket.OPEN) {
        return false
      }
      socket.send(JSON.stringify(message))
      return true
    },
    close: () => {
      disposed = true
      clearTimers()
      detach(true)
    },
  }
}
