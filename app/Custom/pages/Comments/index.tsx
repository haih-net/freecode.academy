import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { ResourceCard } from '../../components/ResourceCard'
import { Pagination } from '../../components/Pagination'
import { VisuallyHiddenTitle } from '../../components/Page/styles'
import { CommentsStyled } from './styles'
export const CommentsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <CommentsStyled>
      <VisuallyHiddenTitle tabIndex={-1}>Comments</VisuallyHiddenTitle>
      {items.map((item) => (
        <ResourceCard key={item.record.id} record={item.record} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </CommentsStyled>
  )
}
