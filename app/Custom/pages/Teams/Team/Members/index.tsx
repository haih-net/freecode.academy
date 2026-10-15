import type * as React from 'react'
import type { DetailRecord } from '../../../../types/detail'
import { DetailDate } from '../../../../components/Detail/Date'
import { UserLink } from '../../../../components/Link/User'
import { Markdown } from '../../../../components/Markdown'
import { Status } from '../../../../components/Detail/styles'
import { MembersStyled, Member, Toolbar } from './styles'
export const TeamMembers: React.FC<{ members: DetailRecord[] }> = ({
  members,
}) => (
  <MembersStyled>
    {members.map((user) => (
      <Member key={user.id}>
        <Toolbar>
          <UserLink user={user} />
          {user.joinedAt && (
            <DetailDate value={user.joinedAt} format="datePadded" />
          )}
          {user.status && <Status $status={user.status}>{user.status}</Status>}
        </Toolbar>
        {user.intro && <Markdown>{user.intro}</Markdown>}
      </Member>
    ))}
  </MembersStyled>
)
