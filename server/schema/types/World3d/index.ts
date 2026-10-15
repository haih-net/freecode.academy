import { builder } from '../../builder'
builder.queryField('world3dScene', (t) =>
  t.field({
    type: 'Json',
    resolve: async (): Promise<unknown> => {
      const baseUrl = process.env.WORLD3D_API_URL || 'http://world3d:4100'
      const response = await fetch(`${baseUrl}/api/objects?nodeId=root`, {
        method: 'GET',
        signal: AbortSignal.timeout(10000),
      })
      if (response.status === 404) {
        return null
      }
      if (!response.ok) {
        throw new Error(`World3D API error: ${response.status}`)
      }
      return response.json()
    },
  }),
)
