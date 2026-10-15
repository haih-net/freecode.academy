export type AnimationName = 'idle' | 'walk' | 'run' | 'jump'
export interface WorldObject3d {
  uuid?: string
  type?: string
  name?: string
  matrix?: number[]
  layers?: number
  up?: number[]
  userData?: Record<string, unknown>
  children?: WorldObject3d[]
  [key: string]: unknown
}
export interface WorldPageData {
  root: WorldObject3d | null
  error: string | null
}
export function normalizeWorldScene(payload: unknown): WorldObject3d | null {
  if (!payload || typeof payload !== 'object') {
    return null
  }
  const record = payload as Record<string, unknown>
  const object =
    record.object && typeof record.object === 'object'
      ? (record.object as Record<string, unknown>)
      : record
  return typeof object.type === 'string' || Array.isArray(object.children)
    ? (object as WorldObject3d)
    : null
}
