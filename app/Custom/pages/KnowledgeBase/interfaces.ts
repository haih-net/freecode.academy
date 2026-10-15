import {
  KbConceptFragment,
  KbFactFragment,
  KbFactParticipationFragment,
  KbFactProjectionFragment,
} from '../../types/knowledge'

export interface EnrichedFact {
  fact: KbFactFragment
  participations: KbFactParticipationFragment[]
  projections: KbFactProjectionFragment[]
}

export interface EnrichedConcept {
  concept: KbConceptFragment
  participatingFacts: EnrichedFact[]
}
