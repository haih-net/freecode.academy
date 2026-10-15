import { TaskPage } from '../Custom/pages/Tasks/Task'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('task')
export const meta = detailMeta('task')
export default TaskPage
