import type { CallMediaKind, CallMediaPool } from '../interfaces'

interface Capture {
  kind: CallMediaKind
  deviceId: string
  users: number
  stream: MediaStream | null
  pending: Promise<MediaStream>
}

async function capture(
  kind: CallMediaKind,
  deviceId: string,
): Promise<MediaStream> {
  if (!navigator.mediaDevices) {
    throw new Error(
      'Для доступа к устройствам откройте сайт по HTTPS или через localhost.',
    )
  }
  if (kind === 'screen') {
    if (!navigator.mediaDevices.getDisplayMedia) {
      throw new Error('Этот браузер не поддерживает демонстрацию экрана.')
    }
    return navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
  }
  const device = deviceId ? { deviceId: { exact: deviceId } } : {}
  return navigator.mediaDevices.getUserMedia(
    kind === 'microphone'
      ? {
          audio: { ...device, echoCancellation: true, noiseSuppression: true },
          video: false,
        }
      : {
          video: { ...device, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        },
  )
}

export function createCallMediaPool(): CallMediaPool {
  const captures = new Set<Capture>()
  return {
    acquire(kind, deviceId = '') {
      let entry = [...captures].find(
        (item) =>
          item.kind === kind &&
          (item.deviceId === deviceId ||
            Boolean(
              deviceId &&
              item.stream
                ?.getTracks()
                .some((track) => track.getSettings().deviceId === deviceId),
            )),
      )

      if (!entry) {
        const pending = capture(kind, deviceId)
        entry = { kind, deviceId, users: 0, stream: null, pending }
        const created = entry
        created.pending = pending.then(
          (stream) => {
            created.stream = stream
            if (!created.users) {
              stream.getTracks().forEach((track) => track.stop())
            }
            stream
              .getTracks()
              .forEach((track) =>
                track.addEventListener(
                  'ended',
                  () => captures.delete(created),
                  { once: true },
                ),
              )
            return stream
          },
          (error: unknown) => {
            captures.delete(created)
            throw error
          },
        )
        captures.add(created)
      }
      const acquired = entry
      acquired.users++
      let released = false
      return {
        stream: acquired.pending,
        release() {
          if (released) {
            return
          }
          released = true
          acquired.users--
          if (!acquired.users) {
            captures.delete(acquired)
            acquired.stream?.getTracks().forEach((track) => track.stop())
          }
        },
      }
    },
  }
}
