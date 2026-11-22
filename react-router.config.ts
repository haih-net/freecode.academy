import type { Config } from '@react-router/dev/config'
export default {
  ssr: true,
  prerender: ['/', '/docs', '/docs/video-calls'],
  routeDiscovery: { mode: 'initial' },
} satisfies Config
