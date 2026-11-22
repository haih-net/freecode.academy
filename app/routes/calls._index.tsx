import type { MetaFunction } from 'react-router'
import { CallsPage } from 'app/Custom/pages/Calls'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta: MetaFunction = () =>
  createSeoMeta({
    noindex: true,
    title: 'Видеозвонки',
    description: 'Групповые P2P-видеозвонки и проверка устройств',
    path: '/calls',
  })
export default CallsPage
