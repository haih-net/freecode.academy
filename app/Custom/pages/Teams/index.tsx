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
            <Eyebrow>Команды</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>
                  Один профиль — резюме. Команда — целая компания.
                </H1>
                <Sub>
                  Команды объединяют портфолио, услуги и навыки участников.
                  Клиенты видят тех, кто вместе работает над результатом.
                  Инвесторы — тех, кто воплощает идеи. А вы знаете, кому можно
                  передать задачу без повторных объяснений.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Общее портфолио</strong>
                  <span>
                    Покажите все совместные работы, а не отдельные фрагменты.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Проще найти исполнителей</strong>
                  <span>
                    Клиенты выбирают команду, а не незнакомого исполнителя.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Делегирование внутри команды</strong>
                  <span>Передавайте задачи тем, кому доверяете.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={teamsImg}
                role="img"
                aria-label="Команда за работой"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Активные команды</H2>
              <SectionLede>
                Каждая команда — это люди, которые работают вместе и отвечают за
                общий результат, а не просто набор логотипов.
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
                <strong>Найдите людей в команду →</strong>
                <span>
                  Изучайте профили проверенных участников и приглашайте их в
                  команду после получения доступа.
                </span>
                <em>Смотреть участников</em>
              </CrossCard>
              <CrossCard to="/projects">
                <strong>Работайте над проектами командой →</strong>
                <span>
                  Работайте вместе, рассказывайте о совместных результатах и
                  привлекайте инвесторов.
                </span>
                <em>Смотреть проекты</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>Опубликуйте предложение команды →</strong>
                <span>
                  Предлагайте комплексную услугу, а не часы работы фрилансеров.
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
