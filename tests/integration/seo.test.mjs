import { test, assert } from 'vitest'
import { readFileSync } from 'node:fs'
import { canonicalUrl, site } from '../../app/components/seo/site.ts'

const headOf = (html) => html.match(/<head>([\s\S]*?)<\/head>/)[1]

test('prerendered homepage uses the configured canonical origin', () => {
  const html = readFileSync(
    new URL('../../build/client/index.html', import.meta.url),
    'utf8',
  )
  const head = headOf(html)
  const canonical = canonicalUrl('/')
  assert.equal((head.match(/<title>/g) || []).length, 1)
  assert.equal((head.match(/rel="canonical"/g) || []).length, 1)
  assert.ok(head.includes(`rel="canonical" href="${canonical}"`))
  assert.ok(head.includes(`property="og:url" content="${canonical}"`))
  const graph = JSON.parse(
    head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  )['@graph']
  const website = graph.find((node) => node['@type'] === 'WebSite')
  assert.equal(website.name, site.name)
  assert.equal(website.url, canonical)
  assert.ok(
    graph.some(
      (node) =>
        ['WebPage', 'CollectionPage'].includes(node['@type']) &&
        node.url === canonical,
    ),
  )
})

test('unknown SSR route is 404 and noindex without a fabricated canonical or article', async () => {
  const { createRequestHandler } = await import('react-router')
  const build = await import('../../build/server/index.js')
  const response = await createRequestHandler(
    build,
    'production',
  )(new globalThis.Request(new URL('/missing-seo-page', site.origin)))
  assert.equal(response.status, 404)
  const head = headOf(await response.text())
  assert.ok(head.includes('noindex'))
  assert.ok(!head.includes('rel="canonical"'))
  assert.ok(!head.includes('BlogPosting'))
})

test.each([
  '/calls',
  '/calls/devices',
  '/calls/test-room',
  '/docs',
  '/docs/video-calls',
])(
  'страница %s запрещает индексацию и не показывает закрытые пункты меню гостю',
  async (path) => {
    const { createRequestHandler } = await import('react-router')
    const build = await import('../../build/server/index.js')
    const response = await createRequestHandler(
      build,
      'production',
    )(new globalThis.Request(new URL(path, site.origin)))
    assert.equal(response.status, 200)
    const html = await response.text()
    const head = headOf(html)
    const robots = [...head.matchAll(/<meta name="robots" content="([^"]*)"/g)]
    assert.equal(robots.length, 1)
    assert.ok(robots[0][1].split(/,\s*/).includes('noindex'))
    assert.ok(!robots[0][1].split(/,\s*/).includes('index'))
    const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1]
    assert.ok(!/href="\/(calls|docs)(?:[/?#"])/.test(header))
  },
)
