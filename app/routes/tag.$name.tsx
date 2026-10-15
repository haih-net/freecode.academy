import { TagPage } from '../Custom/pages/Tags/Tag'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('tags')
export const meta = libraryMeta('Tag', '/tag', false)
export default TagPage
