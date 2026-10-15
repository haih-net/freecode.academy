import { gql, type TypedDocumentNode } from '@apollo/client'
import createApolloClient from '../../../gql/apolloClient/createApolloClient'
import type { KnowledgePageData } from '../../types/knowledge'
const query: TypedDocumentNode<{ knowledgePage: KnowledgePageData }> = gql`
  query KnowledgePage {
    knowledgePage {
      concepts {
        id
        name
        type
        description
        content
      }
      spaces {
        id
        name
        type
        description
      }
      facts {
        id
        type
        statement
        confidence
        status
        source
        validFrom
      }
      participations {
        id
        conceptId
        factId
        role
        impact
        value
        localImportance
      }
      projections {
        id
        factId
        knowledgeSpaceId
        visibility
        trustLevel
        importance
        notes
      }
    }
  }
`
export const knowledgeLoader = async (): Promise<KnowledgePageData> => {
  const client = createApolloClient({ withWs: false })
  try {
    const { data } = await client.query({ query, fetchPolicy: 'no-cache' })
    if (!data) {
      throw new Response('Unable to load knowledge base', { status: 502 })
    }
    return data.knowledgePage
  } finally {
    client.stop()
  }
}
