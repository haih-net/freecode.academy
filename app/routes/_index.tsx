import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { MainPage } from '../Custom/pages/MainPage'
import { site } from '../components/seo/site'

export const handle = {
  seo: {
    title: 'Freecode Academy',
    description: site.description,
    path: '/',
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default MainPage
