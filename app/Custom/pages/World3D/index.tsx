import {
  lazy,
  Suspense,
  Component,
  useCallback,
  useSyncExternalStore,
} from 'react'
import type * as React from 'react'
import { useLoaderData, useRevalidator } from 'react-router'
import type { WorldPageData } from '../../types/world3d'
import { WorldStyled } from './styles'
const Scene = lazy(() =>
  import('./Scene').then((module) => ({ default: module.WorldScene })),
)
class SceneBoundary extends Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false }
  static getDerivedStateFromError(): { error: boolean } {
    return { error: true }
  }
  componentDidCatch(error: Error): void {
    console.error('[World3D] Scene rendering failed:', error)
  }
  render(): React.ReactNode {
    return this.state.error ? (
      <div className="world-status">Unable to display the 3D scene.</div>
    ) : (
      this.props.children
    )
  }
}
const subscribe = (): (() => void) => () => undefined
const clientSnapshot = (): boolean => true
const serverSnapshot = (): boolean => false
export const WorldPage: React.FC = () => {
  const { root, error } = useLoaderData<WorldPageData>()
  const revalidator = useRevalidator()
  const mounted = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  )
  const reconnect = useCallback(() => {
    void revalidator.revalidate()
  }, [revalidator])
  return (
    <WorldStyled aria-label="3D World">
      {root ? (
        <SceneBoundary>
          <Suspense
            fallback={<div className="world-status">Loading world…</div>}
          >
            {mounted && <Scene root={root} />}
          </Suspense>
        </SceneBoundary>
      ) : (
        <div className="world-status" role="status">
          <h1>3D World</h1>
          <p>{error}</p>
          <button disabled={revalidator.state !== 'idle'} onClick={reconnect}>
            Reconnect
          </button>
        </div>
      )}
    </WorldStyled>
  )
}
