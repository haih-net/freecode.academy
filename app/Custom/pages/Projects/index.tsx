import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { UserLink } from '../../components/Link/User'
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
import { ProjectLink } from '../../components/Link/Project'
import projectsImg from './assets/projects.jpg'

export const ProjectsPage: React.FC = () => {
  const { items: projects, page, totalPages } = useLoaderData<MenuPageData>()
  const showContent = page < 2
  return (
    <>
      {!showContent && (
        <VisuallyHiddenTitle tabIndex={-1}>Проекты</VisuallyHiddenTitle>
      )}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Projects </Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>Portfolio that works while you sleep.</H1>
                <Sub>
                  A project here is more than a case study. It's a public
                  surface to attract partners, signal to investors, document how
                  you solve real problems, and hand out small, scoped tasks the
                  network can pick up.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Find partners</strong>
                  <span>
                    Open a project for co-builders, not just employees.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Attract investors</strong>
                  <span>Show traction, not slides.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Document your work</strong>
                  <span>Worklogs become case studies become inbound.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={projectsImg}
                role="img"
                aria-label="Project plans"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>What's being built</H2>
              <SectionLede>
                Each project shows clear intent — partners wanted, investor
                open, help needed. No silent listings.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {projects.map((n) => {
              const { id, name: title, description: intro, CreatedBy } = n

              // const owner = memberBySlug(ownerSlug)
              // const team = teamSlug ? teamBySlug(teamSlug) : undefined
              return (
                <Card key={id}>
                  <CardImg $src={projectsImg} />
                  <CardBody>
                    {/* <BadgeRow>
                      <Badge tone="ink">{status}</Badge>
                      {badges.map((b) => (
                        <Badge key={b} tone={badgeTone(b)}>
                          {b}
                        </Badge>
                      ))}
                    </BadgeRow> */}
                    <ProjectLink object={n}>
                      <CardTitle>{title}</CardTitle>
                    </ProjectLink>
                    <Markdown>{intro}</Markdown>
                    <CardMeta>
                      {CreatedBy ? (
                        <>
                          By <UserLink user={CreatedBy} />
                        </>
                      ) : (
                        ''
                      )}
                      {/* {team ? ` · ${team.title}` : ''} */}
                      {/* {taskSlugs.length > 0
                        ? ` · ${taskSlugs.length} open task(s)`
                        : ''} */}
                    </CardMeta>
                  </CardBody>
                </Card>
              )
            })}
          </Grid>

          {projects.length === 0 && <p>Записи не найдены.</p>}

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard to="/tasks">
                <strong>Pick up a project task →</strong>
                <span>
                  Small, scoped pieces of real work. Build reputation by
                  shipping.
                </span>
                <em>See tasks</em>
              </CrossCard>
              <CrossCard to="/teams">
                <strong>Run projects as a team →</strong>
                <span>Investors trust units, not individuals.</span>
                <em>See teams</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Looking for collaborators? →</strong>
                <span>
                  Post an offer instead — it shows up in the public feed.
                </span>
                <em>Post an offer</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
