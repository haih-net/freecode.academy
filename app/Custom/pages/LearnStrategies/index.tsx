import { LevelIcon } from '../../components/LevelIcon'
import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../types/library'
import { LearnStrategyLink } from '../../components/Link/LearnStrategy'
import { UserLink } from '../../components/Link/User'
import { MembersCount } from '../../components/MembersCount'
import { VisuallyHiddenTitle } from '../../components/Page/styles'
import {
  LearnStrategiesViewStyled,
  StrategiesGrid,
  StrategyCard,
  StrategyCardTitle,
  StrategyCardDescription,
  StrategyCardLevel,
  StrategyCardAuthor,
  StrategyCardMembers,
} from './styles'
export const LearnStrategiesPage: React.FC = () => {
  const { items } = useLoaderData<LibraryPageData>()
  return (
    <LearnStrategiesViewStyled>
      <VisuallyHiddenTitle tabIndex={-1}>
        Learning Strategies
      </VisuallyHiddenTitle>
      <StrategiesGrid>
        {items.map(({ record, level, memberCount }) => (
          <StrategyCard key={record.id}>
            {level && (
              <StrategyCardLevel>
                <LevelIcon level={level} />
              </StrategyCardLevel>
            )}
            <StrategyCardTitle>
              <LearnStrategyLink object={record} />
            </StrategyCardTitle>
            {record.description && (
              <StrategyCardDescription>
                {record.description}
              </StrategyCardDescription>
            )}
            {record.CreatedBy && (
              <StrategyCardAuthor>
                <UserLink user={record.CreatedBy} size="small" />
              </StrategyCardAuthor>
            )}
            {memberCount > 0 && (
              <StrategyCardMembers>
                <MembersCount count={memberCount} />
              </StrategyCardMembers>
            )}
          </StrategyCard>
        ))}
      </StrategiesGrid>
    </LearnStrategiesViewStyled>
  )
}
