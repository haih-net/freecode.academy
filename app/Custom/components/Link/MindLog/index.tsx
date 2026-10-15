import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function makeMindLogLink(object: LinkObject): string {
  return `/mind-logs/${encodeURIComponent(object.id || '')}`
}
export const MindLogLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={makeMindLogLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
