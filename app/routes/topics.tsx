import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { TopicsPage } from '../Custom/pages/Topics'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('topics')

export const handle = {
  seo: {
    title: 'Топики — Freecode Academy',
    description: 'Топики в сети Freecode Academy.',
    path: '/topics',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default TopicsPage
