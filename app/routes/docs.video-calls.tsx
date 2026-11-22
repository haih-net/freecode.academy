import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import { VideoCallsDocumentationPage } from 'app/Custom/pages/Documentation/VideoCalls'

export const meta: MetaFunction = ({ error }) =>
  error
    ? unavailableSeoMeta()
    : createSeoMeta({
        title: 'Видеозвонки | Документация',
        description:
          'Групповые P2P-видеозвонки, приглашения по ссылке, коды доступа и демонстрация экрана: устройство системы и ограничения.',
        noindex: true,
        path: '/docs/video-calls',
      })

export default VideoCallsDocumentationPage
