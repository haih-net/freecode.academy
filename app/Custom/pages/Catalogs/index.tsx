import type * as React from 'react'
import { useLoaderData } from 'react-router'
// Both catalog lists are sudo-only in the source application.
export const CatalogsPage: React.FC = () => {
  const { title } = useLoaderData<{ title: string }>()
  return <h1 tabIndex={-1}>{title}</h1>
}
