import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import { DetailDate } from '../../Detail/Date'
type WorkLog = { id: string; createdAt: string }
export function makeTaskWorkLogLink(taskWorkLog: Pick<WorkLog, 'id'>): string {
  return `/worklogs/${taskWorkLog.id}`
}
export const TaskWorkLogLink: React.FC<
  Omit<LinkProps, 'to'> & { taskWorkLog: WorkLog }
> = ({ taskWorkLog, children, ...other }) => (
  <Link to={makeTaskWorkLogLink(taskWorkLog)} {...other}>
    {children ?? <DetailDate value={taskWorkLog.createdAt} time />}
  </Link>
)
