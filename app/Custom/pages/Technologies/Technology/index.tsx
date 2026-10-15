import { getUserTechnologyLevelText } from '../../../helpers/getUserTechnologyLevelText'
import { getUserTechnologyStatusText } from '../../../helpers/getUserTechnologyStatusText'
import { getUserTechnologyHiringStatusText } from '../../../helpers/getUserTechnologyHiringStatusText'
import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
import { Markdown } from '../../../components/Markdown'
import { UserLink } from '../../../components/Link/User'
import { LearnStrategyLink } from '../../../components/Link/LearnStrategy'
import { FormattedDate } from '../../../components/FormattedDate'
import { TechnologyStyled, TableScroll } from './styles'
export const TechnologyPage: React.FC = () => {
  const { record: item, members, related } = useLoaderData<LibraryPageData>()
  if (!item) {
    return null
  }
  const { record, hours, siteUrl } = item
  return (
    <TechnologyStyled>
      <div>
        <h1 tabIndex={-1}>{record.name}</h1>
        {record.description && <p>{record.description}</p>}
        {siteUrl && (
          <a href={siteUrl} target="_blank" rel="noreferrer">
            {siteUrl}
          </a>
        )}
        <Markdown>{record.content}</Markdown>
      </div>
      {hours.some(Boolean) && (
        <section>
          <h3>Примерное время освоения</h3>
          {hours
            .map((h, i) => ({ hours: h, level: i + 1 }))
            .map(({ hours: h, level }) =>
              h ? (
                <div key={level}>
                  Уровень {level}: {h} час
                </div>
              ) : null,
            )}
        </section>
      )}
      {related.length > 0 && (
        <section>
          <h2>Стратегии развития</h2>
          {related.map((s) => (
            <div key={s.record.id}>
              <LearnStrategyLink object={s.record} />
            </div>
          ))}
        </section>
      )}
      <section>
        <p>Кто использует</p>
        <TableScroll>
          <table>
            <thead>
              <tr>
                {[
                  'Пользователь',
                  'Уровень',
                  'Статус',
                  'Готовность к найму',
                  'Менторство',
                  'Используется С',
                  'Используется До',
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <UserLink user={m.user} />
                  </td>
                  <td>{m.level ? getUserTechnologyLevelText(m.level) : ''}</td>
                  <td>
                    {m.status ? getUserTechnologyStatusText(m.status) : ''}
                  </td>
                  <td>
                    {m.hiringStatus
                      ? getUserTechnologyHiringStatusText(m.hiringStatus)
                      : ''}
                  </td>
                  <td>{m.isMentor ? 'Да' : ''}</td>
                  <td>
                    <FormattedDate value={m.dateFrom} />
                  </td>
                  <td>
                    <FormattedDate value={m.dateTill} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </section>
    </TechnologyStyled>
  )
}
