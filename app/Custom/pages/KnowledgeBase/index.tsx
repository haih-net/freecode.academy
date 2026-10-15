import React, { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import type { KnowledgePageData } from '../../types/knowledge'
import { ViewStyled, SectionStyled, NestedListStyled } from './styles'
import { SpaceCard } from './SpaceCard'
import { ConceptCard } from './ConceptCard'
import { FactCard } from './FactCard'
import { EnrichedConcept, EnrichedFact } from './interfaces'

export const KnowledgeBasePage: React.FC = () => {
  const { concepts, facts, participations, spaces, projections } =
    useLoaderData<KnowledgePageData>()

  const enrichedData = useMemo(() => {
    const enrichedFacts: Map<string, EnrichedFact> = new Map()

    facts.forEach((fact) => {
      if (fact.id) {
        enrichedFacts.set(fact.id, {
          fact,
          participations: participations.filter((p) => p.factId === fact.id),
          projections: projections.filter((p) => p.factId === fact.id),
        })
      }
    })

    const enrichedConcepts: EnrichedConcept[] = concepts.map((concept) => ({
      concept,
      participatingFacts: participations
        .filter((p) => p.conceptId === concept.id)
        .map((p) => enrichedFacts.get(p.factId || ''))
        .filter((f) => f !== undefined),
    }))

    return {
      concepts: enrichedConcepts,
      facts: Array.from(enrichedFacts.values()),
      spaces,
    }
  }, [concepts, facts, participations, spaces, projections])

  return (
    <ViewStyled>
      <h1>Knowledge Base</h1>

      <SectionStyled>
        <h2>Knowledge Spaces ({enrichedData.spaces.length})</h2>
        {enrichedData.spaces.length > 0 ? (
          <NestedListStyled>
            {enrichedData.spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </NestedListStyled>
        ) : (
          <p>No knowledge spaces found</p>
        )}
      </SectionStyled>

      <SectionStyled>
        <h2>Concepts ({enrichedData.concepts.length})</h2>
        {enrichedData.concepts.length > 0 ? (
          <NestedListStyled>
            {enrichedData.concepts.map((enriched) => (
              <ConceptCard key={enriched.concept.id} enriched={enriched} />
            ))}
          </NestedListStyled>
        ) : (
          <p>No concepts found</p>
        )}
      </SectionStyled>

      <SectionStyled>
        <h2>All Facts ({enrichedData.facts.length})</h2>
        {enrichedData.facts.length > 0 ? (
          <NestedListStyled>
            {enrichedData.facts.map((enrichedFact) => (
              <FactCard
                key={enrichedFact.fact.id}
                enrichedFact={enrichedFact}
                showSource
              />
            ))}
          </NestedListStyled>
        ) : (
          <p>No facts found</p>
        )}
      </SectionStyled>
    </ViewStyled>
  )
}
