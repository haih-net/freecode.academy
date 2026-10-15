import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { TeamsPage } from '../Custom/pages/Teams'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('teams')

export const handle = {
  seo: {
    title: 'Команды — Freecode Academy',
    description: 'Команды в сети Freecode Academy.',
    path: '/teams',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default TeamsPage
