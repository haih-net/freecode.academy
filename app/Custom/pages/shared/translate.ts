type TranslationOptions = { returnObjects: true }
interface Translate {
  (key: string): string
  (key: string, options: TranslationOptions): string[]
}
export function translate(dictionary: object): Translate {
  function read(key: string): string
  function read(key: string, options: TranslationOptions): string[]
  function read(key: string, options?: TranslationOptions): string | string[] {
    let value: unknown = dictionary
    for (const part of key.split('.')) {
      value = (value as Record<string, unknown>)[part]
    }
    if (typeof value === 'string' && !options) {
      return value
    }
    if (
      options &&
      Array.isArray(value) &&
      value.every((item) => typeof item === 'string')
    ) {
      return value as string[]
    }
    throw new Error(`Missing translation: ${key}`)
  }
  return read
}
