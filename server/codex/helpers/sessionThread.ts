import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

function sessionPath(sessionId: string): string {
  if (!/^[a-f0-9-]{36}$/.test(sessionId)) {
    throw new Error('Некорректный идентификатор сессии')
  }
  return join(
    process.env.CODEX_SESSION_DIRECTORY || 'storage/codex-sessions',
    `${sessionId}.json`,
  )
}

export async function readSessionThread(
  sessionId: string,
): Promise<string | null> {
  try {
    const value: unknown = JSON.parse(
      await readFile(sessionPath(sessionId), 'utf8'),
    )

    if (
      !value ||
      typeof value !== 'object' ||
      !('threadId' in value) ||
      typeof value.threadId !== 'string'
    ) {
      throw new Error('Повреждена привязка сессии Codex')
    }
    return value.threadId
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return null
    }
    throw error
  }
}

export async function saveSessionThread(
  sessionId: string,
  threadId: string,
): Promise<void> {
  const directory =
    process.env.CODEX_SESSION_DIRECTORY || 'storage/codex-sessions'

  await mkdir(directory, { recursive: true })
  const path = sessionPath(sessionId)
  await writeFile(`${path}.tmp`, JSON.stringify({ threadId }), { mode: 0o600 })
  await rename(`${path}.tmp`, path)
}
