import { LearnStrategiesPage } from '../Custom/pages/LearnStrategies'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('strategies')
export const meta = libraryMeta(
  'Learning Strategies',
  '/learnstrategies',
  false,
)
export default LearnStrategiesPage
