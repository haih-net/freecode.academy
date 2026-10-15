import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { OffersPage } from '../Custom/pages/Offers'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('offers')

export const handle = {
  seo: {
    title: 'Предложения — Freecode Academy',
    description: 'Предложения в сети Freecode Academy.',
    path: '/offers',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default OffersPage
