import type * as React from 'react'
import type { DetailRecord } from '../../types/detail'
import { PostLink } from '../Link/Post'
import { UserLink } from '../Link/User'
import { Markdown } from '../Markdown'
import { DetailDate } from '../Detail/Date'
import { Meta } from '../Detail/styles'
import { PostStyled } from './styles'
export const Post: React.FC<{ record: DetailRecord; full?: boolean }> = ({
  record,
  full = false,
}) => (
  <PostStyled $full={full}>
    <div className="toolbar">
      {full ? (
        <h1 tabIndex={-1}>{record.title || 'Untitled'}</h1>
      ) : (
        <PostLink object={record}>
          <h2>{record.title || 'Untitled'}</h2>
        </PostLink>
      )}
      <span className="status">{record.status}</span>
    </div>
    {!full && record.description && <p>{record.description}</p>}
    <Meta>
      {record.CreatedBy && <UserLink user={record.CreatedBy} />}
      <DetailDate value={record.createdAt} />
    </Meta>
    {full ? (
      <Markdown>{record.content}</Markdown>
    ) : (
      <p className="intro">{record.intro}</p>
    )}
  </PostStyled>
)
