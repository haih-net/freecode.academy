import { useCallMedia } from '../../../components/Calls/hooks/useCallMedia'
import { previewMediaId } from '../../../components/Calls/hooks/useCallMedia'
import type * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from 'app/Custom/components/Button'

import { MediaView } from 'app/Custom/components/Calls/MediaView'

export const ScreenShare: React.FC = () => {
  const media = useCallMedia(previewMediaId)
  const [availability, setAvailability] = useState<string | null>(null)
  useEffect(() => {
    setAvailability(
      !window.isSecureContext
        ? 'Для демонстрации откройте сайт по HTTPS или через localhost.'
        : !navigator.mediaDevices?.getDisplayMedia
          ? 'Этот браузер не поддерживает демонстрацию экрана.'
          : '',
    )
  }, [])
  const start = useCallback((): void => {
    void media.handle?.start('screen')
  }, [media])

  const stop = useCallback((): void => {
    media.handle?.stop('screen')
  }, [media])

  const stream = media.streams.screen
  return (
    <section className="panel" aria-labelledby="screen-share-heading">
      <h2 id="screen-share-heading">Проверка демонстрации экрана</h2>
      <p>
        Выберите вкладку, окно приложения или экран в диалоге браузера.
        Доступные варианты зависят от браузера и операционной системы.
        Предпросмотр виден только вам и никуда не передаётся.
      </p>
      <p className="hint">
        Выбор произвольной области экрана доступен только если его предлагает
        системный диалог. Отдельного универсального выбора области в браузере
        нет. Эта проверка захватывает только изображение, без звука.
      </p>
      <div className="actions">
        <Button
          onClick={start}
          disabled={availability !== '' || media.busy.screen}
        >
          {media.busy.screen
            ? 'Выберите источник в диалоге…'
            : stream
              ? 'Выбрать другой источник'
              : 'Выбрать источник и проверить'}
        </Button>
        {(stream || media.busy.screen) && (
          <Button variant="secondary" onClick={stop}>
            Остановить проверку
          </Button>
        )}
      </div>
      <p role="status">
        {availability ||
          (stream
            ? 'Демонстрация включена. Остановить её можно здесь или в браузере.'
            : media.busy.screen
              ? 'Ожидание выбора источника.'
              : 'Демонстрация выключена.')}
      </p>
      {stream && (
        <MediaView
          stream={stream}
          muted
          label="Предпросмотр выбранного экрана, окна или вкладки"
        />
      )}
    </section>
  )
}
