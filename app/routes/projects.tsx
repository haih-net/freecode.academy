import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { ProjectsPage } from '../Custom/pages/Projects'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('projects')

export const handle = {
  seo: {
    title: 'Проекты — Freecode Academy',
    description: 'Проекты в сети Freecode Academy.',
    path: '/projects',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default ProjectsPage
