import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'
import type { LoaderFunctionArgs } from 'react-router'
import { GraphQLError } from 'graphql'
import { CombinedGraphQLErrors } from '@apollo/client'
import createApolloClient from '../../../gql/apolloClient/createApolloClient'
import type { MenuPageData, MenuSection } from '../../types/menu'

const query: TypedDocumentNode<
  { menuPage: MenuPageData },
  {
    section: MenuSection
    page: number
    status: string | null
    statuses: string[]
    projectId: string | null
  }
> = gql`
  query MenuPage(
    $section: MenuSection!
    $page: Int!
    $status: String
    $statuses: [String!]
    $projectId: String
  ) {
    menuPage(
      section: $section
      page: $page
      status: $status
      statuses: $statuses
      projectId: $projectId
    ) {
      page
      count
      limit
      totalPages
      items {
        id
        name
        title
        username
        fullname
        image
        intro
        description
        status
        uri
        createdAt
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
    }
  }
`
export const menuLoader =
  (section: MenuSection) =>
  async ({ request }: LoaderFunctionArgs): Promise<MenuPageData> => {
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
    const client = createApolloClient({ withWs: false })
    try {
      const { data } = await client.query({
        query,
        variables: {
          section,
          page,
          status: section === 'tasks' ? url.searchParams.get('status') : null,
          statuses:
            section === 'tasks' ? url.searchParams.getAll('status_in') : [],
          projectId:
            section === 'tasks' ? url.searchParams.get('projectId') : null,
        },
        fetchPolicy: 'no-cache',
      })
      if (!data) {
        throw new Error('No menu page response')
      }
      if (page > 1 && !data.menuPage.items.length) {
        throw new Response('Page not found', { status: 404 })
      }
      return data.menuPage
    } catch (error) {
      if (
        CombinedGraphQLErrors.is(error) &&
        error.errors.some(
          (item: GraphQLError | { extensions?: Record<string, unknown> }) =>
            item.extensions?.code === 'BAD_USER_INPUT',
        )
      ) {
        throw new Response('Invalid filter', { status: 400 })
      }
      throw error
    } finally {
      client.stop()
    }
  }
