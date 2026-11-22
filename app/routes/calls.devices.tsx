import type { MetaFunction } from 'react-router'
import { CallDevicesPage } from 'app/Custom/pages/Calls/Devices'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta: MetaFunction = () =>
  createSeoMeta({
    noindex: true,
    title: 'Проверка камеры, микрофона и демонстрации экрана',
    description:
      'Локальная проверка камеры, микрофона, динамиков и демонстрации экрана',
    path: '/calls/devices',
  })
export default CallDevicesPage
