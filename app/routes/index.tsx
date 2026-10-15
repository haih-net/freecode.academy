import { redirect } from 'react-router'
export const loader = (): Response => redirect('/', 301)
