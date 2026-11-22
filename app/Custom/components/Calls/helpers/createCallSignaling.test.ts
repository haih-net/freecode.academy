import type { CallConnectionStatus, CallSignaling } from '../interfaces'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createCallSignaling } from './createCallSignaling'

class FakeSocket {
  static OPEN = 1
  static instances: FakeSocket[] = []
  readyState = 0
  onopen: (() => void) | null = null
  onclose: ((event: { code: number }) => void) | null = null
  onerror: (() => void) | null = null
  onmessage: ((event: { data: string }) => void) | null = null
  sent: unknown[] = []
  constructor() {
    FakeSocket.instances.push(this)
  }
  send(data: string): void {
    this.sent.push(JSON.parse(data))
  }
  close(): void {
    this.readyState = 3
  }
  open(): void {
    this.readyState = 1
    this.onopen?.()
  }
  receive(data: unknown): void {
    this.onmessage?.({ data: JSON.stringify(data) })
  }
  disconnect(code = 1006): void {
    this.readyState = 3
    this.onclose?.({ code })
  }
}

describe('call signaling recovery', () => {
  let connection: CallSignaling
  let statuses: CallConnectionStatus[]
  const stopped = vi.fn()
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('WebSocket', FakeSocket)
    FakeSocket.instances = []
    statuses = []
    stopped.mockClear()
    connection = createCallSignaling({
      url: 'ws://localhost/api/calls/socket',
      sessionToken: 'initial-resume',
      onStatus: (status) => statuses.push(status),
      onStopped: stopped,
      onMessage: vi.fn(),
    })
  })
  afterEach(() => {
    connection.close()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })
  const welcome = (socket: FakeSocket): void => {
    socket.open()
    socket.receive({ type: 'welcome', sessionToken: 'established-resume' })
  }

  it('keeps media alive, shows an attempt and resumes with the refreshed token', () => {
    const first = FakeSocket.instances[0]
    welcome(first)
    first.disconnect()
    expect(statuses.at(-1)).toMatchObject({
      phase: 'reconnecting',
      attempt: 0,
      nextAttemptAt: Date.now() + 1000,
    })
    expect(stopped).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    const second = FakeSocket.instances[1]
    second.open()
    expect(second.sent[0]).toEqual({
      type: 'join',
      token: 'established-resume',
    })
    expect(statuses.at(-1)).toMatchObject({ phase: 'reconnecting', attempt: 1 })
    second.receive({ type: 'welcome', sessionToken: 'renewed' })
    expect(statuses.at(-1)?.phase).toBe('connected')
    expect(stopped).not.toHaveBeenCalled()
  })
  it('keeps retrying beyond 60 seconds without stopping media and cleans up on leave', () => {
    welcome(FakeSocket.instances[0])
    FakeSocket.instances[0].disconnect()
    vi.advanceTimersByTime(60000)
    expect(statuses.at(-1)?.phase).toBe('reconnecting')
    expect(stopped).not.toHaveBeenCalled()
    expect(FakeSocket.instances.length).toBeGreaterThan(2)
    const count = FakeSocket.instances.length
    connection.close()
    vi.advanceTimersByTime(120000)
    expect(FakeSocket.instances).toHaveLength(count)
  })
  it('detects a silent connection and never retries a terminal access refusal', () => {
    welcome(FakeSocket.instances[0])
    vi.advanceTimersByTime(15000)
    expect(statuses.at(-1)?.phase).toBe('reconnecting')
    vi.advanceTimersByTime(1000)
    const next = FakeSocket.instances[1]
    next.open()
    next.receive({ type: 'error', message: 'Доступ запрещён' })
    expect(statuses.at(-1)).toMatchObject({
      phase: 'denied',
      message: 'Доступ запрещён',
    })
    vi.advanceTimersByTime(120000)
    expect(FakeSocket.instances).toHaveLength(2)
    expect(stopped).toHaveBeenCalledTimes(1)
  })
})
