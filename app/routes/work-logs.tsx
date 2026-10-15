import { redirect } from 'react-router'
export const loader = (): Response => redirect('/worklogs', 301)
