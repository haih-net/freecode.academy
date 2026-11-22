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
            <Eyebrow>Проекты</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>
                  Портфолио, которое работает, пока вы спите.
                </H1>
                <Sub>
                  Проект здесь — больше, чем описание выполненной работы. Это
                  открытая площадка для поиска партнёров и инвесторов.
                  Показывайте, как вы решаете реальные проблемы, и публикуйте
                  небольшие задачи с понятным объёмом для участников сообщества.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Находите партнёров</strong>
                  <span>
                    Приглашайте в проект соавторов, а не только сотрудников.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Привлекайте инвесторов</strong>
                  <span>Показывайте реальные результаты, а не слайды.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Рассказывайте о своей работе</strong>
                  <span>
                    Дневники работы становятся историями успеха и привлекают
                    клиентов.
                  </span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={projectsImg}
                role="img"
                aria-label="Планы проектов"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Над чем работают участники</H2>
              <SectionLede>
                В каждом проекте обозначена цель: поиск партнёров, привлечение
                инвестиций или помощь в работе. Каждая публикация — с понятным
                приглашением к участию.
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
                          Автор: <UserLink user={CreatedBy} />
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
                <strong>Возьмите задачу в проекте →</strong>
                <span>
                  Небольшие реальные задачи с понятным объёмом. Укрепляйте
                  репутацию своими результатами.
                </span>
                <em>Смотреть задачи</em>
              </CrossCard>
              <CrossCard to="/teams">
                <strong>Работайте над проектами командой →</strong>
                <span>Инвесторы доверяют командам, а не одиночкам.</span>
                <em>Смотреть команды</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Ищете соавторов? →</strong>
                <span>
                  Опубликуйте предложение — оно появится в общей ленте.
                </span>
                <em>Разместить предложение</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
