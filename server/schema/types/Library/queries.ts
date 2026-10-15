import type { Knex } from 'knex'
import { GraphQLError } from 'graphql'
import type {
  LibraryKind,
  LibraryItem,
  LibraryPageData,
  LibraryMember,
  LibraryStage,
} from '../../../../app/Custom/types/library'
import type { PublicAuthor } from '../../../../app/Custom/types/menu'
import { records, type Row, loadDetailPage } from '../Detail/queries'

interface LibraryRow extends Row {
  level?: number | null
  site_url?: string | null
  level1hours?: number | null
  level2hours?: number | null
  level3hours?: number | null
  level4hours?: number | null
  level5hours?: number | null
  parentId?: string | null
  Parent?: string | null
  Block?: string | null
  instructions?: string | null
  Topic?: string | null
  data?: string | null
}
const tables: Record<LibraryKind, string> = {
  technologies: 'Technology',
  strategies: 'LearnStrategy',
  sections: 'CodeChallengeBlock',
  exercises: 'CodeChallenge',
  posts: 'Post',
  tags: 'Tag',
  blogs: 'Resource',
  comments: 'Resource',
  worklogs: 'TaskWorkLog',
  mindlogs: 'MindLog',
  concepts: 'KBConcept',
}
const fields: Record<LibraryKind, string[]> = {
  technologies: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'contentText',
    'site_url',
    'level1hours',
    'level2hours',
    'level3hours',
    'level4hours',
    'level5hours',
    'CreatedBy',
  ],
  strategies: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'level',
    'createdById',
  ],
  sections: ['id', 'createdAt', 'updatedAt', 'name', 'Parent', 'CreatedBy'],
  exercises: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'instructions',
    'Block',
    'Topic',
    'CreatedBy',
  ],
  posts: [
    'id',
    'createdAt',
    'updatedAt',
    'title',
    'description',
    'intro',
    'content',
    'image',
    'status',
    'createdById',
    'parentId',
  ],
  tags: ['id', 'createdAt', 'updatedAt', 'name', 'status', 'CreatedBy'],
  blogs: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'longtitle',
    'intro',
    'contentV2',
    'contentV3',
    'contentText',
    'uri',
    'image',
    'type',
    'published',
    'deleted',
    'CreatedBy',
  ],
  comments: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'longtitle',
    'intro',
    'contentV2',
    'contentV3',
    'contentText',
    'uri',
    'image',
    'type',
    'published',
    'deleted',
    'CreatedBy',
  ],
  worklogs: ['id', 'createdAt', 'content', 'createdById', 'taskId'],
  mindlogs: ['id', 'createdAt', 'updatedAt', 'type', 'data', 'createdById'],
  concepts: [
    'id',
    'createdAt',
    'updatedAt',
    'name',
    'intro',
    'description',
    'content',
    'uri',
    'image',
    'createdById',
  ],
}
const baseQuery = (
  db: Knex,
  kind: LibraryKind,
): Knex.QueryBuilder<LibraryRow, LibraryRow[]> => {
  const q = db<LibraryRow>(tables[kind]).select<LibraryRow[]>(fields[kind])
  if (kind === 'posts') {
    q.where('status', 'published')
  }
  if (kind === 'exercises') {
    q.where(function () {
      this.whereNull('isPrivate').orWhere('isPrivate', false)
    })
  }
  if (kind === 'concepts') {
    q.where('visibility', 'public')
  }
  if (kind === 'blogs' || kind === 'comments') {
    q.where({
      type: kind === 'blogs' ? 'Blog' : 'Comment',
      published: true,
      deleted: false,
    }).whereNotExists(
      db('CodeChallenge')
        .select(db.raw('1'))
        .whereRaw('?? = ??', ['CodeChallenge.Topic', 'Resource.id']),
    )
  }
  return q
}
async function items(
  db: Knex,
  kind: LibraryKind,
  rows: LibraryRow[],
): Promise<LibraryItem[]> {
  const normalized = await records(
    db,
    kind === 'blogs' || kind === 'comments'
      ? 'resource'
      : kind === 'worklogs'
        ? 'worklog'
        : 'team',
    rows.map((r) => ({
      ...r,
      content: kind === 'mindlogs' ? r.data : r.content,
    })),
  )
  const ids = rows.map((r) => r.id)
  let counts: { id: string; count: string }[] = []
  if (ids.length && (kind === 'technologies' || kind === 'strategies')) {
    const fk = kind === 'technologies' ? 'Technology' : 'learnStrategyId'
    counts = await db(
      kind === 'technologies' ? 'UserTechnology' : 'UserLearnStrategy',
    )
      .select({ id: fk })
      .count('* as count')
      .whereIn(fk, ids)
      .groupBy(fk)
  }
  const countMap = new Map(counts.map((c) => [c.id, Number(c.count)]))
  return rows.map((r, i) => ({
    record: normalized[i],
    memberCount: countMap.get(r.id) || 0,
    level: r.level ?? null,
    siteUrl: r.site_url ?? null,
    hours: [
      r.level1hours ?? null,
      r.level2hours ?? null,
      r.level3hours ?? null,
      r.level4hours ?? null,
      r.level5hours ?? null,
    ],
    parentId: r.Parent ?? r.Block ?? r.parentId ?? null,
    instructions: r.instructions ?? null,
    topicId: r.Topic ?? null,
  }))
}
export async function loadLibrary(
  db: Knex,
  kind: LibraryKind,
  page: number,
  id?: string | null,
  name?: string | null,
  tab?: string | null,
  topicId?: string | null,
): Promise<LibraryPageData | null> {
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000) {
    throw new GraphQLError('Invalid page', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const result: LibraryPageData = {
    items: [],
    record: null,
    related: [],
    members: [],
    stages: [],
    discussion: null,
    page,
    count: 0,
    totalPages: 1,
  }
  const q = baseQuery(db, kind)
  if (id || name) {
    const row = await q.where(id ? 'id' : 'name', id || name).first()
    if (!row) {
      return null
    }
    result.record = (await items(db, kind, [row]))[0]
    if (kind === 'technologies') {
      interface MemberRow {
        id: string
        CreatedBy: string
        level: number | null
        status: string | null
        hiring_status: string | null
        isMentor: boolean
        date_from: Date | null
        date_till: Date | null
      }
      const ms: MemberRow[] = await db('UserTechnology')
        .select(
          'id',
          'CreatedBy',
          'level',
          'status',
          'hiring_status',
          'isMentor',
          'date_from',
          'date_till',
        )
        .where('Technology', row.id)
        .orderBy('createdAt')
      const authors: PublicAuthor[] = await db('User')
        .select('id', 'username', 'fullname', 'image')
        .whereIn(
          'id',
          ms.map((m) => m.CreatedBy),
        )
      const users = new Map(authors.map((u) => [u.id, u]))
      result.members = ms.flatMap((m): LibraryMember[] => {
        const user = users.get(m.CreatedBy)
        return user
          ? [
              {
                id: m.id,
                user,
                level: m.level,
                status: m.status,
                hiringStatus: m.hiring_status,
                isMentor: m.isMentor,
                dateFrom: m.date_from?.toISOString() ?? null,
                dateTill: m.date_till?.toISOString() ?? null,
              },
            ]
          : []
      })
      const strategyIds = db('LearnStrategyStage')
        .select('learnStrategyId')
        .where('technologyId', row.id)
      result.related = await items(
        db,
        'strategies',
        await baseQuery(db, 'strategies').whereIn('id', strategyIds),
      )
    }
    if (kind === 'strategies') {
      const seen = new Set<string>()
      let pending = [row.id]
      while (pending.length) {
        const ids = pending.filter((id) => !seen.has(id))
        if (!ids.length) {
          break
        }
        ids.forEach((id) => seen.add(id))
        interface StageRow {
          id: string
          learnStrategyId: string
          learnStrategyTargetId: string | null
          technologyId: string | null
          level: number | null
        }
        const stages: StageRow[] = await db('LearnStrategyStage')
          .select(
            'id',
            'learnStrategyId',
            'learnStrategyTargetId',
            'technologyId',
            'level',
          )
          .whereIn('learnStrategyId', ids)
          .orderBy('createdAt')
          .orderBy('id')
        const targets = stages
          .map((s) => s.learnStrategyTargetId)
          .filter((id): id is string => !!id)
        const targetRows = await baseQuery(db, 'strategies').whereIn(
          'id',
          targets,
        )
        const techRows = await baseQuery(db, 'technologies').whereIn(
          'id',
          stages.map((s) => s.technologyId).filter((id): id is string => !!id),
        )
        const names = new Map(
          [...targetRows, ...techRows].map((r) => [r.id, r.name || r.id]),
        )
        result.stages.push(
          ...stages.map((s): LibraryStage => ({
            id: s.id,
            strategyId: s.learnStrategyId,
            targetId: s.learnStrategyTargetId,
            technologyId: s.technologyId,
            name:
              names.get(s.technologyId || s.learnStrategyTargetId || '') || '',
            level: s.level,
          })),
        )
        const related = await items(db, 'strategies', targetRows)
        for (const item of related) {
          if (!result.related.some((r) => r.record.id === item.record.id)) {
            result.related.push(item)
          }
        }
        pending = targets
      }
    }
    if (kind === 'sections') {
      result.related = await items(
        db,
        'sections',
        await baseQuery(db, 'sections')
          .where('Parent', row.id)
          .orderBy('rank')
          .orderBy('id'),
      )
      result.items = await items(
        db,
        'exercises',
        await baseQuery(db, 'exercises')
          .where('Block', row.id)
          .orderBy('rank')
          .orderBy('id'),
      )
    }
    if (kind === 'exercises') {
      if (tab && tab !== 'discuss') {
        return null
      }
      if (topicId && (tab !== 'discuss' || topicId !== row.Topic)) {
        return null
      }
      if (tab === 'discuss' && row.Topic) {
        result.discussion = await loadDetailPage(
          db,
          'resource',
          row.Topic,
          null,
          null,
          1,
        )
      }
    }
    return result
  }
  if (kind === 'exercises') {
    return null
  }
  if (kind === 'sections') {
    q.whereNull('Parent')
  }
  const limit =
    kind === 'tags' || kind === 'mindlogs' || kind === 'worklogs'
      ? 20
      : kind === 'concepts'
        ? 12
        : kind === 'strategies' || kind === 'sections'
          ? null
          : 10
  result.count = Number(
    (await q.clone().clearSelect().count<{ count: string }[]>('* as count'))[0]
      .count,
  )
  result.totalPages = limit ? Math.max(1, Math.ceil(result.count / limit)) : 1
  if (kind === 'sections') {
    q.orderBy('rank').orderBy('id')
  } else if (['technologies', 'strategies', 'tags'].includes(kind)) {
    q.orderBy('createdAt', 'asc').orderBy('id')
  } else {
    q.orderBy(kind === 'concepts' ? 'updatedAt' : 'createdAt', 'desc').orderBy(
      'id',
    )
  }
  if (limit) {
    q.limit(limit).offset((page - 1) * limit)
  }
  result.items = await items(db, kind, await q)
  if (kind === 'sections') {
    result.related = await items(
      db,
      'sections',
      await baseQuery(db, 'sections')
        .whereIn(
          'Parent',
          result.items.map((i) => i.record.id),
        )
        .orderBy('rank')
        .orderBy('id'),
    )
  }
  return result
}
