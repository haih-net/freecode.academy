import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { AboutPage } from '../Custom/pages/About'

export const handle = {
  seo: {
    title: 'О нас — Freecode Academy',
    description: 'О нас в сети Freecode Academy.',
    path: '/about',
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default AboutPage
