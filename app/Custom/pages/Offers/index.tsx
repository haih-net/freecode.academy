import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { UserLink } from '../../components/Link/User'
import { Badge } from '../../components/Badge'
import { BadgeRow } from '../../components/Badge/styles'
import { CrossCard, CrossLinks } from '../../components/CrossLinks/styles'
import { WhyItem, WhyStrip } from '../../components/WhyStrip/styles'
import {
  Card,
  CardBody,
  CardImg,
  CardMeta,
  CardTitle,
  Container,
  Eyebrow,
  Grid,
  H1,
  VisuallyHiddenTitle,
  H2,
  Hero,
  HeroImage,
  HeroInner,
  Section,
  SectionLede,
  Sub,
} from '../../components/Page/styles'
import { OfferLink } from '../../components/Link/Offer'
import { getResizedImagePath } from '../../helpers/getResizedImagePath'
import offersImg from './assets/offers.jpg'

export const OffersPage: React.FC = () => {
  const { items: offers, page, totalPages } = useLoaderData<MenuPageData>()
  const showContent = page < 2
  return (
    <>
      {!showContent && (
        <VisuallyHiddenTitle tabIndex={-1}>Предложения</VisuallyHiddenTitle>
      )}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Offers</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>
                  Anything you want to propose. In one format.
                </H1>
                <Sub>
                  An offer is a free-form proposal from a member. A service, a
                  collaboration, a research partnership, a hiring intent — same
                  simple structure: what it is, who it's from, why it exists.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Service</strong>
                  <span>Sell what you do, with a clear scope.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Collaboration</strong>
                  <span>Find a co-founder or build something together.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Research / Hiring</strong>
                  <span>Joint study, contract role, anything in between.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={offersImg}
                role="img"
                aria-label="Offers and proposals"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Open offers</H2>
              <SectionLede>
                Real proposals from real members. Click through to see the full
                pitch and (if you have access) write directly.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {offers.map((n) => {
              const { id, title, image, intro, CreatedBy } = n

              const kind: string = ''

              return (
                <Card key={id}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      offersImg
                    }
                  />
                  <CardBody>
                    {kind && (
                      <BadgeRow>
                        <Badge
                          tone={
                            kind === 'Service'
                              ? 'brand'
                              : kind === 'Collaboration'
                                ? 'blue'
                                : kind === 'Research'
                                  ? 'amber'
                                  : 'green'
                          }
                        >
                          {kind}
                        </Badge>
                        {/* {rate && <Badge>{rate}</Badge>} */}
                      </BadgeRow>
                    )}
                    <OfferLink offer={n}>
                      <CardTitle>{title}</CardTitle>
                    </OfferLink>
                    <Markdown>{intro}</Markdown>
                    {/* {author && (
                      <CardMeta>
                        By {author.name} · {author.role}
                      </CardMeta>
                    )} */}
                    {CreatedBy && (
                      <CardMeta>
                        By <UserLink user={CreatedBy} />
                      </CardMeta>
                    )}
                  </CardBody>
                </Card>
              )
            })}
          </Grid>

          {offers.length === 0 && <p>Записи не найдены.</p>}

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard to="/people">
                <strong>Behind every offer is a person →</strong>
                <span>Check who's writing before you reply.</span>
                <em>See members</em>
              </CrossCard>
              <CrossCard to="/teams">
                <strong>Team offers carry more weight →</strong>
                <span>A team can promise delivery, not just hours.</span>
                <em>See teams</em>
              </CrossCard>
              <CrossCard to="/projects">
                <strong>Offers often spawn projects →</strong>
                <span>
                  And projects spawn tasks. The full chain works here.
                </span>
                <em>See projects</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
