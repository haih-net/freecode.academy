import { CatalogResourcePage } from '../Custom/pages/Catalogs/Resource'
import { detailLoader } from '../Custom/pages/shared/detailLoader.server'
import { detailMeta } from '../Custom/pages/shared/detailMeta'
export const loader = detailLoader('resource')
export const meta = detailMeta('resource')
export default CatalogResourcePage
