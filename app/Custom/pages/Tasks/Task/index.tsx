import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { ProjectLink } from '../../../components/Link/Project'
import { TaskStatusBadge } from '../../../components/TaskStatusBadge'
import { DetailDate } from '../../../components/Detail/Date'
import { WorkLogCard } from '../../../components/WorkLogCard'
import { TaskStyled, TaskCard, Title, DateStyled, Description } from './styles'
export const TaskPage: React.FC = () => {
  const { record: task, project, worklogs } = useLoaderData<DetailPageData>()
  return (
    <TaskStyled>
      <TaskCard>
        <Title tabIndex={-1}>
          {task.title}
          {project && <ProjectLink object={project} />}
        </Title>
        {task.status && (
          <div>
            <TaskStatusBadge status={task.status} />
          </div>
        )}
        <DateStyled>
          <DetailDate value={task.createdAt} format="dateShort" />
        </DateStyled>
        {task.description && (
          <Description>
            <Markdown>{task.description}</Markdown>
          </Description>
        )}
        <Markdown>{task.content}</Markdown>
      </TaskCard>
      {worklogs.map((log) => (
        <WorkLogCard key={log.id} workLog={log} />
      ))}
    </TaskStyled>
  )
}
