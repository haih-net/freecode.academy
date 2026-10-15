import { builder } from '../../builder'
import type {
  KnowledgePageData,
  KbConceptFragment,
  KbKnowledgeSpaceFragment,
  KbFactFragment,
  KbFactParticipationFragment,
  KbFactProjectionFragment,
} from '../../../../app/Custom/types/knowledge'
const Concept = builder
  .objectRef<KbConceptFragment>('KnowledgeConcept')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      name: t.exposeString('name'),
      type: t.exposeString('type'),
      description: t.exposeString('description'),
      content: t.exposeString('content'),
    }),
  })
const Space = builder
  .objectRef<KbKnowledgeSpaceFragment>('KnowledgeSpace')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      name: t.exposeString('name'),
      type: t.exposeString('type'),
      description: t.exposeString('description'),
    }),
  })
const Fact = builder.objectRef<KbFactFragment>('KnowledgeFact').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    type: t.exposeString('type'),
    statement: t.exposeString('statement'),
    confidence: t.exposeFloat('confidence'),
    status: t.exposeString('status'),
    source: t.exposeString('source'),
    validFrom: t.exposeString('validFrom'),
  }),
})
const Participation = builder
  .objectRef<KbFactParticipationFragment>('KnowledgeParticipation')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      conceptId: t.exposeString('conceptId', { nullable: false }),
      factId: t.exposeString('factId', { nullable: false }),
      role: t.exposeString('role'),
      impact: t.exposeString('impact'),
      value: t.exposeString('value'),
      localImportance: t.exposeFloat('localImportance'),
    }),
  })
const Projection = builder
  .objectRef<KbFactProjectionFragment>('KnowledgeProjection')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', { nullable: false }),
      factId: t.exposeString('factId', { nullable: false }),
      knowledgeSpaceId: t.exposeString('knowledgeSpaceId', { nullable: false }),
      visibility: t.exposeString('visibility'),
      trustLevel: t.exposeFloat('trustLevel'),
      importance: t.exposeFloat('importance'),
      notes: t.exposeString('notes'),
    }),
  })
const Page = builder.objectRef<KnowledgePageData>('KnowledgePage').implement({
  fields: (t) => ({
    concepts: t.field({
      type: [Concept],
      nullable: false,
      resolve: (r) => r.concepts,
    }),
    spaces: t.field({
      type: [Space],
      nullable: false,
      resolve: (r) => r.spaces,
    }),
    facts: t.field({
      type: [Fact],
      nullable: false,
      resolve: (r) => r.facts,
    }),
    participations: t.field({
      type: [Participation],
      nullable: false,
      resolve: (r) => r.participations,
    }),
    projections: t.field({
      type: [Projection],
      nullable: false,
      resolve: (r) => r.projections,
    }),
  }),
})
builder.queryField('knowledgePage', (t) =>
  t.field({
    type: Page,
    nullable: false,
    resolve: async (_, __, { db }): Promise<KnowledgePageData> => {
      const concepts = await db<KbConceptFragment>('KBConcept')
        .select('id', 'name', 'type', 'description', 'content')
        .where('visibility', 'public')
        .orderBy('createdAt')
        .limit(10)
      const spaces = await db<KbKnowledgeSpaceFragment>('KBKnowledgeSpace')
        .select('id', 'name', 'type', 'description')
        .where('type', 'public')
        .orderBy('createdAt')
        .limit(10)
      const projections = await db<KbFactProjectionFragment>('KBFactProjection')
        .select(
          'id',
          'factId',
          'knowledgeSpaceId',
          'visibility',
          'trustLevel',
          'importance',
          'notes',
        )
        .where('visibility', 'visible')
        .whereIn(
          'knowledgeSpaceId',
          spaces.map((s) => s.id),
        )
        .orderBy('createdAt')
        .limit(10)
      const rows = await db<
        Omit<KbFactFragment, 'validFrom'> & { validFrom: Date | null }
      >('KBFact')
        .select(
          'id',
          'type',
          'statement',
          'confidence',
          'status',
          'source',
          'validFrom',
        )
        .whereIn(
          'id',
          projections.map((p) => p.factId),
        )
        .orderBy('createdAt')
        .limit(10)
      const facts: KbFactFragment[] = rows.map((r) => ({
        ...r,
        validFrom: r.validFrom?.toISOString() ?? null,
      }))
      const participations = await db<KbFactParticipationFragment>(
        'KBFactParticipation',
      )
        .select(
          'id',
          'conceptId',
          'factId',
          'role',
          'impact',
          'value',
          'localImportance',
        )
        .whereIn(
          'conceptId',
          concepts.map((c) => c.id),
        )
        .whereIn(
          'factId',
          facts.map((f) => f.id),
        )
        .orderBy('createdAt')
        .limit(10)
      return { concepts, spaces, facts, participations, projections }
    },
  }),
)
