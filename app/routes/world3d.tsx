import { WorldPage } from '../Custom/pages/World3D'
import { worldLoader } from '../Custom/pages/World3D/loader.server'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const loader = worldLoader
export const meta = () =>
  createSeoMeta({
    title: '3D World',
    description: '',
    path: '/world3d',
    noindex: true,
  })
export default WorldPage
