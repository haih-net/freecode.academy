import { gql, type TypedDocumentNode } from '@apollo/client'
import createApolloClient from '../../../gql/apolloClient/createApolloClient'
import { normalizeWorldScene, type WorldPageData } from '../../types/world3d'
const query: TypedDocumentNode<{ world3dScene: unknown }> = gql`
  query World3dScene {
    world3dScene
  }
`
export const worldLoader = async (): Promise<WorldPageData> => {
  const client = createApolloClient({ withWs: false })
  try {
    const { data } = await client.query({ query, fetchPolicy: 'no-cache' })
    const root = normalizeWorldScene(data?.world3dScene)
    return { root, error: root ? null : 'The world scene is unavailable.' }
  } catch (error) {
    console.error('[World3D] Failed to load scene:', error)
    return { root: null, error: 'Failed to connect to the world server.' }
  } finally {
    client.stop()
  }
}
