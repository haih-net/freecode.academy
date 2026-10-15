import { LearnStrategyPage } from '../Custom/pages/LearnStrategies/LearnStrategy'
import { libraryLoader } from '../Custom/pages/shared/libraryLoader.server'
import { libraryMeta } from '../Custom/pages/shared/libraryMeta'
export const loader = libraryLoader('strategies')
export const meta = libraryMeta('Learning Strategy', '/learnstrategies', false)
export default LearnStrategyPage
