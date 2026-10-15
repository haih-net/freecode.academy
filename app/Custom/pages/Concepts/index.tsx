import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { ConceptsStyled } from './styles'
export const ConceptsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <ConceptsStyled>
      {items.map(({ record }) => (
        <article key={record.id}>
          <h2>{record.name}</h2>
          <Markdown>{record.intro || record.description}</Markdown>
        </article>
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </ConceptsStyled>
  )
}
