import { TechnologyPage } from '../Custom/pages/Technologies/Technology'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('technologies')
export const meta = libraryMeta('Technology', '/technologies', false)
export default TechnologyPage
