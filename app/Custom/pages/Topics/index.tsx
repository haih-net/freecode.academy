import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { ResourceLink } from '../../components/Link/Resource'
import { UserLink } from '../../components/Link/User'
import { TopicsStyled, TopicStyled, MetaStyled, ContentStyled } from './styles'
export const TopicsPage: React.FC = () => {
  const { items, page, totalPages } = useLoaderData<MenuPageData>()
  return (
    <TopicsStyled>
      <h1 tabIndex={-1} className="visually-hidden">
        Топики
      </h1>
      {items.map((item) => (
        <TopicStyled key={item.id}>
          <ResourceLink resource={item} />
          <MetaStyled>
            {item.CreatedBy && <UserLink user={item.CreatedBy} />}
            <time dateTime={item.createdAt}>
              {new Intl.DateTimeFormat('ru-RU', {
                dateStyle: 'medium',
                timeZone: 'UTC',
              }).format(new Date(item.createdAt))}
            </time>
          </MetaStyled>
          <ContentStyled>
            <Markdown>{item.intro}</Markdown>
          </ContentStyled>
        </TopicStyled>
      ))}
      {items.length === 0 && <p>Пока нет опубликованных топиков.</p>}
      <Pagination currentPage={page} totalPages={totalPages} />
    </TopicsStyled>
  )
}
