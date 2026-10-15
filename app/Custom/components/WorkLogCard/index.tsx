import type * as React from 'react'
import type { DetailRecord } from '../../types/detail'
import { Markdown } from '../Markdown'
import { UserLink } from '../Link/User'
import { TaskWorkLogLink } from '../Link/TaskWorkLog'
import { DetailDate } from '../Detail/Date'
import { WorkLogStyled, WorkLogMeta } from './styles'
export const WorkLogCard: React.FC<{
  workLog: DetailRecord
  full?: boolean
}> = ({ workLog, full = false }) => (
  <WorkLogStyled>
    <WorkLogMeta>
      <div>{workLog.CreatedBy && <UserLink user={workLog.CreatedBy} />}</div>
      {full ? (
        <DetailDate value={workLog.createdAt} time />
      ) : (
        <TaskWorkLogLink taskWorkLog={workLog} />
      )}
    </WorkLogMeta>
    <Markdown>{workLog.content}</Markdown>
  </WorkLogStyled>
)
