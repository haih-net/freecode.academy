import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
import { MindLogCard } from '../../../components/MindLogCard'
export const MindLogPage: React.FC = () => {
  const { record } = useLoaderData<LibraryPageData>()
  return record ? <MindLogCard record={record.record} /> : null
}
