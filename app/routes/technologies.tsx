import { TechnologiesPage } from '../Custom/pages/Technologies'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('technologies')
export const meta = libraryMeta('Technologies', '/technologies', false)
export default TechnologiesPage
