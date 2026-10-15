import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function createPostLink(object: LinkObject): string {
  return `/posts/${encodeURIComponent(object.id || '')}`
}
export const PostLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={createPostLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
