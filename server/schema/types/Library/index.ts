import { builder } from '../../builder'
import { DetailRecordType, DetailPageType } from '../Detail'
import { libraryKinds } from '../../../../app/Custom/types/library'
import type {
  LibraryItem,
  LibraryPageData,
  LibraryMember,
  LibraryStage,
} from '../../../../app/Custom/types/library'
import type { PublicAuthor } from '../../../../app/Custom/types/menu'
import { loadLibrary } from './queries'
const Kind = builder.enumType('LibraryKind', { values: libraryKinds })
const Item = builder.objectRef<LibraryItem>('LibraryItem').implement({
  fields: (t) => ({
    record: t.field({
      type: DetailRecordType,
      nullable: false,
      resolve: (r) => r.record,
    }),
    memberCount: t.exposeInt('memberCount', { nullable: false }),
    level: t.exposeInt('level'),
    siteUrl: t.exposeString('siteUrl'),
    hours: t.field({
      type: ['Int'],
      nullable: { list: false, items: true },
      resolve: (r) => r.hours,
    }),
    parentId: t.exposeString('parentId'),
    instructions: t.exposeString('instructions'),
    topicId: t.exposeString('topicId'),
  }),
})
const Author = builder.objectRef<PublicAuthor>('LibraryAuthor').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    username: t.exposeString('username'),
    fullname: t.exposeString('fullname'),
    image: t.exposeString('image'),
  }),
})
const Member = builder.objectRef<LibraryMember>('LibraryMember').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    user: t.field({ type: Author, nullable: false, resolve: (r) => r.user }),
    level: t.exposeInt('level'),
    status: t.exposeString('status'),
    hiringStatus: t.exposeString('hiringStatus'),
    isMentor: t.exposeBoolean('isMentor', { nullable: false }),
    dateFrom: t.exposeString('dateFrom'),
    dateTill: t.exposeString('dateTill'),
  }),
})
const Stage = builder.objectRef<LibraryStage>('LibraryStage').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    strategyId: t.exposeString('strategyId', { nullable: false }),
    targetId: t.exposeString('targetId'),
    technologyId: t.exposeString('technologyId'),
    name: t.exposeString('name', { nullable: false }),
    level: t.exposeInt('level'),
  }),
})
const Page = builder.objectRef<LibraryPageData>('LibraryPage').implement({
  fields: (t) => ({
    items: t.field({
      type: [Item],
      nullable: false,
      resolve: (r) => r.items,
    }),
    record: t.field({ type: Item, resolve: (r) => r.record }),
    related: t.field({
      type: [Item],
      nullable: false,
      resolve: (r) => r.related,
    }),
    members: t.field({
      type: [Member],
      nullable: false,
      resolve: (r) => r.members,
    }),
    stages: t.field({
      type: [Stage],
      nullable: false,
      resolve: (r) => r.stages,
    }),
    discussion: t.field({
      type: DetailPageType,
      resolve: (r) => r.discussion,
    }),
    page: t.exposeInt('page', { nullable: false }),
    count: t.exposeInt('count', { nullable: false }),
    totalPages: t.exposeInt('totalPages', { nullable: false }),
  }),
})
builder.queryField('libraryPage', (t) =>
  t.field({
    type: Page,
    args: {
      kind: t.arg({ type: Kind, required: true }),
      page: t.arg.int({ defaultValue: 1 }),
      id: t.arg.string(),
      name: t.arg.string(),
      tab: t.arg.string(),
      topicId: t.arg.string(),
    },
    resolve: (_, args, ctx) =>
      loadLibrary(
        ctx.db,
        args.kind,
        args.page ?? 1,
        args.id,
        args.name,
        args.tab,
        args.topicId,
      ),
  }),
)
