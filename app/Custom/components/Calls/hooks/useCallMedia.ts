import { useEffect } from 'react'
import { useCallsContext } from './useCallsContext'

export const previewMediaId = 'preview'
export const roomMediaId = (id: string): string => `room:${id}`

export function useCallMedia(id: string) {
  return useCallsContext().state.media[id]
}

export function useCallPreview(): void {
  const { dispatch } = useCallsContext()
  useEffect(() => {
    dispatch({ type: 'mediaOpened', id: previewMediaId })
    return () => dispatch({ type: 'mediaRemoved', id: previewMediaId })
  }, [dispatch])
}
