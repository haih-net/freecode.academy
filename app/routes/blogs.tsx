import { BlogsPage } from '../Custom/pages/Blogs'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('blogs')
export const meta = libraryMeta('Blogs', '/blogs', false)
export default BlogsPage
