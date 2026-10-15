import type * as React from 'react'
import type { DetailRecord } from '../../types/detail'
import { ResourceLink } from '../Link/Resource'
import { UserLink } from '../Link/User'
import { Markdown } from '../Markdown'
import { DetailDate } from '../Detail/Date'
import { Meta } from '../Detail/styles'
import { ResourceCardStyled } from './styles'
export const ResourceCard: React.FC<{ record: DetailRecord }> = ({
  record,
}) => (
  <ResourceCardStyled>
    <ResourceLink resource={record} />
    <Meta>
      {record.CreatedBy && <UserLink user={record.CreatedBy} />}
      <DetailDate value={record.createdAt} />
    </Meta>
    <Markdown>{record.intro}</Markdown>
  </ResourceCardStyled>
)
