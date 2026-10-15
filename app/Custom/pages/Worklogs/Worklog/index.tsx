import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { WorkLogCard } from '../../../components/WorkLogCard'
import { TaskLink } from '../../../components/Link/Task'
import { VisuallyHiddenTitle } from '../../../components/Page/styles'
import { WorklogPageStyled } from './styles'
export const WorklogPage: React.FC = () => {
  const { record, task } = useLoaderData<DetailPageData>()
  return (
    <WorklogPageStyled>
      <VisuallyHiddenTitle tabIndex={-1}>Worklog</VisuallyHiddenTitle>
      <WorkLogCard workLog={record} full />
      {task && (
        <div>
          Task: <TaskLink task={task} />
        </div>
      )}
    </WorklogPageStyled>
  )
}
