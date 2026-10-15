import { TeamPage } from '../Custom/pages/Teams/Team'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('team')
export const meta = detailMeta('team')
export default TeamPage
