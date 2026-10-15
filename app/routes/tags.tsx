import { TagsPage } from '../Custom/pages/Tags'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('tags')
export const meta = libraryMeta('Tags', '/tags', false)
export default TagsPage
