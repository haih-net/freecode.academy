import { Select } from 'app/Custom/components/controls/Select'
import type * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageSegmenter } from '@mediapipe/tasks-vision'
import { Button } from 'app/Custom/components/Button'
import { CameraEffectsStyled } from './styles'

type BackgroundEffect = 'none' | 'blur' | 'image'
type EffectStatus = 'idle' | 'loading' | 'ready' | 'error'

export const CameraEffects: React.FC<{ stream: MediaStream | null }> = ({
  stream,
}) => {
  const [mode, setMode] = useState<BackgroundEffect>('none')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<EffectStatus>('idle')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const changeMode = useCallback((value: string | null): void => {
    if (value === 'none' || value === 'blur' || value === 'image') {
      setStatus('idle')
      setMode(value)
    }
  }, [])

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setStatus('idle')
      setFile(event.target.files?.[0] ?? null)
    },
    [],
  )

  const retry = useCallback((): void => {
    setAttempt((value) => value + 1)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    video.srcObject = stream
    return () => {
      video.srcObject = null
    }
  }, [stream])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    setError('')
    setStatus('idle')
    if (
      !stream ||
      !video ||
      !canvas ||
      mode === 'none' ||
      (mode === 'image' && !file)
    ) {
      return
    }
    let disposed = false
    let frameId = 0
    let segmenter: ImageSegmenter | null = null
    let imageUrl: string | null = null
    let background: HTMLImageElement | null = null
    const release = (): void => {
      cancelAnimationFrame(frameId)
      segmenter?.close()
      segmenter = null
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
        imageUrl = null
      }
    }

    const fail = (): void => {
      release()
      if (!disposed) {
        setStatus('error')
        setError(
          'Не удалось включить эффект или его работа прервалась. Показано исходное изображение камеры. Повторите попытку или выберите другую картинку.',
        )
      }
    }

    const start = async (): Promise<void> => {
      setStatus('loading')
      const context = canvas.getContext('2d')
      if (!context || (mode === 'blur' && !('filter' in context))) {
        throw new Error('Обработка изображения недоступна')
      }
      if (mode === 'image' && file) {
        background = new Image()
        imageUrl = URL.createObjectURL(file)
        background.src = imageUrl
        await background.decode()
        if (disposed) {
          return
        }
      }
      const { createSegmenter } = await import('./helpers/createSegmenter')
      if (disposed) {
        return
      }
      const created = await createSegmenter()
      if (disposed) {
        created.close()
        return
      }
      segmenter = created
      const maskCanvas = document.createElement('canvas')
      const maskContext = maskCanvas.getContext('2d')
      if (!maskContext) {
        throw new Error('Обработка маски изображения недоступна')
      }
      let maskImage: ImageData | null = null
      let previousTime = -1
      let previousFrame = -Infinity
      let ready = false
      const draw = (now: number): void => {
        if (disposed) {
          return
        }
        try {
          // Выделяем силуэт не чаще 20 раз в секунду, собираем кадр до 640 пикселей; захват не меняем.
          if (
            video.readyState >= 2 &&
            video.videoWidth > 0 &&
            video.currentTime !== previousTime &&
            now - previousFrame >= 50
          ) {
            previousTime = video.currentTime
            previousFrame = now
            const scale = Math.min(
              1,
              640 / Math.max(video.videoWidth, video.videoHeight),
            )

            const width = Math.max(1, Math.round(video.videoWidth * scale))
            const height = Math.max(1, Math.round(video.videoHeight * scale))
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
            }
            created.segmentForVideo(video, now, (result) => {
              const mask = result.confidenceMasks?.[0]
              if (!mask) {
                throw new Error('Не удалось выделить силуэт человека')
              }
              if (
                !maskImage ||
                maskCanvas.width !== mask.width ||
                maskCanvas.height !== mask.height
              ) {
                maskCanvas.width = mask.width
                maskCanvas.height = mask.height
                maskImage = maskContext.createImageData(mask.width, mask.height)
              }
              const values = mask.getAsFloat32Array()
              for (let i = 0; i < values.length; i++) {
                // Мягкие края сохраняют детали волос без резкого обрезания силуэта.
                maskImage.data[i * 4 + 3] = Math.round(
                  Math.max(0, Math.min(1, (values[i] - 0.1) / 0.8)) * 255,
                )
              }
              maskContext.putImageData(maskImage, 0, 0)
              context.globalCompositeOperation = 'source-over'
              context.filter = 'none'
              context.clearRect(0, 0, width, height)
              context.drawImage(video, 0, 0, width, height)
              context.globalCompositeOperation = 'destination-in'
              context.drawImage(maskCanvas, 0, 0, width, height)
              context.globalCompositeOperation = 'destination-over'
              if (mode === 'blur') {
                context.filter = 'blur(12px)'
                context.drawImage(video, -24, -24, width + 48, height + 48)
              } else if (background) {
                const cover = Math.max(
                  width / background.naturalWidth,
                  height / background.naturalHeight,
                )

                const w = background.naturalWidth * cover
                const h = background.naturalHeight * cover
                context.drawImage(
                  background,
                  (width - w) / 2,
                  (height - h) / 2,
                  w,
                  h,
                )
              }
              context.filter = 'none'
              context.globalCompositeOperation = 'source-over'
            })
            if (!ready) {
              ready = true
              setStatus('ready')
            }
          }
          frameId = requestAnimationFrame(draw)
        } catch {
          fail()
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    void start().catch(fail)
    return () => {
      disposed = true
      release()
    }
  }, [stream, mode, file, attempt])

  return (
    <CameraEffectsStyled>
      <div className="effect-preview">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Изображение с вашей камеры"
        />
        <canvas
          ref={canvasRef}
          hidden={!stream || status !== 'ready'}
          role="img"
          aria-label="Изображение камеры с эффектом фона"
        />
      </div>
      <Select
        label="Эффект фона"
        value={mode}
        onChange={changeMode}
        options={[
          { id: 'none', text: 'Без эффекта' },
          { id: 'blur', text: 'Размытие фона' },
          { id: 'image', text: 'Картинка вместо фона' },
        ]}
      />
      {mode === 'image' && (
        <label>
          Выберите картинку для фона
          <input type="file" accept="image/*" onChange={changeImage} />
        </label>
      )}
      <p className="hint">
        Без эффекта показывается исходное изображение камеры. Размытие сохраняет
        ваш силуэт чётким и размывает фон. Картинка заменяет фон выбранным
        изображением, обрезанным по размеру кадра.
      </p>
      <p className="hint">
        Силуэт определяется на вашем устройстве: видео и картинки не
        отправляются на сервер. При первом включении загружается модель. На
        границах силуэта возможны неточности, на слабых устройствах — снижение
        плавности. Эффекты действуют только в этой проверке, не в звонках.
      </p>
      <p role="status" className="hint">
        {!stream
          ? 'Включите камеру, чтобы попробовать эффекты.'
          : mode === 'image' && !file
            ? 'Выберите картинку, чтобы попробовать этот эффект.'
            : status === 'loading'
              ? 'Загрузка эффекта фона…'
              : status === 'ready'
                ? 'Эффект фона включён.'
                : ''}
      </p>
      {error && (
        <>
          <p role="alert">{error}</p>
          <Button variant="secondary" onClick={retry}>
            Повторить попытку
          </Button>
        </>
      )}
    </CameraEffectsStyled>
  )
}
