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
            <Eyebrow>Предложения</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>
                  Всё, что вы хотите предложить. В едином формате.
                </H1>
                <Sub>
                  Предложение — это инициатива участника в свободной форме.
                  Услуга, сотрудничество, совместное исследование или поиск
                  сотрудников — простая структура для всех: что предлагается,
                  кто автор и какова цель.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Услуги</strong>
                  <span>Предлагайте свои услуги с понятным объёмом работ.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Сотрудничество</strong>
                  <span>Найдите сооснователя или создайте что-то вместе.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Исследования и найм</strong>
                  <span>
                    Совместное исследование, работа по контракту и другие
                    возможности.
                  </span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={offersImg}
                role="img"
                aria-label="Предложения участников"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Актуальные предложения</H2>
              <SectionLede>
                Реальные предложения от участников сообщества. Откройте
                предложение, чтобы узнать подробности и написать автору, если у
                вас есть доступ.
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
                        Автор: <UserLink user={CreatedBy} />
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
                <strong>За каждым предложением стоит человек →</strong>
                <span>Узнайте больше об авторе, прежде чем отвечать.</span>
                <em>Смотреть участников</em>
              </CrossCard>
              <CrossCard to="/teams">
                <strong>Предложения команд весомее →</strong>
                <span>
                  Команда может предложить готовый результат, а не только часы
                  работы.
                </span>
                <em>Смотреть команды</em>
              </CrossCard>
              <CrossCard to="/projects">
                <strong>Из предложений рождаются проекты →</strong>
                <span>А из проектов — задачи. Вся цепочка работает здесь.</span>
                <em>Смотреть проекты</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
