import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { ResourceCard } from '../../components/ResourceCard'
import { Pagination } from '../../components/Pagination'
import { BlogsStyled } from './styles'
export const BlogsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <BlogsStyled>
      <h1 tabIndex={-1}>Blogs</h1>
      {items.map((item) => (
        <ResourceCard key={item.record.id} record={item.record} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </BlogsStyled>
  )
}
