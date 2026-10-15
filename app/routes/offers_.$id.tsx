import { OfferPage } from '../Custom/pages/Offers/Offer'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'

export const loader = detailLoader('offer')
export const meta = detailMeta('offer')
export default OfferPage
