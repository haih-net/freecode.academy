import { redirect, type LoaderFunctionArgs } from 'react-router'
export const loader = ({ params }: LoaderFunctionArgs): Response =>
  redirect(`/worklogs/${encodeURIComponent(params.id || '')}`, 301)
