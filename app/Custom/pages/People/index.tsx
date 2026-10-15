import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { MenuPageData } from '../../types/menu'
import { Markdown } from '../../components/Markdown'
import { Pagination } from '../../components/Pagination'
import { Badge } from '../../components/Badge'
import { BadgeRow } from '../../components/Badge/styles'
import { CrossCard, CrossLinks } from '../../components/CrossLinks/styles'
import { WhyItem, WhyStrip } from '../../components/WhyStrip/styles'
import {
  CardBody,
  CardImg,
  CardLink,
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
  LockedNotice,
  Section,
  SectionLede,
  Sub,
} from '../../components/Page/styles'
import { createUserLink } from '../../components/Link/User'
import { getResizedImagePath } from '../../helpers/getResizedImagePath'
import membersImg from './assets/members.jpg'
import { usersViewLexicon } from './lexicon'
import { translate } from '../shared/translate'

export const PeoplePage: React.FC = () => {
  const { items: users, page, totalPages } = useLoaderData<MenuPageData>()
  const showContent = page < 2
  const t = translate(usersViewLexicon.ru)
  return (
    <>
      {!showContent && (
        <VisuallyHiddenTitle tabIndex={-1}>Участники</VisuallyHiddenTitle>
      )}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>{t('usersView.hero.eyebrow')}</Eyebrow>

            {showContent && (
              <>
                <H1 tabIndex={-1}>{t('usersView.hero.title')}</H1>
                <Sub>{t('usersView.hero.sub')}</Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>{t('usersView.why.readEverything')}</strong>
                  <span>{t('usersView.why.readEverythingDesc')}</span>
                </WhyItem>
                <WhyItem>
                  <strong>{t('usersView.why.contactInviteOnly')}</strong>
                  <span>{t('usersView.why.contactInviteOnlyDesc')}</span>
                </WhyItem>
                <WhyItem>
                  <strong>{t('usersView.why.formTeams')}</strong>
                  <span>{t('usersView.why.formTeamsDesc')}</span>
                </WhyItem>
              </WhyStrip>

              <LockedNotice>{t('usersView.lockedNotice')}</LockedNotice>

              <HeroImage
                $src={membersImg}
                role="img"
                aria-label="Freecode Academy members"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>{t('usersView.section.title')}</H2>
              <SectionLede>{t('usersView.section.lede')}</SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {users.map((n) => {
              const { id, username, fullname, image, intro } = n

              const name = fullname || username

              const skills: string[] = []
              const teamSlugs: {
                title?: string
              }[] = []

              return (
                <CardLink key={id} to={createUserLink(n)}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      membersImg
                    }
                  />

                  <CardBody>
                    {/* <CardMeta>
                      {role} · {location}
                    </CardMeta> */}
                    <CardTitle>{name}</CardTitle>
                    <Markdown>{intro}</Markdown>
                    <BadgeRow>
                      {/* {verified && <Badge tone="green">Verified</Badge>} */}
                      {skills.slice(0, 2).map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </BadgeRow>
                    {teamSlugs.length > 0 && (
                      <CardMeta>
                        {t('usersView.card.teams')}:{' '}
                        {/* {teamSlugs
                          .map((s) => teamBySlug(s)?.title)
                          .filter(Boolean)
                          .join(', ')} */}
                      </CardMeta>
                    )}
                  </CardBody>
                </CardLink>
              )
            })}
          </Grid>

          {users.length === 0 && <p>Записи не найдены.</p>}

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard to="/teams">
                <strong>{t('usersView.crossLinks.formTeam.title')}</strong>
                <span>{t('usersView.crossLinks.formTeam.text')}</span>
                <em>{t('usersView.crossLinks.formTeam.cta')}</em>
              </CrossCard>
              <CrossCard to="/offers">
                <strong>{t('usersView.crossLinks.browseOffers.title')}</strong>
                <span>{t('usersView.crossLinks.browseOffers.text')}</span>
                <em>{t('usersView.crossLinks.browseOffers.cta')}</em>
              </CrossCard>
              <CrossCard to="/about">
                <strong>{t('usersView.crossLinks.howWeVet.title')}</strong>
                <span>{t('usersView.crossLinks.howWeVet.text')}</span>
                <em>{t('usersView.crossLinks.howWeVet.cta')}</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
