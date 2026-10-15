import { PostPage } from '../Custom/pages/Posts/Post'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('posts')
export const meta = libraryMeta('Post', '/posts', false)
export default PostPage
