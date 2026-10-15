import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function createTagLink(object: LinkObject): string {
  return `/tag/${encodeURIComponent(object.name || '')}`
}
export const TagLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={createTagLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
