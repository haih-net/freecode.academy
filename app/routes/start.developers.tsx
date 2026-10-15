import { DevelopersStartPage } from '../Custom/pages/Start/Developers'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta = () =>
  createSeoMeta({
    title: 'Getting Started — Your Web Development Journey Begins Here',
    description: 'Step-by-step guide for aspiring developers.',
    path: '/start/developers',
  })
export default DevelopersStartPage
