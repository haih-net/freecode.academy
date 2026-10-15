import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { TasksPage } from '../Custom/pages/Tasks'
import { menuLoader } from '../Custom/pages/shared/loader.server'
export const loader = menuLoader('tasks')

export const handle = {
  seo: {
    title: 'Задачи — Freecode Academy',
    description: 'Задачи в сети Freecode Academy.',
    path: '/tasks',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default TasksPage
