import { PeoplePage } from '../Custom/pages/People'
import { menuLoader } from '../Custom/pages/shared/loader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = menuLoader('people')
export const meta = libraryMeta('Участники', '/people')
export default PeoplePage
