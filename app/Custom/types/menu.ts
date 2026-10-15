export const menuSections = [
  'people',
  'teams',
  'offers',
  'projects',
  'tasks',
  'topics',
] as const
export type MenuSection = (typeof menuSections)[number]
export interface PublicAuthor {
  id: string
  username: string | null
  fullname: string | null
  image: string | null
}
export interface MenuItem {
  id: string
  name: string | null
  title: string | null
  username: string | null
  fullname: string | null
  image: string | null
  intro: string | null
  description: string | null
  status: string | null
  uri: string | null
  createdAt: string
  CreatedBy: PublicAuthor | null
  Resource: { uri: string | null } | null
}
export interface MenuPageData {
  items: MenuItem[]
  page: number
  count: number
  limit: number
  totalPages: number
}
