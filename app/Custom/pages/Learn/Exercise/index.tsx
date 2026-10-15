import type * as React from 'react'
import { useLoaderData, useParams } from 'react-router'
import type { LibraryPageData } from '../../../types/library'
import { Markdown } from '../../../components/Markdown'
import { TopicView } from '../../Topics/Topic'
import { ExerciseStyled } from './styles'
export const ExercisePage: React.FC = () => {
  const { record, discussion } = useLoaderData<LibraryPageData>()
  const params = useParams()
  const discuss = params['*']?.split('/')[1] === 'discuss'
  if (!record) {
    return null
  }
  return (
    <ExerciseStyled>
      {discuss ? (
        discussion ? (
          <TopicView data={discussion} />
        ) : null
      ) : (
        <>
          <h1 tabIndex={-1}>{record.record.name}</h1>
          <Markdown>{record.record.description}</Markdown>
          <Markdown>{record.instructions}</Markdown>
        </>
      )}
    </ExerciseStyled>
  )
}
