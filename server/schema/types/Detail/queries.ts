import type { Knex } from 'knex'
import { GraphQLError } from 'graphql'
import type {
  DetailKind,
  DetailRecord,
  DetailPageData,
  UserSkill,
} from '../../../../app/Custom/types/detail'
import type { PublicAuthor } from '../../../../app/Custom/types/menu'

interface Row {
  id: string
  createdAt: Date
  updatedAt?: Date
  name?: string | null
  title?: string | null
  username?: string | null
  fullname?: string | null
  image?: string | null
  intro?: string | null
  description?: string | null
  content?: string | null
  contentText?: string | null
  contentV2?: string | null
  contentV3?: string | null
  longtitle?: string | null
  status?: string | null
  type?: string | null
  uri?: string | null
  published?: boolean
  deleted?: boolean
  createdById?: string | null
  CreatedBy?: string | null
  Resource?: string | null
  projectId?: string | null
  taskId?: string | null
  Team?: string | null
}
const tables: Record<DetailKind, string> = {
  user: 'User',
  team: 'Team',
  offer: 'Offer',
  project: 'Project',
  task: 'Task',
  resource: 'Resource',
  worklog: 'TaskWorkLog',
}
const columns: Record<DetailKind, string[]> = {
  user: [
    'id',
    'createdAt',
    'updatedAt',
    'username',
    'fullname',
    'image',
    'intro',
    'content',
    'status',
  ],
  team: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'intro',
    'content',
    'image',
    'status',
    'CreatedBy',
  ],
  offer: [
    'id',
    'createdAt',
    'updatedAt',
    'title',
    'description',
    'intro',
    'content',
    'image',
    'published',
    'createdById',
  ],
  project: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'content',
    'status',
    'CreatedBy',
    'Resource',
  ],
  task: [
    'id',
    'createdAt',
    'updatedAt',
    'title',
    'description',
    'content',
    'status',
    'createdById',
    'projectId',
  ],
  resource: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'longtitle',
    'intro',
    'contentV2',
    'contentV3',
    'contentText',
    'image',
    'uri',
    'type',
    'published',
    'deleted',
    'CreatedBy',
    'Team',
  ],
  worklog: ['id', 'createdAt', 'content', 'createdById', 'taskId'],
}
const selectRows = (
  db: Knex,
  kind: DetailKind,
): Knex.QueryBuilder<Row, Row[]> => db<Row>(tables[kind]).select(columns[kind])

