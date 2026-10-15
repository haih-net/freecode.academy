import { WorklogPage } from '../Custom/pages/Worklogs/Worklog'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('worklog')
export const meta = detailMeta('worklog')
export default WorklogPage
