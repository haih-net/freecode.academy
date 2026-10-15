import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
export const TagPage: React.FC = () => {
  const { record } = useLoaderData<LibraryPageData>()
  return <>{record?.record.name}</>
}
