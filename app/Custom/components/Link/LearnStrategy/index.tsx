import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
type LinkObject = { id: string; name?: string | null; title?: string | null }
export function makeLearnStrategyLink(object: LinkObject): string {
  return `/learnstrategies/${encodeURIComponent(object.id || '')}`
}
export const LearnStrategyLink: React.FC<
  Omit<LinkProps, 'to'> & { object: LinkObject }
> = ({ object, children, ...other }) => (
  <Link to={makeLearnStrategyLink(object)} {...other}>
    {children ?? object.name ?? object.title ?? object.id}
  </Link>
)
