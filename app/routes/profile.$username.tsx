import { UserPage } from '../Custom/pages/People/User'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('user')
export const meta = detailMeta('user')
export default UserPage
