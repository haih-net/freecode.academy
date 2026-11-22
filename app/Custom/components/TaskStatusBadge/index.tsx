import type * as React from 'react'
import { BadgeStyled } from './styles'
const labels: Record<string, string> = {
  NEW: 'Новая',
  PROGRESS: 'В работе',
  DONE: 'Выполнена',
  REJECTED: 'Отклонена',
  ACCEPTED: 'Принята',
  APPROVED: 'Одобрена',
  COMPLETED: 'Завершена',
  DISCUSS: 'Обсуждение',
  PAUSED: 'Приостановлена',
  REVISIONSREQUIRED: 'Требуются доработки',
}

export const TaskStatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <BadgeStyled data-status={status}>{labels[status] || status}</BadgeStyled>
)
