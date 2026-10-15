import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
import { Post } from '../../../components/Post'
export const PostPage: React.FC = () => {
  const { record } = useLoaderData<LibraryPageData>()
  return record ? <Post record={record.record} full /> : null
}
