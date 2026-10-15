import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { UserLink } from '../../../components/Link/User'
import { Markdown } from '../../../components/Markdown'
import { getResizedImagePath } from '../../../helpers/getResizedImagePath'
import { DetailContainer } from '../../../components/Detail/styles'
import { CatalogResourceStyled } from './styles'
export const CatalogResourcePage: React.FC = () => {
  const { record, catalog } = useLoaderData<DetailPageData>()
  return (
    <DetailContainer>
      <CatalogResourceStyled>
        <h1 tabIndex={-1}>{record.name}</h1>
        {record.type === 'Project' ? (
          <>
            {record.CreatedBy && <UserLink user={record.CreatedBy} />}{' '}
            {catalog?.image && (
              <img
                src={getResizedImagePath({
                  path: catalog.image,
                  size: 'middle',
                })}
                alt={record.name || ''}
              />
            )}
          </>
        ) : (
          <>
            {record.status && <div>Team status: {record.status}</div>}
            {catalog?.website && (
              <a
                href={catalog.website}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {catalog.website}
              </a>
            )}
            {catalog?.address && <div>{catalog.address}</div>}
            {catalog?.email && (
              <a href={`mailto:${catalog.email}`}>{catalog.email}</a>
            )}
            {catalog?.phone?.split(',').map((p) => (
              <a key={p} href={`tel:${p.trim()}`}>
                {p.trim()}
              </a>
            ))}
            <Markdown>{record.content}</Markdown>
          </>
        )}
      </CatalogResourceStyled>
    </DetailContainer>
  )
}
