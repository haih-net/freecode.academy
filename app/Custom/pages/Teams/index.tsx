import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { CrossCard, CrossLinks } from '../../components/CrossLinks/styles'
import { WhyItem, WhyStrip } from '../../components/WhyStrip/styles'
import {
  CardBody,
  CardImg,
  CardLink,
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
import { makeTeamLink } from '../../components/Link/Team'
import { getResizedImagePath } from '../../helpers/getResizedImagePath'
import teamsImg from './assets/teams.jpg'

export const TeamsPage: React.FC = () => {
  const { items: teams, page, totalPages } = useLoaderData<MenuPageData>()
  const showContent = page < 2
  return (
    <>
      {!showContent && (
        <VisuallyHiddenTitle tabIndex={-1}>Команды</VisuallyHiddenTitle>
      )}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Teams</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>One profile is a CV. A team is a company.</H1>
                <Sub>
                  Teams let members combine portfolios, services and skills into
                  a single unit. Clients see a real delivery group. Investors
                  see who actually executes. You see who you can delegate to
                  without explaining context twice.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Shared portfolio</strong>
                  <span>Show the full body of work, not fragments.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Easier hiring</strong>
                  <span>Clients hire a team, not a stranger.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Internal delegation</strong>
                  <span>Hand off tasks to people you trust.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={teamsImg}
                role="img"
                aria-label="A working team"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Active teams</H2>
              <SectionLede>
                Each team is a real working unit with shared accountability —
                not a logo collection.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {teams.map((n) => {
              const { id, title, intro, image } = n

              return (
                <CardLink key={id} to={makeTeamLink(n)}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      teamsImg
                    }
                  />
                  <CardBody>
                    {/* <CardMeta>{focus}</CardMeta> */}
                    <CardTitle>{title}</CardTitle>
                    <Markdown>{intro}</Markdown>
                    {/* <BadgeRow>
                      {services.slice(0, 3).map((s) => (
                        <Badge key={s} tone="brand">
                          {s}
                        </Badge>
                      ))}
                    </BadgeRow> */}
                    {/* <CardMeta>
                      Members:{' '}
                      {memberSlugs
                        .map((s) => memberBySlug(s)?.name)
                        .filter(Boolean)
                        .join(', ')}
                    </CardMeta> */}
                  </CardBody>
                </CardLink>
              )
            })}
          </Grid>

          {teams.length === 0 && <p>Записи не найдены.</p>}

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard to="/people">
                <strong>Find people for your team →</strong>
                <span>
                  Browse verified members and invite them in (after access).
                </span>
                <em>See members</em>
              </CrossCard>
              <CrossCard to="/projects">
                <strong>Run projects as a team →</strong>
                <span>
                  Ship together, build a joint case study, attract investors.
                </span>
                <em>Explore projects</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Publish a team offer →</strong>
                <span>Sell a complete service, not freelance hours.</span>
                <em>See offers</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
