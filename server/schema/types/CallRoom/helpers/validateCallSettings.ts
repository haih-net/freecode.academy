export function validateCallSettings(
  title: string,
  accessCode?: string | null,
): void {
  if (!title.trim() || title.trim().length > 100) {
    throw new Error('Название должно содержать от 1 до 100 символов')
  }
  if (
    accessCode !== null &&
    accessCode !== undefined &&
    (accessCode.length > 64 || Buffer.byteLength(accessCode) > 72)
  ) {
    throw new Error('Код слишком длинный: максимум 64 символа и 72 байта')
  }
}
