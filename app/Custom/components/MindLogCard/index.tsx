import type * as React from 'react'
import type { DetailRecord } from '../../types/detail'
import { MindLogLink } from '../Link/MindLog'
import { Markdown } from '../Markdown'
import { DetailDate } from '../Detail/Date'
import { MindLogStyled } from './styles'
export const MindLogCard: React.FC<{ record: DetailRecord }> = ({ record }) => (
  <MindLogStyled>
    <MindLogLink object={record}>
      <strong>{record.type}</strong>
      <DetailDate value={record.createdAt} time />
    </MindLogLink>
    <Markdown>{record.content}</Markdown>
  </MindLogStyled>
)
