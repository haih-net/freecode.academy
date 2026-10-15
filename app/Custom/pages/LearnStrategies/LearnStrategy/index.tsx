import { LevelIcon } from '../../../components/LevelIcon'
import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData, LibraryItem } from '../../../types/library'
import { LearnStrategyLink } from '../../../components/Link/LearnStrategy'
import { TechnologyLink } from '../../../components/Link/Technology'
import { VisuallyHiddenTitle } from '../../../components/Page/styles'
import {
  LearnStrategyViewStyled,
  LearnStrategyViewToolbarStyled,
  LearnStrategyTitle,
  LearnStrategyLevel,
  LearnStrategyChildrenContainer,
} from './styles'
const StrategyTree: React.FC<{
  item: LibraryItem
  data: LibraryPageData
  seen: string[]
}> = ({ item, data, seen }) => {
  const id = item.record.id
  if (seen.includes(id)) {
    return null
  }
  const stages = data.stages.filter((s) => s.strategyId === id)
  return (
    <LearnStrategyViewStyled>
      <LearnStrategyViewToolbarStyled>
        {item.level && (
          <LearnStrategyLevel>
            <LevelIcon level={item.level} />
          </LearnStrategyLevel>
        )}
        <LearnStrategyTitle>
          <LearnStrategyLink object={item.record} />
        </LearnStrategyTitle>
      </LearnStrategyViewToolbarStyled>
      <LearnStrategyChildrenContainer>
        {stages
          .filter(
            (s): s is typeof s & { technologyId: string } => !!s.technologyId,
          )
          .map((s) => (
            <div key={s.id}>
              {s.level && <span>{s.level} </span>}
              <TechnologyLink object={{ id: s.technologyId, name: s.name }} />
            </div>
          ))}
        {stages
          .filter((s) => s.targetId)
          .map((s) => {
            const child = data.related.find((i) => i.record.id === s.targetId)
            return child ? (
              <StrategyTree
                key={s.id}
                item={child}
                data={data}
                seen={[...seen, id]}
              />
            ) : null
          })}
      </LearnStrategyChildrenContainer>
    </LearnStrategyViewStyled>
  )
}
export const LearnStrategyPage: React.FC = () => {
  const data = useLoaderData<LibraryPageData>()
  return data.record ? (
    <>
      <VisuallyHiddenTitle tabIndex={-1}>
        {data.record.record.name}
      </VisuallyHiddenTitle>
      <StrategyTree item={data.record} data={data} seen={[]} />
    </>
  ) : null
}
