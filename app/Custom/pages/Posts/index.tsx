import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { Post } from '../../components/Post'
import { Pagination } from '../../components/Pagination'
import { PostsStyled } from './styles'
export const PostsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <PostsStyled>
      <h1 tabIndex={-1}>Posts</h1>
      {items.map((item) => (
        <Post key={item.record.id} record={item.record} />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </PostsStyled>
  )
}
