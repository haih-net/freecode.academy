import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type Technology = { id: string; name: string | null }
export function makeTechnologyLink(object: Technology): string {
  return `/technologies/${object.id}`
}
export const TechnologyLink: React.FC<
  Omit<LinkProps, 'to'> & { object: Technology }
> = ({ object, children, ...other }) => (
  <Link to={makeTechnologyLink(object)} {...other}>
    {children ?? object.name}
  </Link>
)
