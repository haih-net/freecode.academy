import { useEffect, useState } from 'react'
import type { AutocompleteProps } from '../interfaces'

interface SearchStatus {
  loading: boolean
  error?: string
}

export const useAutocompleteSearch = (
  query: string,
  onSearch: AutocompleteProps['onSearch'],
  delay: number,
  disabled: boolean | undefined,
): SearchStatus => {
  const [status, setStatus] = useState<SearchStatus>({ loading: false })
  useEffect(() => {
    if (!onSearch || disabled) {
      setStatus({ loading: false })
      return
    }
    const controller = new AbortController()
    setStatus({ loading: true })
    const timer = setTimeout(async () => {
      try {
        await onSearch(query, controller.signal)
        if (!controller.signal.aborted) {
          setStatus({ loading: false })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setStatus({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Не удалось загрузить варианты',
          })
        }
      }
    }, delay)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, onSearch, delay, disabled])
  return status
}
