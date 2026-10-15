import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { MenuItem } from '../../../types/menu'

type LinkObject = Pick<MenuItem, 'id' | 'title'>
type TeamLinkProps = Omit<LinkProps, 'to'> & {
  team: LinkObject | null | undefined
}

export function makeTeamLink(object: LinkObject): string {
  return `/teams/${object.id}`
}

export const TeamLink: React.FC<TeamLinkProps> = ({
  team,
  children,
  ...other
}) => {
  if (!team) {
    return null
  }
  return (
    <Link to={makeTeamLink(team)} title={team.title || undefined} {...other}>
      {children ?? team.title}
    </Link>
  )
}
