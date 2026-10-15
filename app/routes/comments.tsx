import { CommentsPage } from '../Custom/pages/Comments'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('comments')
export const meta = libraryMeta('Comments', '/comments', false)
export default CommentsPage
