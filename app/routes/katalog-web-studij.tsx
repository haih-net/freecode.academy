import { CatalogsPage } from '../Custom/pages/Catalogs'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const loader = () => ({ title: 'Web studios' })
export const meta = () =>
  createSeoMeta({ title: 'Web studios', description: '', noindex: true })
export default CatalogsPage
