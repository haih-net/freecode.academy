import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { PeoplePage } from '../Custom/pages/People'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('people')

export const handle = {
  seo: {
    title: 'Участники — Freecode Academy',
    description: 'Участники в сети Freecode Academy.',
    path: '/people',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default PeoplePage
