import { WorklogsPage } from '../Custom/pages/Worklogs'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('worklogs')
export const meta = libraryMeta('Work Logs', '/worklogs', false)
export default WorklogsPage
