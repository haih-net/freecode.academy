import type { MetaFunction } from 'react-router'
import { data } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
export const handle = {
  seo: {
    title: 'Page not found — Freecode Academy',
    description: 'The requested page could not be found.',
    noindex: true,
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export const loader = (): ReturnType<typeof data<{ statusCode: number }>> =>
  data({ statusCode: 404 }, { status: 404 })

export default function NotFound() {
  return (
    <>
      <h1 tabIndex={-1}>Page not found</h1>
      <p>This URL does not exist.</p>
    </>
  )
}
