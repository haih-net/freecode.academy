import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { getResizedImagePath } from '../../../helpers/getResizedImagePath'
import { TeamStyled } from './styles'
import { TeamMembers } from './Members'
export const TeamPage: React.FC = () => {
  const { record: team, members } = useLoaderData<DetailPageData>()
  return (
    <TeamStyled>
      <h1 tabIndex={-1}>{team.title}</h1>
      {team.image && (
        <div>
          <img
            src={getResizedImagePath({ path: team.image, size: 'middle' })}
            alt={team.title || ''}
          />
        </div>
      )}
      <Markdown>{team.content}</Markdown>
      <TeamMembers members={members} />
    </TeamStyled>
  )
}
