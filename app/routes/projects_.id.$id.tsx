import { ProjectPage } from '../Custom/pages/Projects/Project'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('project')
export const meta = detailMeta('project')
export default ProjectPage
