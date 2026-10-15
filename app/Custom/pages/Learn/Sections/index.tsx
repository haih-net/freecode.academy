import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
import { SectionLink } from '../../../components/Link/Section'
import { ChallengeLink } from '../../../components/Link/Challenge'
import { VisuallyHiddenTitle } from '../../../components/Page/styles'
import { Block } from './styles'
export const SectionsPage: React.FC = () => {
  const { record, items, related } = useLoaderData<LibraryPageData>()
  return (
    <section>
      <VisuallyHiddenTitle tabIndex={-1}>
        {record?.record.name || 'Coding Challenges'}
      </VisuallyHiddenTitle>
      {record ? (
        <Block>
          <SectionLink object={record.record} className="title">
            ↴ {record.record.name}
          </SectionLink>
          {items.map((c) => (
            <div className="challenge" key={c.record.id}>
              <ChallengeLink object={c.record} />
            </div>
          ))}
          {related.map((b) => (
            <Block className="nested" key={b.record.id}>
              <SectionLink object={b.record} className="title">
                ↳ {b.record.name}
              </SectionLink>
            </Block>
          ))}
        </Block>
      ) : (
        <>
          <p>Тестовые задания по HTML, CSS, Javascript</p>
          {items.map((b) => (
            <Block key={b.record.id}>
              <SectionLink object={b.record} className="title">
                ↳ {b.record.name}
              </SectionLink>
            </Block>
          ))}
        </>
      )}
    </section>
  )
}
