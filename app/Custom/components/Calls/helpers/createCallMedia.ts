import type {
  CallMedia,
  CallMediaKind,
  CallMediaLease,
  CallMediaPool,
} from '../interfaces'

function captureError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return 'Доступ не разрешён или выбор отменён. Проверьте разрешения браузера.'
    }
    if (error.name === 'NotFoundError') {
      return 'Устройство не найдено. Подключите камеру или микрофон.'
    }
    if (error.name === 'NotReadableError') {
      return 'Устройство занято или недоступно. Проверьте другие приложения.'
    }
    if (error.name === 'OverconstrainedError') {
      return 'Выбранное устройство недоступно. Выберите другое.'
    }
  }
  return error instanceof Error
    ? error.message
    : 'Не удалось включить устройство'
}

export interface CallMediaRuntime {
  start: (kind: CallMediaKind, deviceId?: string) => Promise<void>
  stop: (kind: CallMediaKind) => void
  stopAll: () => void
  selectDevice: (kind: CallMediaKind, deviceId: string) => void
  toggle: (kind: CallMediaKind) => void
  close: () => void
}

export function createCallMedia(
  pool: CallMediaPool,
  read: () => CallMedia | undefined,
  publish: (patch: Partial<CallMedia>) => void,
  reportError: (error: Error) => void,
  allowed: () => boolean,
): CallMediaRuntime {
  let disposed = false
  const leases: Partial<Record<CallMediaKind, CallMediaLease>> = {}
  const pending: Partial<Record<CallMediaKind, CallMediaLease>> = {}
  const detach: Partial<Record<CallMediaKind, () => void>> = {}

  const refresh = async (): Promise<void> => {
    try {
      const devices = await navigator.mediaDevices?.enumerateDevices()
      if (!disposed) {
        publish({ devices: devices ?? [] })
      }
    } catch (error) {
      if (!disposed) {
        reportError(new Error(captureError(error)))
      }
    }
  }

  const stop = (kind: CallMediaKind): void => {
    detach[kind]?.()
    delete detach[kind]
    leases[kind]?.release()
    delete leases[kind]
    pending[kind]?.release()
    delete pending[kind]
    const state = read()
    if (!disposed && state) {
      publish({
        streams: { ...state.streams, [kind]: null },
        busy: { ...state.busy, [kind]: false },
      })
    }
  }

  const stopAll = (): void => {
    stop('microphone')
    stop('camera')
    stop('screen')
  }

  const start = async (
    kind: CallMediaKind,
    deviceId = read()?.selectedDevices[kind] ?? '',
  ): Promise<void> => {
    const state = read()
    if (disposed || !state || !allowed()) {
      return
    }
    publish({
      busy: { ...state.busy, [kind]: true },
      selectedDevices: { ...state.selectedDevices, [kind]: deviceId },
    })
    const lease = pool.acquire(kind, deviceId)
    pending[kind]?.release()
    pending[kind] = lease
    try {
      const stream = await lease.stream
      if (disposed || pending[kind] !== lease || !allowed()) {
        lease.release()
        return
      }
      detach[kind]?.()
      leases[kind]?.release()
      leases[kind] = lease
      delete pending[kind]
      const ended = (): void => {
        if (read()?.streams[kind] === stream) {
          stop(kind)
        }
      }

      stream
        .getTracks()
        .forEach((track) => track.addEventListener('ended', ended))
      detach[kind] = () =>
        stream
          .getTracks()
          .forEach((track) => track.removeEventListener('ended', ended))
      const current = read()
      if (current) {
        publish({
          streams: { ...current.streams, [kind]: stream },
          busy: { ...current.busy, [kind]: false },
        })
      }
      await refresh()
    } catch (error) {
      if (!disposed && pending[kind] === lease) {
        lease.release()
        reportError(new Error(captureError(error)))
      }
    } finally {
      if (!disposed && pending[kind] === lease) {
        delete pending[kind]
        const current = read()
        if (current) {
          publish({ busy: { ...current.busy, [kind]: false } })
        }
      }
    }
  }

  const selectDevice = (kind: CallMediaKind, deviceId: string): void => {
    const state = read()
    if (disposed || !state || !allowed()) {
      return
    }
    publish({ selectedDevices: { ...state.selectedDevices, [kind]: deviceId } })
    if (state.streams[kind]) {
      void start(kind, deviceId)
    }
  }

  const toggle = (kind: CallMediaKind): void => {
    const state = read()
    if (!state || state.busy[kind] || !allowed()) {
      return
    }
    if (state.streams[kind]) {
      stop(kind)
    } else {
      void start(kind)
    }
  }

  void refresh()
  navigator.mediaDevices?.addEventListener('devicechange', refresh)
  return {
    start,
    stop,
    stopAll,
    selectDevice,
    toggle,
    close: () => {
      disposed = true
      stopAll()
      navigator.mediaDevices?.removeEventListener('devicechange', refresh)
    },
  }
}
