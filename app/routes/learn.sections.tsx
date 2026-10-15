import { SectionsPage } from '../Custom/pages/Learn/Sections'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('sections')
export const meta = libraryMeta('Coding Challenges', '/learn/sections', false)
export default SectionsPage
