import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { WorkLogCard } from '../../components/WorkLogCard'
import { Pagination } from '../../components/Pagination'
import { WorklogsStyled } from './styles'
export const WorklogsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <WorklogsStyled>
      <h1 tabIndex={-1}>Work Logs</h1>
      {items.map((item) => (
        <WorkLogCard key={item.record.id} workLog={item.record} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </WorklogsStyled>
  )
}
