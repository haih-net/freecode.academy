export interface CodexStreamEvent {
  method: string
  params: { threadId: string; [key: string]: unknown }
}

export function readCodexEvent(value: unknown): CodexStreamEvent {
  if (
    !value ||
    typeof value !== 'object' ||
    !('method' in value) ||
    typeof value.method !== 'string' ||
    !('params' in value) ||
    !value.params ||
    typeof value.params !== 'object' ||
    !('threadId' in value.params) ||
    typeof value.params.threadId !== 'string'
  ) {
    throw new Error('Некорректное событие Codex')
  }
  return {
    method: value.method,
    params: { ...value.params, threadId: value.params.threadId },
  }
}
