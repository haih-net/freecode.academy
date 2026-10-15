import type * as React from 'react'
import type { UserSkill } from '../../../../types/detail'
import { TechnologyLink } from '../../../../components/Link/Technology'
import { DetailDate } from '../../../../components/Detail/Date'
import { Grid, Header, Cell, Row, Label, Level, Chip, Dates } from './styles'
const statuses: Record<string, [string, string, string]> = {
  ActiveUse: ['Active Use', '#166534', '#dcfce7'],
  Study: ['Studying', '#1e40af', '#dbeafe'],
  PlanToStudy: ['Plan to Study', '#6b21a8', '#f3e8ff'],
  RarelyUse: ['Rarely Use', '#92400e', '#fef3c7'],
  NoLongerUse: ['No Longer Use', '#6b7280', '#f3f4f6'],
  RefusedToStudy: ['Refused', '#991b1b', '#fee2e2'],
  Active: ['Open to Work', '#166534', '#dcfce7'],
  Neutral: ['Neutral', '#6b7280', '#f3f4f6'],
  Negative: ['Not Looking', '#991b1b', '#fee2e2'],
}
const SkillStatus: React.FC<{ status: string | null }> = ({ status }) => {
  if (!status) {
    return null
  }
  const [label, color, bg] = statuses[status] || [status, '#6b7280', '#f3f4f6']
  return (
    <Chip $color={color} $bg={bg}>
      {label}
    </Chip>
  )
}
export const UserSkills: React.FC<{ skills: UserSkill[] }> = ({ skills }) => (
  <Grid>
    <Header>
      {['Технология', 'Уровень', 'Период', 'Статус', 'Найм'].map((h) => (
        <Cell key={h}>{h}</Cell>
      ))}
    </Header>
    {skills.map((s) => (
      <Row key={s.id}>
        <Cell>
          <TechnologyLink object={{ id: s.technologyId, name: s.name }} />
        </Cell>
        <Cell>
          <Label>Уровень:</Label>
          <Level $level={s.level || 0}>{s.level ?? '—'}</Level>
        </Cell>
        <Cell>
          <Label>Период:</Label>
          <Dates>
            {s.dateFrom ? (
              <DetailDate value={s.dateFrom} format="datePadded" />
            ) : (
              '—'
            )}
            <span>→</span>
            {s.dateTill ? (
              <DetailDate value={s.dateTill} format="datePadded" />
            ) : (
              'Сейчас'
            )}
          </Dates>
        </Cell>
        <Cell>
          <SkillStatus status={s.status} />
        </Cell>
        <Cell>
          <SkillStatus status={s.hiringStatus} />
        </Cell>
      </Row>
    ))}
  </Grid>
)
