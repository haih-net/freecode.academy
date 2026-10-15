import type { DetailRecord, DetailPageData } from './detail'
import type { PublicAuthor } from './menu'
export const libraryKinds = [
  'technologies',
  'strategies',
  'sections',
  'exercises',
  'posts',
  'tags',
  'blogs',
  'comments',
  'worklogs',
  'mindlogs',
  'concepts',
] as const
export type LibraryKind = (typeof libraryKinds)[number]
export interface LibraryItem {
  record: DetailRecord
  memberCount: number
  level: number | null
  siteUrl: string | null
  hours: (number | null)[]
  parentId: string | null
  instructions: string | null
  topicId: string | null
}
export interface LibraryMember {
  id: string
  user: PublicAuthor
  level: number | null
  status: string | null
  hiringStatus: string | null
  isMentor: boolean
  dateFrom: string | null
  dateTill: string | null
}
export interface LibraryStage {
  id: string
  strategyId: string
  targetId: string | null
  technologyId: string | null
  name: string
  level: number | null
}
export interface LibraryPageData {
  items: LibraryItem[]
  record: LibraryItem | null
  related: LibraryItem[]
  members: LibraryMember[]
  stages: LibraryStage[]
  discussion: DetailPageData | null
  page: number
  count: number
  totalPages: number
}
