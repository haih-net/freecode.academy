import type { MetaFunction } from 'react-router'
import {
  createSeoMeta,
  unavailableSeoMeta,
} from '../../../components/seo/SeoHeaders'
import type { DetailKind, DetailPageData } from '../../types/detail'
import { createUserLink } from '../../components/Link/User'
import { makeProjectLink } from '../../components/Link/Project'

export const detailMeta =
  (kind: DetailKind): MetaFunction =>
  ({ loaderData: data, error }) => {
    if (error || !data) {
      return unavailableSeoMeta()
    }
    const { record, task } = data as DetailPageData
    const path =
      kind === 'user'
        ? createUserLink(record)
        : kind === 'project'
          ? makeProjectLink(record)
          : kind === 'resource'
            ? (record.uri ?? undefined)
            : `/${{ team: 'teams', offer: 'offers', task: 'tasks', worklog: 'worklogs' }[kind]}/${record.id}`
    return createSeoMeta({
      title:
        kind === 'user'
          ? [record.fullname, record.username].filter(Boolean).join(' | ') ||
            record.id
          : kind === 'worklog'
            ? `Work Log.${task ? ` Task: ${task.title}` : ''}`
            : record.title || record.id,
      description: record.description || record.intro || '',
      path,
      noindex:
        !record.published ||
        (kind === 'user' && record.status?.toLowerCase() !== 'active'),
    })
  }
