import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { TagLink } from '../../components/Link/Tag'
import { Pagination } from '../../components/Pagination'
import { VisuallyHiddenTitle } from '../../components/Page/styles'
import { TagsStyled } from './styles'
export const TagsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <TagsStyled>
      <VisuallyHiddenTitle tabIndex={-1}>Tags</VisuallyHiddenTitle>
      {items.map((item) => (
        <div key={item.record.id}>
          <TagLink object={item.record} />
        </div>
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </TagsStyled>
  )
}
