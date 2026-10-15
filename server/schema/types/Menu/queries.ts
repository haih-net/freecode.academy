import type { Knex } from 'knex'
import { GraphQLError } from 'graphql'
import type {
  MenuSection,
  MenuItem,
  MenuPageData,
  PublicAuthor,
} from '../../../../app/Custom/types/menu'

const statuses: Record<string, string> = {
  NEW: 'New',
  PROGRESS: 'Progress',
  DONE: 'Done',
  REJECTED: 'Rejected',
  ACCEPTED: 'Accepted',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  DISCUSS: 'Discuss',
  PAUSED: 'Paused',
  REVISIONSREQUIRED: 'RevisionsRequired',
}
interface Row {
  id: string
  published?: boolean
  deleted?: boolean
  type?: string | null
  name?: string | null
  title?: string | null
  username?: string | null
  fullname?: string | null
  image?: string | null
  intro?: string | null
  description?: string | null
  status?: string | null
  uri?: string | null
  createdAt: Date
  CreatedBy?: string | null
  createdById?: string | null
  Resource?: string | null
}
export async function loadMenuPage(
  db: Knex,
  section: MenuSection,
  page: number,
  status?: string | null,
  projectId?: string | null,
  requestedStatuses?: string[] | null,
): Promise<MenuPageData> {
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000) {
    throw new GraphQLError('Invalid page', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const table = {
    people: 'User',
    teams: 'Team',
    offers: 'Offer',
    projects: 'Project',
    tasks: 'Task',
    topics: 'Resource',
  }[section]
  const query = db<Row>(table)
  const columns: string[] = ['id', 'createdAt']
  switch (section) {
    case 'people':
      query.where('status', 'active').whereNot('image', '')
      columns.push('username', 'fullname', 'image', 'intro')
      break
    case 'teams':
      query.where('status', 'Active')
      columns.push('name', 'image', 'intro')
      break
    case 'offers':
      query.where('published', true)
      columns.push('title', 'image', 'intro', 'createdById')
      break
    case 'projects':
      query.where(function () {
        this.whereNull('type').orWhereNot('type', 'Education')
      })
      columns.push('name', 'description', 'CreatedBy', 'Resource')
      break
    case 'tasks':
      if (status || requestedStatuses?.length) {
        const values = status ? [status] : (requestedStatuses ?? [])
        const selected = values.map((status) => {
          const dbStatus =
            statuses[status] ??
            (Object.values(statuses).includes(status) ? status : null)
          if (!dbStatus) {
            throw new GraphQLError('Invalid task status', {
              extensions: { code: 'BAD_USER_INPUT' },
            })
          }
          return dbStatus
        })
        query.whereIn('status', selected)
      } else {
        query.whereNotIn('status', ['Done', 'Rejected', 'Completed'])
      }
      if (projectId) {
        query.where('projectId', projectId)
      }
      columns.push('title', 'description', 'status', 'createdById')
      break
    case 'topics':
      query
        .where({ published: true, deleted: false, type: 'Topic' })
        .whereNotExists(
          db('CodeChallenge')
            .select(db.raw('1'))
            .whereRaw('?? = ??', ['CodeChallenge.Topic', 'Resource.id']),
        )
      columns.push('name', 'intro', 'uri', 'CreatedBy')
      break
  }
  const count = Number(
    (await query.clone().count<{ count: string }[]>('* as count'))[0]?.count ??
      0,
  )
  const firstLimit = ['teams', 'offers', 'tasks'].includes(section)
    ? 3
    : section === 'topics'
      ? 10
      : 6
  const limit = page === 1 ? firstLimit : section === 'topics' ? 10 : 6
  const skip = page === 1 ? 0 : firstLimit + (page - 2) * limit
  const orderColumn = ['people', 'teams', 'projects'].includes(section)
    ? 'updatedAt'
    : 'createdAt'
  const rows = await query
    .select<Row[]>(columns)
    .orderBy(orderColumn, section === 'offers' ? 'asc' : 'desc')
    .orderBy('id')
    .offset(skip)
    .limit(limit)
  const authorIds = [
    ...new Set(
      rows
        .map((row) => row.createdById || row.CreatedBy)
        .filter((id): id is string => Boolean(id)),
    ),
  ]
  const authors: PublicAuthor[] = authorIds.length
    ? await db<PublicAuthor>('User')
        .select('id', 'username', 'fullname', 'image')
        .whereIn('id', authorIds)
    : []
  const authorMap = new Map(authors.map((author) => [author.id, author]))
  const resourceIds = rows
    .map((row) => row.Resource)
    .filter((id): id is string => Boolean(id))
  const resources: { id: string; uri: string }[] = resourceIds.length
    ? await db('Resource').select('id', 'uri').whereIn('id', resourceIds)
    : []
  const resourceMap = new Map(
    resources.map((resource) => [resource.id, resource]),
  )
  const items: MenuItem[] = rows.map((row) => ({
    id: row.id,
    name: row.name ?? null,
    title: row.title ?? row.name ?? null,
    username: row.username ?? null,
    fullname: row.fullname ?? null,
    image: row.image ?? null,
    intro: row.intro ?? null,
    description: row.description ?? null,
    status: section === 'tasks' ? (row.status?.toUpperCase() ?? null) : null,
    uri: row.uri ?? null,
    createdAt: row.createdAt.toISOString(),
    CreatedBy: authorMap.get(row.createdById || row.CreatedBy || '') ?? null,
    Resource: resourceMap.get(row.Resource || '') ?? null,
  }))
  return {
    items,
    page,
    count,
    limit,
    totalPages:
      count <= firstLimit
        ? 1
        : 1 + Math.ceil((count - firstLimit) / (section === 'topics' ? 10 : 6)),
  }
}
