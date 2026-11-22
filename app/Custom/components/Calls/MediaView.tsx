import type * as React from 'react'
import { useEffect, useRef } from 'react'
export const MediaView: React.FC<{
  stream: MediaStream | null
  muted?: boolean
  label: string
}> = ({ stream, muted = false, label }) => {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const element = ref.current
    if (element) {
      element.srcObject = stream
    }
    return () => {
      if (element) {
        element.srcObject = null
      }
    }
  }, [stream])
  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      controls={!muted}
      aria-label={label}
    />
  )
}
