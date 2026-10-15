import { builder } from '../../builder'
import { menuSections } from '../../../../app/Custom/types/menu'
import type {
  MenuItem,
  MenuPageData,
  PublicAuthor,
} from '../../../../app/Custom/types/menu'
import { loadMenuPage } from './queries'

const Section = builder.enumType('MenuSection', { values: menuSections })
const Author = builder.objectRef<PublicAuthor>('MenuAuthor').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    username: t.exposeString('username'),
    fullname: t.exposeString('fullname'),
    image: t.exposeString('image'),
  }),
})
const Resource = builder
  .objectRef<{ uri: string | null }>('MenuResource')
  .implement({ fields: (t) => ({ uri: t.exposeString('uri') }) })
const Item = builder.objectRef<MenuItem>('MenuItem').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    name: t.exposeString('name'),
    title: t.exposeString('title'),
    username: t.exposeString('username'),
    fullname: t.exposeString('fullname'),
    image: t.exposeString('image'),
    intro: t.exposeString('intro'),
    description: t.exposeString('description'),
    status: t.exposeString('status'),
    uri: t.exposeString('uri'),
    createdAt: t.exposeString('createdAt', { nullable: false }),
    CreatedBy: t.field({ type: Author, resolve: (row) => row.CreatedBy }),
    Resource: t.field({ type: Resource, resolve: (row) => row.Resource }),
  }),
})
const Page = builder.objectRef<MenuPageData>('MenuPage').implement({
  fields: (t) => ({
    items: t.field({
      type: [Item],
      nullable: false,
      resolve: (page) => page.items,
    }),
    page: t.exposeInt('page', { nullable: false }),
    count: t.exposeInt('count', { nullable: false }),
    limit: t.exposeInt('limit', { nullable: false }),
    totalPages: t.exposeInt('totalPages', { nullable: false }),
  }),
})
builder.queryField('menuPage', (t) =>
  t.field({
    type: Page,
    nullable: false,
    args: {
      section: t.arg({ type: Section, required: true }),
      page: t.arg.int({ defaultValue: 1 }),
      status: t.arg.string(),
      projectId: t.arg.string(),
    },
    resolve: (_, args, ctx) =>
      loadMenuPage(
        ctx.db,
        args.section,
        args.page ?? 1,
        args.status,
        args.projectId,
      ),
  }),
)
