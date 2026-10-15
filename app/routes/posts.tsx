import { PostsPage } from '../Custom/pages/Posts'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('posts')
export const meta = libraryMeta('Posts', '/posts', false)
export default PostsPage
