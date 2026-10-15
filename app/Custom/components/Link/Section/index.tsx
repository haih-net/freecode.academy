import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function makeSectionLink(object: LinkObject): string {
  return `/learn/sections/${encodeURIComponent(object.id || '')}`
}
export const SectionLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={makeSectionLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
