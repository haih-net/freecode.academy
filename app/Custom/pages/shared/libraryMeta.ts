import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
} from '../../../components/seo/SeoHeaders'
import type { LibraryPageData } from '../../types/library'
export const libraryMeta =
  (title: string, path: string, noindex = false): MetaFunction =>
  ({ loaderData, error }) => {
    if (error) {
      return unavailableSeoMeta()
    }
    const data = loaderData as LibraryPageData | undefined
    const item = data?.record?.record
    return createSeoMeta({
      title: item?.name || item?.title || title,
      description: item?.description || '',
      path: item
        ? `${path}/${encodeURIComponent(path === '/tag' ? item.name || item.id : item.id)}`
        : path,
      noindex,
    })
  }
