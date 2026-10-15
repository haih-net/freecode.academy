import { RestrictedPage } from '../Custom/pages/Restricted'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta = () =>
  createSeoMeta({ title: 'Admin. TTS', description: '', noindex: true })
export default RestrictedPage
