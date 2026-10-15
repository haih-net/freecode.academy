import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { UserLink } from '../../components/Link/User'
import { TaskStatusBadge } from '../../components/TaskStatusBadge'
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
import { TaskLink } from '../../components/Link/Task'
import tasksImg from './assets/tasks.jpg'

export const TasksPage: React.FC = () => {
  const { items: tasks, page, totalPages } = useLoaderData<MenuPageData>()
  const showContent = page < 2
  return (
    <>
      {!showContent && (
        <VisuallyHiddenTitle tabIndex={-1}>Задачи</VisuallyHiddenTitle>
      )}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Tasks</Eyebrow>
            {showContent && (
              <>
                <H1 tabIndex={-1}>Ship small. In public. Get hired.</H1>
                <Sub>
                  Tasks are the smallest unit of work in the network. Owners
                  scope them inside projects; anyone with access can claim one.
                  The result becomes a public worklog — the most honest
                  portfolio that exists.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Real scope</strong>
                  <span>Effort, deliverable, owner — visible upfront.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Public worklog</strong>
                  <span>How you solved it, not just that you did.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Reputation</strong>
                  <span>Closed tasks compound into trust.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage $src={tasksImg} role="img" aria-label="Task board" />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Open and recent tasks</H2>
              <SectionLede>
                Pulled from active projects in the network.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {tasks.map((n) => {
              const { id, title, description: intro, status, CreatedBy } = n

              // const project = projectBySlug(projectSlug)
              return (
                <Card key={id}>
                  <CardImg $src={tasksImg} />
                  <CardBody>
                    {status && (
                      <BadgeRow>
                        {/* <Badge tone={stateTone(state)}>{state}</Badge>
                      <Badge>{effort}</Badge> */}
                        <TaskStatusBadge status={status} />
                      </BadgeRow>
                    )}

                    <TaskLink task={n}>
                      <CardTitle>{title}</CardTitle>
                    </TaskLink>
                    <Markdown>{intro}</Markdown>
                    {/* {project && <CardMeta>Project: {project.title}</CardMeta>} */}

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

          {tasks.length === 0 && <p>Записи не найдены.</p>}

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard to="/projects">
                <strong>Tasks live inside projects →</strong>
                <span>See the bigger context before you claim one.</span>
                <em>See projects</em>
              </CrossCard>
              <CrossCard to="/people">
                <strong>Who claims tasks →</strong>
                <span>
                  Verified members. Each closed task hardens their reputation.
                </span>
                <em>See members</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Got a skill? →</strong>
                <span>
                  Turn it into an offer so others come to you instead.
                </span>
                <em>See offers</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
