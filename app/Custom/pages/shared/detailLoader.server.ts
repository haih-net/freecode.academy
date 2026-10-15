import {
  gql,
  CombinedGraphQLErrors,
  type TypedDocumentNode,
} from '@apollo/client'
import type { LoaderFunctionArgs } from 'react-router'
import createApolloClient from '../../../gql/apolloClient/createApolloClient'
import type { DetailKind, DetailPageData } from '../../types/detail'

const query: TypedDocumentNode<
  { detailPage: DetailPageData | null },
  {
    kind: DetailKind
    id?: string
    username?: string
    uri: string
    page: number
  }
> = gql`
  fragment PublicDetailRecord on DetailRecord {
    id
    name
    title
    username
    fullname
    image
    intro
    description
    content
    status
    uri
    type
    published
    createdAt
    updatedAt
    joinedAt
    CreatedBy {
      id
      username
      fullname
      image
    }
    Resource {
      uri
    }
  }
  query DetailPage(
    $kind: DetailKind!
    $id: String
    $username: String
    $uri: String!
    $page: Int!
  ) {
    detailPage(
      kind: $kind
      id: $id
      username: $username
      uri: $uri
      page: $page
    ) {
      catalog {
        website
        address
        email
        phone
        image
      }
      record {
        ...PublicDetailRecord
      }
      project {
        ...PublicDetailRecord
      }
      task {
        ...PublicDetailRecord
      }
      members {
        ...PublicDetailRecord
      }
      tasks {
        ...PublicDetailRecord
      }
      worklogs {
        ...PublicDetailRecord
      }
      comments {
        ...PublicDetailRecord
      }
      children {
        ...PublicDetailRecord
      }
      skills {
        id
        technologyId
        name
        level
        status
        hiringStatus
        dateFrom
        dateTill
      }
      relatedCount
      page
      totalPages
    }
  }
`
export const detailLoader =
  (kind: DetailKind) =>
  async ({ request, params }: LoaderFunctionArgs): Promise<DetailPageData> => {
    const url = new URL(request.url)
    const raw = url.searchParams.get('page') ?? '1'
    const page = Number(raw)
    if (
      !/^\d+$/.test(raw) ||
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 100000
    ) {
      throw new Response('Invalid page', { status: 400 })
    }
    // Static create/edit routes in the original must not become content lookups.
    if (params.id === 'create' || params['*'] === 'create') {
      throw new Response('Page not found', { status: 404 })
    }
    let uri: string
    try {
      // Splat params contain the decoded content path without the .data
      // transport suffix used by React Router during client navigation.
      uri =
        params['*'] !== undefined
          ? `/${url.pathname.split('/')[1]}/${params['*']}`
          : decodeURIComponent(url.pathname)
    } catch {
      throw new Response('Invalid URL', { status: 400 })
    }
    const client = createApolloClient({ withWs: false })
    try {
      const { data } = await client.query({
        query,
        variables: {
          kind,
          id: params.id,
          username: params.username,
          uri,
          page,
        },
        fetchPolicy: 'no-cache',
      })
      if (!data?.detailPage || page > data.detailPage.totalPages) {
        throw new Response('Page not found', { status: 404 })
      }
      return data.detailPage
    } catch (error) {
      if (
        CombinedGraphQLErrors.is(error) &&
        error.errors.some((e) => e.extensions?.code === 'BAD_USER_INPUT')
      ) {
        throw new Response('Invalid request', { status: 400 })
      }
      throw error
    } finally {
      client.stop()
    }
  }
