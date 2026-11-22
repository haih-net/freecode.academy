import { useCallNotifications } from './hooks/useCallNotifications'
import type * as React from 'react'
import { useEffect, useState } from 'react'
export const MicrophoneLevel: React.FC<{ stream: MediaStream | null }> = ({
  stream,
}) => {
  const [level, setLevel] = useState(0)
  const { addMessage } = useCallNotifications()
  useEffect(() => {
    if (!stream) {
      return
    }
    let context: AudioContext | undefined
    let frame = 0
    try {
      context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const analyser = context.createAnalyser()
      analyser.fftSize = 1024
      source.connect(analyser)
      const values = new Float32Array(analyser.fftSize)
      const sample = (): void => {
        analyser.getFloatTimeDomainData(values)
        const rms = Math.sqrt(
          values.reduce((sum, value) => sum + value * value, 0) / values.length,
        )

        setLevel(Math.min(100, Math.round(rms * 350)))
        frame = requestAnimationFrame(sample)
      }

      void context
        .resume()
        .catch(() =>
          addMessage?.(
            'Браузер приостановил анализ звука. Выключите и включите микрофон.',
            { variant: 'error' },
          ),
        )
      sample()
    } catch {
      addMessage?.('В этом браузере не удалось включить индикатор звука.', {
        variant: 'error',
      })
    }
    return () => {
      cancelAnimationFrame(frame)
      void context?.close()
    }
  }, [stream, addMessage])
  return (
    <div>
      <label>
        Уровень микрофона{' '}
        <meter
          min={0}
          max={100}
          value={stream ? level : 0}
          aria-label="Уровень микрофона"
        />
      </label>
      <p className="hint">
        {stream
          ? 'Произнесите несколько слов: индикатор должен двигаться.'
          : 'Включите микрофон для проверки.'}
      </p>
    </div>
  )
}
