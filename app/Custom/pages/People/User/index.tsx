import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { getResizedImagePath } from '../../../helpers/getResizedImagePath'
import { DetailContainer, Status } from '../../../components/Detail/styles'
import { UserPageStyled, Toolbar, Avatar, Info } from './styles'
import { UserSkills } from './Skills'
export const UserPage: React.FC = () => {
  const { record: user, skills } = useLoaderData<DetailPageData>()
  return (
    <DetailContainer>
      <UserPageStyled>
        <Toolbar>
          <h1 tabIndex={-1}>{user.fullname || user.username || user.id}</h1>
          {user.status && <Status $status={user.status}>{user.status}</Status>}
        </Toolbar>
        <Info>
          {user.image && (
            <Avatar
              src={getResizedImagePath({ path: user.image, size: 'avatar' })}
              alt={user.fullname || user.username || ''}
            />
          )}
          <Markdown>{user.content}</Markdown>
        </Info>
        {skills.length > 0 && <UserSkills skills={skills} />}
      </UserPageStyled>
    </DetailContainer>
  )
}
