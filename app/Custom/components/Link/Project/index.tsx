import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { MenuItem } from '../../../types/menu'

type LinkObject = Pick<MenuItem, 'id' | 'name' | 'Resource'>
type ProjectLinkProps = Omit<LinkProps, 'to'> & {
  object: LinkObject | null | undefined
}

export function makeProjectLink(object: LinkObject): string {
  return object.Resource?.uri || `/projects/id/${object.id}`
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({
  object,
  children,
  ...other
}) => {
  if (!object) {
    return null
  }
  return (
    <Link
      to={makeProjectLink(object)}
      title={object.name || undefined}
      {...other}
    >
      {children ?? object.name}
    </Link>
  )
}
