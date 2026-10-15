import { MindLogsPage } from '../Custom/pages/MindLogs'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('mindlogs')
export const meta = libraryMeta('Mind Logs', '/mind-logs', true)
export default MindLogsPage
