import { ConceptsPage } from '../Custom/pages/Concepts'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('concepts')
export const meta = libraryMeta('Concepts', '/concepts', false)
export default ConceptsPage
