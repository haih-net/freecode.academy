import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { TechnologyLink } from '../../components/Link/Technology'
import { UserLink } from '../../components/Link/User'
import { Pagination } from '../../components/Pagination'
import { MembersCount } from '../../components/MembersCount'
import { VisuallyHiddenTitle } from '../../components/Page/styles'
import {
  TechnologiesViewStyled,
  TechnologiesGrid,
  TechnologyCard,
  TechnologyCardTitle,
  TechnologyCardAuthor,
  TechnologyCardMembers,
} from './styles'
export const TechnologiesPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<LibraryPageData>()
  return (
    <TechnologiesViewStyled>
      <VisuallyHiddenTitle tabIndex={-1}>Technologies</VisuallyHiddenTitle>
      <TechnologiesGrid>
        {items.map(({ record, memberCount }) => (
          <TechnologyCard key={record.id}>
            <TechnologyCardTitle>
              <TechnologyLink object={record} />
            </TechnologyCardTitle>
            {record.CreatedBy && (
              <TechnologyCardAuthor>
                <UserLink user={record.CreatedBy} size="small" />
              </TechnologyCardAuthor>
            )}
            {memberCount > 0 && (
              <TechnologyCardMembers>
                <MembersCount count={memberCount} />
              </TechnologyCardMembers>
            )}
          </TechnologyCard>
        ))}
      </TechnologiesGrid>
      <Pagination currentPage={page} totalPages={totalPages} />
    </TechnologiesViewStyled>
  )
}
