import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function makeChallengeLink(object: LinkObject): string {
  return `/learn/exercises/${encodeURIComponent(object.id || '')}`
}
export const ChallengeLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={makeChallengeLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
