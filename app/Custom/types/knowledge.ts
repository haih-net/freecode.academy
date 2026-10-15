export interface KbConceptFragment {
  id: string
  name: string | null
  type: string | null
  description: string | null
  content: string | null
}
export interface KbKnowledgeSpaceFragment {
  id: string
  name: string | null
  type: string | null
  description: string | null
}
export interface KbFactFragment {
  id: string
  type: string | null
  statement: string | null
  confidence: number | null
  status: string | null
  source: string | null
  validFrom: string | null
}
export interface KbFactParticipationFragment {
  id: string
  conceptId: string
  factId: string
  role: string | null
  impact: string | null
  value: string | null
  localImportance: number | null
}
export interface KbFactProjectionFragment {
  id: string
  factId: string
  knowledgeSpaceId: string
  visibility: string | null
  trustLevel: number | null
  importance: number | null
  notes: string | null
}
export interface KnowledgePageData {
  concepts: KbConceptFragment[]
  spaces: KbKnowledgeSpaceFragment[]
  facts: KbFactFragment[]
  participations: KbFactParticipationFragment[]
  projections: KbFactProjectionFragment[]
}
