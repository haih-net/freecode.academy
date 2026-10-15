import { KnowledgeBasePage } from '../Custom/pages/KnowledgeBase'
import { knowledgeLoader } from '../Custom/pages/KnowledgeBase/loader.server'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const loader = knowledgeLoader
export const meta = () =>
  createSeoMeta({
    title: 'Knowledge Base',
    description: '',
    path: '/knowledges-base',
  })
export default KnowledgeBasePage
