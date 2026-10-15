import { CatalogsPage } from '../Custom/pages/Catalogs'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const loader = () => ({ title: 'Katalog saitov' })
export const meta = () =>
  createSeoMeta({ title: 'Katalog saitov', description: '', noindex: true })
export default CatalogsPage
