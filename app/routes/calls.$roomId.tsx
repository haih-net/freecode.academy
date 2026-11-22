import type { MetaFunction } from 'react-router'
import { CallRoomPage } from 'app/Custom/pages/Calls/Room'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta: MetaFunction = () =>
  createSeoMeta({
    noindex: true,
    title: 'Комната звонка',
    description: 'Групповые P2P-видеозвонки и проверка устройств',
    path: '/calls',
  })
export default CallRoomPage
