import type * as React from 'react'
import { Link, useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { TaskLink } from '../../../components/Link/Task'
import { UserLink } from '../../../components/Link/User'
import { TaskStatusBadge } from '../../../components/TaskStatusBadge'
import {
  Grid,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardMeta,
} from '../../../components/Page/styles'
import taskImage from '../../Tasks/assets/tasks.jpg'
import { ProjectStyled, Title, TasksStyled, AllTasks } from './styles'
export const ProjectPage: React.FC = () => {
  const {
    record: project,
    tasks,
    relatedCount,
  } = useLoaderData<DetailPageData>()
  return (
    <ProjectStyled>
      <Title tabIndex={-1}>{project.name}</Title>
      <Markdown>{project.content}</Markdown>
      {tasks.length > 0 && (
        <TasksStyled>
          <Grid $cols={3}>
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardImg $src={taskImage} />
                <CardBody>
                  {task.status && (
                    <div>
                      <TaskStatusBadge status={task.status} />
                    </div>
                  )}
                  <TaskLink task={task}>
                    <CardTitle>{task.title}</CardTitle>
                  </TaskLink>
                  <Markdown>{task.description}</Markdown>
                  {task.CreatedBy && (
                    <CardMeta>
                      By <UserLink user={task.CreatedBy} />
                    </CardMeta>
                  )}
                </CardBody>
              </Card>
            ))}
          </Grid>
          {relatedCount > 3 && (
            <AllTasks>
              <Link to={`/tasks?projectId=${project.id}`}>
                View all {relatedCount} tasks
              </Link>
            </AllTasks>
          )}
        </TasksStyled>
      )}
    </ProjectStyled>
  )
}
