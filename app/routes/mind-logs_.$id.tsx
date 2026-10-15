import { MindLogPage } from '../Custom/pages/MindLogs/MindLog'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('mindlogs')
export const meta = libraryMeta('Mind Log', '/mind-logs', true)
export default MindLogPage
