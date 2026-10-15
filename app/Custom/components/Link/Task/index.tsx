import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { MenuItem } from '../../../types/menu'

type LinkObject = Pick<MenuItem, 'id' | 'title'>
type TaskLinkProps = Omit<LinkProps, 'to'> & {
  task: LinkObject | null | undefined
}

export function createTaskLink(object: LinkObject): string {
  return `/tasks/${object.id}`
}

export const TaskLink: React.FC<TaskLinkProps> = ({
  task,
  children,
  ...other
}) => {
  if (!task) {
    return null
  }
  return (
    <Link to={createTaskLink(task)} title={task.title || undefined} {...other}>
      {children ?? task.title}
    </Link>
  )
}
