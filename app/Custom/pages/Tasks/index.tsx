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
            <Eyebrow>Задачи</Eyebrow>
            {showContent && (
              <>
                <H1 tabIndex={-1}>
                  Решайте небольшие задачи. Показывайте результат. Находите
                  работу.
                </H1>
                <Sub>
                  Задачи — небольшие части работы в сообществе. Владельцы
                  проектов определяют их объём, а любой участник с доступом
                  может взяться за выполнение. Результаты попадают в открытый
                  дневник работы — портфолио, которое говорит само за себя.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Понятный объём работы</strong>
                  <span>
                    Трудозатраты, ожидаемый результат и автор известны заранее.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Открытый дневник работы</strong>
                  <span>
                    Покажите, как вы решили задачу, а не только сам результат.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Репутация</strong>
                  <span>Каждая выполненная задача укрепляет доверие.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage $src={tasksImg} role="img" aria-label="Доска задач" />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Открытые и недавние задачи</H2>
              <SectionLede>Задачи из активных проектов сообщества.</SectionLede>
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
                        Автор: <UserLink user={CreatedBy} />
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
                <strong>Задачи — часть проектов →</strong>
                <span>Изучите проект, прежде чем браться за задачу.</span>
                <em>Смотреть проекты</em>
              </CrossCard>
              <CrossCard to="/people">
                <strong>Кто берётся за задачи →</strong>
                <span>
                  Проверенные участники. Каждая выполненная задача укрепляет их
                  репутацию.
                </span>
                <em>Смотреть участников</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Есть полезный навык? →</strong>
                <span>
                  Расскажите о нём в предложении, чтобы заинтересованные
                  участники могли вас найти.
                </span>
                <em>Смотреть предложения</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
