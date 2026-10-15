import { gql, type TypedDocumentNode } from '@apollo/client'
import type { LoaderFunctionArgs } from 'react-router'
import createApolloClient from '../../../gql/apolloClient/createApolloClient'
import type { LibraryKind, LibraryPageData } from '../../types/library'
const query: TypedDocumentNode<
  { libraryPage: LibraryPageData | null },
  {
    kind: LibraryKind
    page: number
    id?: string
    name?: string
    tab?: string
    topicId?: string
  }
> = gql`
  fragment LibraryRecord on DetailRecord {
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
  fragment LibraryItemFields on LibraryItem {
    record {
      ...LibraryRecord
    }
    memberCount
    level
    siteUrl
    hours
    parentId
    instructions
    topicId
  }
  query LibraryPage(
    $kind: LibraryKind!
    $page: Int!
    $id: String
    $name: String
    $tab: String
    $topicId: String
  ) {
    libraryPage(
      kind: $kind
      page: $page
      id: $id
      name: $name
      tab: $tab
      topicId: $topicId
    ) {
      items {
        ...LibraryItemFields
      }
      record {
        ...LibraryItemFields
      }
      related {
        ...LibraryItemFields
      }
      members {
        id
        user {
          id
          username
          fullname
          image
        }
        level
        status
        hiringStatus
        isMentor
        dateFrom
        dateTill
      }
      stages {
        id
        strategyId
        targetId
        technologyId
        name
        level
      }
      discussion {
        catalog {
          website
          address
          email
          phone
          image
        }
        record {
          ...LibraryRecord
        }
        comments {
          ...LibraryRecord
        }
        children {
          ...LibraryRecord
        }
        project {
          ...LibraryRecord
        }
        task {
          ...LibraryRecord
        }
        members {
          ...LibraryRecord
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
        tasks {
          ...LibraryRecord
        }
        worklogs {
          ...LibraryRecord
        }
        page
        relatedCount
        totalPages
      }
      page
      count
      totalPages
    }
  }
`
export const libraryLoader =
  (kind: LibraryKind) =>
  async ({ request, params }: LoaderFunctionArgs): Promise<LibraryPageData> => {
    const raw = new URL(request.url).searchParams.get('page') ?? '1'
    const page = Number(raw)
    if (
      !/^\d+$/.test(raw) ||
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 100000
    ) {
      throw new Response('Invalid page', { status: 400 })
    }
    const parts = params['*']?.split('/') ?? []
    const id = kind === 'exercises' ? parts[0] : params.id
    if (
      id === 'create' ||
      (kind === 'exercises' && (!id || parts.length > 3))
    ) {
      throw new Response('Page not found', { status: 404 })
    }
    const client = createApolloClient({ withWs: false })
    try {
      const { data } = await client.query({
        query,
        variables: {
          kind,
          page,
          id,
          name: params.name,
          tab: parts[1],
          topicId: parts[2],
        },
        fetchPolicy: 'no-cache',
      })
      if (!data?.libraryPage || page > data.libraryPage.totalPages) {
        throw new Response('Page not found', { status: 404 })
      }
      return data.libraryPage
    } finally {
      client.stop()
    }
  }
