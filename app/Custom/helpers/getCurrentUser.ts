import { ApolloClient } from '@apollo/client'
import { MeDocument, MeQuery, MeUserFragment } from 'app/gql/generated'

export function getCurrentUser(
  apolloClient: ApolloClient,
): MeUserFragment | null | undefined {
  return apolloClient.cache.readQuery<MeQuery>({
    query: MeDocument,
    variables: {},
  })?.me
}
