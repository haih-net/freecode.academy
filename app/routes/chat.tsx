import { ChatPage } from '../Custom/pages/Chat'
import { createSeoMeta } from '../components/seo/SeoHeaders'
export const meta = () =>
  createSeoMeta({ title: 'AI Chat', description: '', noindex: true })
export default ChatPage
