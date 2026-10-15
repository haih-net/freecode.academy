import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { UserLink } from '../../../components/Link/User'
import { ResourceLink } from '../../../components/Link/Resource'
import { DetailDate } from '../../../components/Detail/Date'
import { DetailContainer, Meta, Stack } from '../../../components/Detail/styles'
import { Pagination } from '../../../components/Pagination'
import { TopicStyled, Title, Comments, Comment, BlogEntry } from './styles'
export const TopicView: React.FC<{ data: DetailPageData }> = ({ data }) => {
  const { record, comments, children, page, totalPages } = data
  return (
    <DetailContainer>
      <Stack>
        <TopicStyled>
          <Title tabIndex={-1}>{record.name}</Title>
          <Meta>
            {record.CreatedBy && <UserLink user={record.CreatedBy} />}
            <DetailDate value={record.createdAt} />
          </Meta>
          <Markdown>{record.content}</Markdown>
        </TopicStyled>
        {children.map((child) => (
          <BlogEntry key={child.id}>
            <ResourceLink resource={child} />
            <Meta>
              {child.CreatedBy && <UserLink user={child.CreatedBy} />}
              <DetailDate value={child.createdAt} />
            </Meta>
            <Markdown>{child.intro}</Markdown>
          </BlogEntry>
        ))}
        <Pagination currentPage={page} totalPages={totalPages} />
        {comments.length > 0 && (
          <Comments>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <Comment id={comment.id} key={comment.id}>
                <Meta>
                  {comment.CreatedBy && <UserLink user={comment.CreatedBy} />}
                  <ResourceLink resource={comment}>
                    <DetailDate value={comment.createdAt} />
                  </ResourceLink>
                </Meta>
                <Markdown>{comment.content}</Markdown>
              </Comment>
            ))}
          </Comments>
        )}
      </Stack>
    </DetailContainer>
  )
}

export const TopicPage: React.FC = () => (
  <TopicView data={useLoaderData<DetailPageData>()} />
)
