import { builder } from '../../builder'
import { detailKinds } from '../../../../app/Custom/types/detail'
import type {
  DetailRecord,
  DetailPageData,
  UserSkill,
  CatalogInfo,
} from '../../../../app/Custom/types/detail'
import type { PublicAuthor } from '../../../../app/Custom/types/menu'
import { loadDetailPage } from './queries'

const Kind = builder.enumType('DetailKind', { values: detailKinds })
const Author = builder.objectRef<PublicAuthor>('DetailAuthor').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    username: t.exposeString('username'),
    fullname: t.exposeString('fullname'),
    image: t.exposeString('image'),
  }),
})
const Resource = builder
  .objectRef<{ uri: string | null }>('DetailResourceLink')
  .implement({ fields: (t) => ({ uri: t.exposeString('uri') }) })
export const DetailRecordType = builder
  .objectRef<DetailRecord>('DetailRecord')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      name: t.exposeString('name'),
      title: t.exposeString('title'),
      username: t.exposeString('username'),
      fullname: t.exposeString('fullname'),
      image: t.exposeString('image'),
      intro: t.exposeString('intro'),
      description: t.exposeString('description'),
      content: t.exposeString('content'),
      status: t.exposeString('status'),
      uri: t.exposeString('uri'),
      type: t.exposeString('type'),
      published: t.exposeBoolean('published', { nullable: false }),
      createdAt: t.exposeString('createdAt', { nullable: false }),
      updatedAt: t.exposeString('updatedAt', { nullable: false }),
      joinedAt: t.exposeString('joinedAt'),
      CreatedBy: t.field({ type: Author, resolve: (r) => r.CreatedBy }),
      Resource: t.field({ type: Resource, resolve: (r) => r.Resource }),
    }),
  })
const Skill = builder.objectRef<UserSkill>('DetailUserSkill').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    technologyId: t.exposeID('technologyId', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    level: t.exposeInt('level'),
    status: t.exposeString('status'),
    hiringStatus: t.exposeString('hiringStatus'),
    dateFrom: t.exposeString('dateFrom'),
    dateTill: t.exposeString('dateTill'),
  }),
})
const Catalog = builder.objectRef<CatalogInfo>('CatalogInfo').implement({
  fields: (t) => ({
    website: t.exposeString('website'),
    address: t.exposeString('address'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone'),
    image: t.exposeString('image'),
  }),
})
export const DetailPageType = builder
  .objectRef<DetailPageData>('DetailPage')
  .implement({
    fields: (t) => ({
      catalog: t.field({ type: Catalog, resolve: (r) => r.catalog }),
      record: t.field({
        type: DetailRecordType,
        nullable: false,
        resolve: (r) => r.record,
      }),
      project: t.field({ type: DetailRecordType, resolve: (r) => r.project }),
      task: t.field({ type: DetailRecordType, resolve: (r) => r.task }),
      members: t.field({
        type: [DetailRecordType],
        nullable: false,
        resolve: (r) => r.members,
      }),
      skills: t.field({
        type: [Skill],
        nullable: false,
        resolve: (r) => r.skills,
      }),
      tasks: t.field({
        type: [DetailRecordType],
        nullable: false,
        resolve: (r) => r.tasks,
      }),
      worklogs: t.field({
        type: [DetailRecordType],
        nullable: false,
        resolve: (r) => r.worklogs,
      }),
      comments: t.field({
        type: [DetailRecordType],
        nullable: false,
        resolve: (r) => r.comments,
      }),
      children: t.field({
        type: [DetailRecordType],
        nullable: false,
        resolve: (r) => r.children,
      }),
      relatedCount: t.exposeInt('relatedCount', { nullable: false }),
      page: t.exposeInt('page', { nullable: false }),
      totalPages: t.exposeInt('totalPages', { nullable: false }),
    }),
  })
builder.queryField('detailPage', (t) =>
  t.field({
    type: DetailPageType,
    args: {
      kind: t.arg({ type: Kind, required: true }),
      id: t.arg.string(),
      username: t.arg.string(),
      uri: t.arg.string(),
      page: t.arg.int({ defaultValue: 1 }),
    },
    resolve: (_, args, ctx) =>
      loadDetailPage(
        ctx.db,
        args.kind,
        args.id,
        args.username,
        args.uri,
        args.page ?? 1,
      ),
  }),
)
