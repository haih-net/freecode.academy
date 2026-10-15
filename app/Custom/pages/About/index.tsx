import type * as React from 'react'
import { translate } from '../shared/translate'
import {
  Container,
  Eyebrow,
  H1,
  H2,
  Hero,
  HeroInner,
  Kicker,
  Lead,
  Section,
  SectionHead,
  Sub,
} from '../../components/Page/styles'
import { theme } from '../../theme'

import missionImg from './assets/about-mission.jpg'
import philosophyImg from './assets/about-philosophy.jpg'
import labImg from './assets/lab.jpg'
import { aboutPageLexicon } from './lexicon'
import {
  AboutPageSplitStyled,
  AboutPageSplitImgStyled,
  AboutPageSplitTextStyled,
  AboutPagePillarsStyled,
  AboutPagePillarStyled,
  AboutPagePillarTagStyled,
  AboutPagePillarTitleStyled,
  AboutPagePillarTextStyled,
  AboutPageRolesStyled,
  AboutPageRoleStyled,
  AboutPageRoleBadgeStyled,
  AboutPageRoleTitleStyled,
  AboutPageRoleTextStyled,
  AboutPageRoleListStyled,
  AboutPageManifestoStyled,
  AboutPageTimelineStyled,
  AboutPageTimeCardStyled,
  AboutPageTimeYearStyled,
  AboutPageTimeTitleStyled,
  AboutPageTimeTextStyled,
  AboutPageQuoteWrapStyled,
  AboutPageQuoteImgStyled,
  AboutPageQuoteBodyStyled,
  AboutPageFinalCTAStyled,
  AboutPageCTAGroupStyled,
  AboutPageGhostBtnStyled,
} from './styles'

