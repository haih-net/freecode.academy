import type { MenuItem } from './menu'

export const detailKinds = [
  'user',
  'team',
  'offer',
  'project',
  'task',
  'resource',
  'worklog',
] as const
export type DetailKind = (typeof detailKinds)[number]
export interface DetailRecord extends MenuItem {
  content: string | null
  type: string | null
  published: boolean
  joinedAt: string | null
  updatedAt: string
}
export interface UserSkill {
  id: string
  technologyId: string
  name: string
  level: number | null
  status: string | null
  hiringStatus: string | null
  dateFrom: string | null
  dateTill: string | null
}
export interface DetailPageData {
  record: DetailRecord
  project: DetailRecord | null
  task: DetailRecord | null
  members: DetailRecord[]
  skills: UserSkill[]
  tasks: DetailRecord[]
  worklogs: DetailRecord[]
  comments: DetailRecord[]
  children: DetailRecord[]
  relatedCount: number
  page: number
  totalPages: number
}
