import { ExercisePage } from '../Custom/pages/Learn/Exercise'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('exercises')
export const meta = libraryMeta('Challenge', '/learn/exercises', false)
export default ExercisePage
