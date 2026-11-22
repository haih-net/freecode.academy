import type * as React from 'react'
import { Link } from 'react-router'
import { CallsStyled } from 'app/Custom/components/Calls/styles'
import {
  useCallPreview,
  useCallMedia,
} from 'app/Custom/components/Calls/hooks/useCallMedia'
import { previewMediaId } from 'app/Custom/components/Calls/hooks/useCallMedia'
import { DeviceControls } from 'app/Custom/components/Calls/DeviceControls'
import { CameraEffects } from './CameraEffects'
import { ScreenShare } from './ScreenShare'
import { TestBroadcast } from './TestBroadcast'
export const CallDevicesPage: React.FC = () => {
  useCallPreview()
  const media = useCallMedia(previewMediaId)
  if (!media) {
    return <CallsStyled>Загрузка устройств…</CallsStyled>
  }
  return (
    <CallsStyled>
      <nav>
        <Link to="/calls">Видеозвонки</Link>
        <Link to="/docs/video-calls">Документация</Link>
      </nav>
      <h1 tabIndex={-1}>Проверка камеры, микрофона и демонстрации экрана</h1>
      <p>
        Проверьте камеру, уровень микрофона, звук и демонстрацию экрана до
        созвона. Комната и регистрация не нужны. Проверка выполняется в
        браузере: звук и видео никуда не отправляются.
      </p>
      <TestBroadcast />
      <DeviceControls
        mediaId={previewMediaId}
        cameraPreview={<CameraEffects stream={media.streams.camera} />}
      />
      <ScreenShare />
    </CallsStyled>
  )
}
