import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { db } from '../database'

const limit = 1000
const sections = [
  'topics',
  'users',
  'resources',
  'tags',
  'offers',
  'projects',
  'tasks',
  'worklogs',
] as const
type Section = (typeof sections)[number]
interface SitemapRow {
  id: string
  updatedAt: Date
  uri?: string | null
  username?: string | null
  name?: string
}
interface UrlItem {
  url: string
  updatedAt: string
}

// Match the filters in the original server/sitemap/old.ts, shared by counts and pages.
function sectionQuery(section: Section): Knex.QueryBuilder {
  switch (section) {
    case 'topics':
    case 'resources': {
      const query = db('Resource as item')
        .where({ 'item.published': true, 'item.deleted': false })
        .whereNotExists(
          db('CodeChallenge')
            .select(db.raw('1'))
            .whereRaw('?? = ??', ['CodeChallenge.Topic', 'item.id']),
        )
      return section === 'topics'
        ? query.where('item.type', 'Topic')
        : query.whereNot('item.type', 'Topic')
    }
    case 'users':
      return db('User as item').where('item.status', 'active')
    case 'tags':
      return db('Tag as item')
    case 'offers':
      return db('Offer as item').where('item.published', true)
    case 'projects':
      return db('Project as item').where(function () {
        this.whereNull('item.type').orWhereNot('item.type', 'Education')
      })
    case 'tasks':
      return db('Task as item').whereExists(
        db('Project as project')
          .select(db.raw('1'))
          .whereRaw('?? = ??', ['project.id', 'item.projectId'])
          .where(function () {
            this.whereNull('project.type').orWhereNot(
              'project.type',
              'Education',
            )
          }),
      )
    case 'worklogs':
      return db('TaskWorkLog as item')
  }
}

export function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[char] ?? char,
  )
}

function resourcePath(uri: string): string {
  return (
    '/' +
    uri
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .map((segment) => {
        // Existing URIs may already contain percent-encoded segments.
        try {
          return encodeURIComponent(decodeURIComponent(segment))
        } catch {
          return encodeURIComponent(segment)
        }
      })
      .join('/')
  )
}

function urlset(items: UrlItem[], origin: string): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    items
      .map(
        (item) =>
          `  <url>\n    <loc>${escapeXml(origin + item.url)}</loc>\n    <lastmod>${escapeXml(item.updatedAt)}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`,
      )
      .join('') +
    '</urlset>'
  )
}

async function sitemapIndex(origin: string): Promise<string> {
  const counts = await Promise.all(
    sections.map(async (section) => {
      const result =
        await sectionQuery(section).count<{ count: string }[]>('* as count')
      return Number(result[0].count)
    }),
  )
  const locations = [`${origin}/sitemap.xml?section=main`]
  sections.forEach((section, index) => {
    for (let page = 1; page <= Math.ceil(counts[index] / limit); page++) {
      locations.push(`${origin}/sitemap.xml?section=${section}&page=${page}`)
    }
  })
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    locations
      .map(
        (location) =>
          `  <sitemap><loc>${escapeXml(location)}</loc></sitemap>\n`,
      )
      .join('') +
    '</sitemapindex>'
  )
}

async function sitemapPage(
  section: Section,
  page: number,
  origin: string,
): Promise<string> {
  const query = sectionQuery(section)
  const dateColumn = section === 'worklogs' ? 'createdAt' : 'updatedAt'
  const orderColumn = ['offers', 'projects', 'tasks'].includes(section)
    ? 'updatedAt'
    : 'createdAt'
  const columns = ['item.id', `item.${dateColumn} as updatedAt`]
  if (section === 'topics' || section === 'resources') {
    columns.push('item.uri')
  }
  if (section === 'tags') {
    columns.push('item.name')
  }
  if (section === 'users') {
    columns.push('item.username')
  }
  if (section === 'projects') {
    query.leftJoin('Resource as resource', 'resource.id', 'item.Resource')
    columns.push('resource.uri as uri')
  }
  const rows = await query
    .select<SitemapRow[]>(columns)
    .orderBy(`item.${orderColumn}`, 'desc')
    .orderBy('item.id')
    .limit(limit)
    .offset((page - 1) * limit)
  const items = rows.map((row): UrlItem => {
    let url: string
    switch (section) {
      case 'topics':
      case 'resources':
        url = resourcePath(row.uri ?? '')
        break
      case 'users':
        url = row.username
          ? `/profile/${encodeURIComponent(row.username)}`
          : `/profile/id/${encodeURIComponent(row.id)}`
        break
      case 'tags':
        url = `/tag/${encodeURIComponent(row.name ?? '')}`
        break
      case 'projects':
        url = row.uri
          ? resourcePath(row.uri)
          : `/projects/id/${encodeURIComponent(row.id)}`
        break
      default:
        url = `/${section}/${encodeURIComponent(row.id)}`
    }
    return { url, updatedAt: row.updatedAt.toISOString() }
  })
  return urlset(items, origin)
}

export async function generateSitemap(
  req: Request,
  res: Response,
): Promise<void> {
  const section = req.query.section
  const rawPage = req.query.page ?? '1'
  if (
    section !== undefined &&
    section !== 'main' &&
    !sections.some((value) => value === section)
  ) {
    res.status(404).type('text/plain').send('Not found')
    return
  }
  if (
    typeof rawPage !== 'string' ||
    !/^\d+$/.test(rawPage) ||
    !Number.isSafeInteger(Number(rawPage)) ||
    Number(rawPage) < 1 ||
    Number(rawPage) > 100000
  ) {
    res.status(400).type('text/plain').send('Invalid page')
    return
  }
  const origin = `${req.protocol}://${req.get('host')}`
  let xml: string
  if (section === undefined) {
    xml = await sitemapIndex(origin)
  } else if (section === 'main') {
    const monday = new Date()
    monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7))
    const updatedAt = monday.toISOString().split('T')[0]
    xml = urlset(
      ['/', '/comments', '/people', '/about', '/start/developers'].map(
        (url) => ({ url, updatedAt }),
      ),
      origin,
    )
  } else {
    xml = await sitemapPage(section as Section, Number(rawPage), origin)
  }
  res.setHeader('Cache-Control', 'no-store')
  res.type('application/xml').send(xml)
}
