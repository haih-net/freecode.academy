import { RestrictedPage } from '../Custom/pages/Restricted'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta = () =>
  createSeoMeta({ title: 'Search agent', description: '', noindex: true })
export default RestrictedPage
