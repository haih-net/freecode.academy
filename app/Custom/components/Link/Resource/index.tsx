import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { MenuItem } from '../../../types/menu'

type LinkObject = Pick<MenuItem, 'id' | 'name' | 'uri'>
type ResourceLinkProps = Omit<LinkProps, 'to' | 'resource'> & {
  resource: LinkObject | null | undefined
}

export function makeResourceLink(object: LinkObject): string {
  return object.uri || `/topics/${object.id}`
}

export const ResourceLink: React.FC<ResourceLinkProps> = ({
  resource,
  children,
  ...other
}) => {
  if (!resource) {
    return null
  }
  return (
    <Link
      to={makeResourceLink(resource)}
      title={resource.name || undefined}
      {...other}
    >
      {children ?? resource.name}
    </Link>
  )
}