async function records(
  db: Knex,
  kind: DetailKind,
  rows: Row[],
): Promise<DetailRecord[]> {
  const ids = [
    ...new Set(
      rows
        .map((r) => r.createdById || r.CreatedBy)
        .filter((id): id is string => Boolean(id)),
    ),
  ]
  const authors: PublicAuthor[] = ids.length
    ? await db('User')
        .select('id', 'username', 'fullname', 'image')
        .whereIn('id', ids)
    : []
  const authorMap = new Map(authors.map((r) => [r.id, r]))
  const resourceIds = rows
    .map((r) => r.Resource)
    .filter((id): id is string => Boolean(id))
  const resources: Row[] = resourceIds.length
    ? await db('Resource')
        .select('id', 'name', 'uri', 'contentV2')
        .whereIn('id', resourceIds)
    : []
  const resourceMap = new Map(resources.map((r) => [r.id, r]))
  return rows.map((row) => {
    const resource = resourceMap.get(row.Resource || '')
    return {
      id: row.id,
      name: resource?.name || row.name || null,
      title:
        row.title ||
        resource?.name ||
        row.name ||
        row.fullname ||
        row.username ||
        row.id,
      username: row.username ?? null,
      fullname: row.fullname ?? null,
      image: row.image ?? null,
      intro: row.intro ?? null,
      description: row.description || row.longtitle || null,
      content:
        kind === 'resource'
          ? row.contentV3 || row.contentV2 || row.contentText || null
          : kind === 'project'
            ? row.content || resource?.contentV2 || null
            : (row.content ?? row.contentText ?? null),
      status:
        kind === 'task'
          ? (row.status?.toUpperCase() ?? null)
          : (row.status ?? null),
      uri: row.uri ?? null,
      type: row.type ?? null,
      published: row.published !== false && row.deleted !== true,
      joinedAt: null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: (row.updatedAt || row.createdAt).toISOString(),
      CreatedBy: authorMap.get(row.createdById || row.CreatedBy || '') ?? null,
      Resource: resource ? { uri: resource.uri ?? null } : null,
    }
  })
}
async function recordById(
  db: Knex,
  kind: DetailKind,
  id: string | null | undefined,
): Promise<DetailRecord | null> {
  if (!id) {
    return null
  }
  const row = await selectRows(db, kind).where('id', id).first()
  return row ? (await records(db, kind, [row]))[0] : null
}
export async function loadDetailPage(
  db: Knex,
  kind: DetailKind,
  id: string | null | undefined,
  username: string | null | undefined,
  uri: string | null | undefined,
  page: number,
): Promise<DetailPageData | null> {
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000) {
    throw new GraphQLError('Invalid page', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const query = selectRows(db, kind)
  if (id) {
    query.where('id', id)
  } else if (kind === 'user' && username) {
    query.where('username', username)
  } else if (kind === 'resource' && uri) {
    query.where('uri', uri)
  } else if (kind === 'project' && uri) {
    query.whereIn(
      'Resource',
      db('Resource')
        .select('id')
        .whereIn('uri', [
          uri,
          uri.endsWith('/') ? uri.slice(0, -1) : uri + '/',
        ]),
    )
  } else {
    return null
  }
  // Only public content is exposed by this unauthenticated read-only endpoint.
  if (kind === 'offer') {
    query.where('published', true)
  }
  if (kind === 'resource') {
    query.where({ published: true, deleted: false })
  }
  const row = await query.first()
  if (!row) {
    return null
  }
  const record = (await records(db, kind, [row]))[0]
  const data: DetailPageData = {
    record,
    project: null,
    task: null,
    members: [],
    skills: [],
    tasks: [],
    worklogs: [],
    comments: [],
    children: [],
    relatedCount: 0,
    page,
    totalPages: 1,
  }
  if (kind === 'user') {
    interface SkillRow {
      id: string
      Technology: string
      level: number | null
      status: string | null
      hiring_status: string | null
      date_from: Date | null
      date_till: Date | null
      name: string
    }
    const skills: SkillRow[] = await db('UserTechnology as ut')
      .join('Technology as t', 't.id', 'ut.Technology')
      .where('ut.CreatedBy', row.id)
      .select(
        'ut.id',
        'ut.Technology',
        'ut.level',
        'ut.status',
        'ut.hiring_status',
        'ut.date_from',
        'ut.date_till',
        't.name',
      )
      .orderBy('t.name')
    data.skills = skills.map((s): UserSkill => ({
      id: s.id,
      technologyId: s.Technology,
      name: s.name,
      level: s.level,
      status: s.status,
      hiringStatus: s.hiring_status,
      dateFrom: s.date_from?.toISOString() ?? null,
      dateTill: s.date_till?.toISOString() ?? null,
    }))
  }
  if (kind === 'team') {
    const members = await selectRows(db, 'user')
      .whereIn(
        'id',
        db('TeamMember')
          .select('User')
          .where({ Team: row.id, status: 'Active' }),
      )
      .orderBy('createdAt')
    const memberships: { User: string; createdAt: Date }[] = await db(
      'TeamMember',
    )
      .select('User', 'createdAt')
      .where({ Team: row.id, status: 'Active' })
    const joined = new Map(
      memberships.map((member) => [
        member.User,
        member.createdAt.toISOString(),
      ]),
    )
    data.members = (await records(db, 'user', members)).map((member) => ({
      ...member,
      joinedAt: joined.get(member.id) ?? null,
    }))
  }
  if (kind === 'project') {
    const tasksQuery = selectRows(db, 'task').where('projectId', row.id)
    data.tasks = await records(
      db,
      'task',
      await tasksQuery
        .clone()
        .orderBy('createdAt', 'desc')
        .orderBy('id')
        .limit(3),
    )
    data.relatedCount = Number(
      (
        await db('Task')
          .where('projectId', row.id)
          .count<{ count: string }[]>('* as count')
      )[0].count,
    )
  }
  if (kind === 'task') {
    data.project = await recordById(db, 'project', row.projectId)
    data.worklogs = await records(
      db,
      'worklog',
      await selectRows(db, 'worklog')
        .where('taskId', row.id)
        .orderBy('createdAt', 'asc')
        .orderBy('id'),
    )
  }
  if (kind === 'worklog') {
    data.task = await recordById(db, 'task', row.taskId)
  }
  if (kind === 'resource') {
    const isBlog = row.type === 'Blog' || row.type === 'PersonalBlog'
    const related = selectRows(db, 'resource')
      .where({ published: true, deleted: false })
      .where(isBlog ? 'Blog' : 'Topic', row.id)
      .whereNotExists(
        db('CodeChallenge')
          .select(db.raw('1'))
          .whereRaw('?? = ??', ['CodeChallenge.Topic', 'Resource.id']),
      )
    if (isBlog) {
      data.relatedCount = Number(
        (
          await related
            .clone()
            .clearSelect()
            .count<{ count: string }[]>('* as count')
        )[0].count,
      )
      data.totalPages = Math.max(1, Math.ceil(data.relatedCount / 10))
      data.children = await records(
        db,
        'resource',
        await related
          .orderBy('createdAt', 'desc')
          .orderBy('id')
          .limit(10)
          .offset((page - 1) * 10),
      )
    } else {
      data.comments = await records(
        db,
        'resource',
        await related.orderBy('createdAt', 'asc').orderBy('id'),
      )
    }
  }
  return data
}
