import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { MindLogCard } from '../../components/MindLogCard'
import { Pagination } from '../../components/Pagination'
import { MindLogsStyled } from './styles'
export const MindLogsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <MindLogsStyled>
      <h1 tabIndex={-1}>Mind Logs</h1>
      {items.map((item) => (
        <MindLogCard key={item.record.id} record={item.record} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </MindLogsStyled>
  )
}