export const AboutPage: React.FC = () => {
  const t = translate(aboutPageLexicon.ru)

  return (
    <>
      {/* HERO */}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>{t('aboutPage.hero.eyebrow')}</Eyebrow>
            <H1
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: t('aboutPage.hero.title') }}
            />
            <Sub>{t('aboutPage.hero.subtitle')}</Sub>
          </div>
        </HeroInner>
      </Hero>

      {/* MISSION */}
      <Section $tone="bg">
        <Container>
          <AboutPageSplitStyled>
            <AboutPageSplitImgStyled>
              <img
                src={missionImg}
                alt={t('aboutPage.mission.imgAlt')}
                loading="lazy"
                width={1024}
                height={1024}
              />
            </AboutPageSplitImgStyled>
            <AboutPageSplitTextStyled>
              <Kicker>{t('aboutPage.mission.kicker')}</Kicker>
              <H2>{t('aboutPage.mission.title')}</H2>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('aboutPage.mission.text1'),
                }}
              />
              <p>{t('aboutPage.mission.text2')}</p>
            </AboutPageSplitTextStyled>
          </AboutPageSplitStyled>
        </Container>
      </Section>

      {/* PHILOSOPHY */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>{t('aboutPage.philosophy.kicker')}</Kicker>
            <H2>{t('aboutPage.philosophy.title')}</H2>
            <Lead>{t('aboutPage.philosophy.lead')}</Lead>
          </SectionHead>
          <AboutPagePillarsStyled>
            <AboutPagePillarStyled>
              <AboutPagePillarTagStyled>
                {t('aboutPage.philosophy.pillars.curation.tag')}
              </AboutPagePillarTagStyled>
              <AboutPagePillarTitleStyled>
                {t('aboutPage.philosophy.pillars.curation.title')}
              </AboutPagePillarTitleStyled>
              <AboutPagePillarTextStyled>
                {t('aboutPage.philosophy.pillars.curation.text')}
              </AboutPagePillarTextStyled>
            </AboutPagePillarStyled>
            <AboutPagePillarStyled>
              <AboutPagePillarTagStyled>
                {t('aboutPage.philosophy.pillars.responsibility.tag')}
              </AboutPagePillarTagStyled>
              <AboutPagePillarTitleStyled>
                {t('aboutPage.philosophy.pillars.responsibility.title')}
              </AboutPagePillarTitleStyled>
              <AboutPagePillarTextStyled>
                {t('aboutPage.philosophy.pillars.responsibility.text')}
              </AboutPagePillarTextStyled>
            </AboutPagePillarStyled>
            <AboutPagePillarStyled>
              <AboutPagePillarTagStyled>
                {t('aboutPage.philosophy.pillars.aiNative.tag')}
              </AboutPagePillarTagStyled>
              <AboutPagePillarTitleStyled>
                {t('aboutPage.philosophy.pillars.aiNative.title')}
              </AboutPagePillarTitleStyled>
              <AboutPagePillarTextStyled>
                {t('aboutPage.philosophy.pillars.aiNative.text')}
              </AboutPagePillarTextStyled>
            </AboutPagePillarStyled>
            <AboutPagePillarStyled>
              <AboutPagePillarTagStyled>
                {t('aboutPage.philosophy.pillars.longevity.tag')}
              </AboutPagePillarTagStyled>
              <AboutPagePillarTitleStyled>
                {t('aboutPage.philosophy.pillars.longevity.title')}
              </AboutPagePillarTitleStyled>
              <AboutPagePillarTextStyled>
                {t('aboutPage.philosophy.pillars.longevity.text')}
              </AboutPagePillarTextStyled>
            </AboutPagePillarStyled>
          </AboutPagePillarsStyled>
        </Container>
      </Section>

      {/* WHAT WE GIVE — partnership/roles */}
      <Section $tone="bg" id="join">
        <Container>
          <SectionHead>
            <Kicker>{t('aboutPage.roles.kicker')}</Kicker>
            <H2>{t('aboutPage.roles.title')}</H2>
            <Lead>{t('aboutPage.roles.lead')}</Lead>
          </SectionHead>
          <AboutPageRolesStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.member.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.member.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.member.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.member.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={i}>{item}</li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.client.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.client.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.client.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.client.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.teamLead.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.teamLead.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.teamLead.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.teamLead.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.founder.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.founder.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.founder.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.founder.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.investor.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.investor.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.investor.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.investor.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
            <AboutPageRoleStyled>
              <AboutPageRoleBadgeStyled>
                {t('aboutPage.roles.mentor.badge')}
              </AboutPageRoleBadgeStyled>
              <AboutPageRoleTitleStyled>
                {t('aboutPage.roles.mentor.title')}
              </AboutPageRoleTitleStyled>
              <AboutPageRoleTextStyled>
                {t('aboutPage.roles.mentor.text')}
              </AboutPageRoleTextStyled>
              <AboutPageRoleListStyled>
                {(
                  t('aboutPage.roles.mentor.list', {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </AboutPageRoleListStyled>
            </AboutPageRoleStyled>
          </AboutPageRolesStyled>
        </Container>
      </Section>

      {/* THE OFFER ENTITY */}
      <Section $tone="white">
        <Container>
          <AboutPageSplitStyled $reverse>
            <AboutPageSplitImgStyled>
              <img
                src={labImg}
                alt={t('aboutPage.offer.imgAlt')}
                loading="lazy"
                width={1024}
                height={1024}
              />
            </AboutPageSplitImgStyled>
            <AboutPageSplitTextStyled>
              <Kicker>{t('aboutPage.offer.kicker')}</Kicker>
              <H2>{t('aboutPage.offer.title')}</H2>
              <p
                dangerouslySetInnerHTML={{ __html: t('aboutPage.offer.text1') }}
              />
              <p>{t('aboutPage.offer.text2')}</p>
              <p
                dangerouslySetInnerHTML={{ __html: t('aboutPage.offer.text3') }}
              />
            </AboutPageSplitTextStyled>
          </AboutPageSplitStyled>
        </Container>
      </Section>

      {/* MANIFESTO */}
      <Section $tone="bg">
        <Container>
          <AboutPageManifestoStyled>
            <Kicker style={{ color: theme.brand }}>
              {t('aboutPage.manifesto.kicker')}
            </Kicker>
            <H2>{t('aboutPage.manifesto.title')}</H2>
            <p>{t('aboutPage.manifesto.text')}</p>
          </AboutPageManifestoStyled>
        </Container>
      </Section>

      {/* TIMELINE */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>{t('aboutPage.timeline.kicker')}</Kicker>
            <H2>{t('aboutPage.timeline.title')}</H2>
          </SectionHead>
          <AboutPageTimelineStyled>
            <AboutPageTimeCardStyled>
              <AboutPageTimeYearStyled>
                {t('aboutPage.timeline.cards.seed.year')}
              </AboutPageTimeYearStyled>
              <AboutPageTimeTitleStyled>
                {t('aboutPage.timeline.cards.seed.title')}
              </AboutPageTimeTitleStyled>
              <AboutPageTimeTextStyled>
                {t('aboutPage.timeline.cards.seed.text')}
              </AboutPageTimeTextStyled>
            </AboutPageTimeCardStyled>
            <AboutPageTimeCardStyled>
              <AboutPageTimeYearStyled>
                {t('aboutPage.timeline.cards.growth.year')}
              </AboutPageTimeYearStyled>
              <AboutPageTimeTitleStyled>
                {t('aboutPage.timeline.cards.growth.title')}
              </AboutPageTimeTitleStyled>
              <AboutPageTimeTextStyled>
                {t('aboutPage.timeline.cards.growth.text')}
              </AboutPageTimeTextStyled>
            </AboutPageTimeCardStyled>
            <AboutPageTimeCardStyled>
              <AboutPageTimeYearStyled>
                {t('aboutPage.timeline.cards.relaunch.year')}
              </AboutPageTimeYearStyled>
              <AboutPageTimeTitleStyled>
                {t('aboutPage.timeline.cards.relaunch.title')}
              </AboutPageTimeTitleStyled>
              <AboutPageTimeTextStyled>
                {t('aboutPage.timeline.cards.relaunch.text')}
              </AboutPageTimeTextStyled>
            </AboutPageTimeCardStyled>
          </AboutPageTimelineStyled>
        </Container>
      </Section>

      {/* PHILOSOPHY IMAGE */}
      <Section $tone="bg">
        <Container>
          <AboutPageSplitStyled>
            <AboutPageSplitTextStyled>
              <Kicker>{t('aboutPage.howWeWork.kicker')}</Kicker>
              <H2>{t('aboutPage.howWeWork.title')}</H2>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('aboutPage.howWeWork.text1'),
                }}
              />
              <p>{t('aboutPage.howWeWork.text2')}</p>
            </AboutPageSplitTextStyled>
            <AboutPageSplitImgStyled>
              <img
                src={philosophyImg}
                alt={t('aboutPage.howWeWork.imgAlt')}
                loading="lazy"
                width={1024}
                height={1024}
              />
            </AboutPageSplitImgStyled>
          </AboutPageSplitStyled>
        </Container>
      </Section>

      {/* FOUNDER */}
      <Section $tone="white">
        <Container>
          <SectionHead>
            <Kicker>{t('aboutPage.founder.kicker')}</Kicker>
            <H2>{t('aboutPage.founder.title')}</H2>
          </SectionHead>
          <AboutPageQuoteWrapStyled>
            <AboutPageQuoteImgStyled aria-label="Founder portrait" />
            <AboutPageQuoteBodyStyled>
              <blockquote>{t('aboutPage.founder.quote')}</blockquote>
              <cite>
                <strong>{t('aboutPage.founder.cite')}</strong>
                {t('aboutPage.founder.citeDesc')}
              </cite>
            </AboutPageQuoteBodyStyled>
          </AboutPageQuoteWrapStyled>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <AboutPageFinalCTAStyled>
        <Container>
          <Eyebrow>{t('aboutPage.cta.eyebrow')}</Eyebrow>
          <H2 style={{ marginTop: 22 }}>{t('aboutPage.cta.title')}</H2>
          <Lead>{t('aboutPage.cta.lead')}</Lead>
          <AboutPageCTAGroupStyled>
            <AboutPageGhostBtnStyled to="https://t.me/freecode_academy">
              {t('aboutPage.cta.joinTelegram')}
            </AboutPageGhostBtnStyled>
          </AboutPageCTAGroupStyled>
        </Container>
      </AboutPageFinalCTAStyled>
    </>
  )
}
