import type * as React from 'react'
import { BadgeStyled } from './styles'
const labels: Record<string, string> = {
  NEW: 'New',
  PROGRESS: 'In Progress',
  DONE: 'Done',
  REJECTED: 'Rejected',
  ACCEPTED: 'Accepted',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  DISCUSS: 'Discuss',
  PAUSED: 'Paused',
  REVISIONSREQUIRED: 'Revisions required',
}
export const TaskStatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <BadgeStyled data-status={status}>{labels[status] || status}</BadgeStyled>
)
