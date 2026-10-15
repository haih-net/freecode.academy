import type * as React from 'react'
import { theme } from '../../theme'

import { mainPageLexicon } from './lexicon'
import networkImg from './assets/network.jpg'
import labImg from './assets/lab.jpg'
import executionImg from './assets/execution.jpg'
import trustImg from './assets/trust.jpg'
import membersImg from './assets/members.jpg'
import teamsImg from './assets/teams.jpg'
import offersImg from './assets/offers.jpg'
import projectsImg from './assets/projects.jpg'
import tasksImg from './assets/tasks.jpg'

import {
  Card,
  CardIcon,
  CardText,
  CardTitle,
  Container,
  CTAGroup,
  Eyebrow,
  GhostBtn,
  Grid,
  H1,
  H2,
  Hero,
  HeroBg,
  HeroInner,
  Kicker,
  Lead,
  // PrimaryBtn,
  Section,
  SectionHead,
  Split,
  SplitImage,
  SplitText,
  Sub,
  Support,
} from './primitives'
import {
  MainPageTrustStyled,
  MainPageStatsStyled,
  MainPageStatStyled,
  MainPageStatLink,
  MainPageStatNumStyled,
  MainPageStatLblStyled,
  MainPageTrustNoteStyled,
  MainPageEntityGridStyled,
  MainPageEntityCardStyled,
  MainPageEntityImgStyled,
  MainPageEntityBodyStyled,
  MainPageEntityKickerStyled,
  MainPageEntityArrowStyled,
  MainPageStepsStyled,
  MainPageStepStyled,
  MainPageStepNumStyled,
  MainPageLabWrapStyled,
  MainPageLabListStyled,
  MainPageLabImgStyled,
  MainPagePersonasStyled,
  MainPagePersonaStyled,
  MainPagePersonaImgStyled,
  MainPagePersonaBodyStyled,
  MainPageCommBoxStyled,
  MainPageCommImgStyled,
  MainPageCommTextStyled,
  MainPageFinalCTAStyled,
} from './styles'

export const MainPage: React.FC = () => {
  const t = (key: string): string => {
    let value: unknown = mainPageLexicon.ru
    for (const part of key.split('.')) {
      value = (value as Record<string, unknown>)[part]
    }
    if (typeof value !== 'string') {
      throw new Error(`Unknown homepage text: ${key}`)
    }
    return value
  }

  return (
    <>
      {/* HERO */}
      <Hero>
        <HeroBg aria-hidden />
        <HeroInner>
          <div>
            <Eyebrow>{t('mainPage.hero.eyebrow')}</Eyebrow>
            <H1
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: t('mainPage.hero.title') }}
            />
            <Sub>{t('mainPage.hero.sub')}</Sub>
          </div>
          <Support>{t('mainPage.hero.support')}</Support>
          <CTAGroup>
            <GhostBtn to="https://t.me/freecode_academy">
              {t('mainPage.hero.joinTelegram')}
            </GhostBtn>
          </CTAGroup>
        </HeroInner>
      </Hero>

      {/* TRUST */}
      <MainPageTrustStyled>
        <Container>
          <MainPageStatsStyled>
            <MainPageStatLink to={'/people'}>
              <MainPageStatNumStyled>4,000+</MainPageStatNumStyled>
              <MainPageStatLblStyled>
                {t('mainPage.trust.members')}
              </MainPageStatLblStyled>
            </MainPageStatLink>
            <MainPageStatLink to={'/teams'}>
              <MainPageStatNumStyled>100+</MainPageStatNumStyled>
              <MainPageStatLblStyled>
                {t('mainPage.trust.studios')}
              </MainPageStatLblStyled>
            </MainPageStatLink>
            <MainPageStatStyled>
              <MainPageStatNumStyled>14+</MainPageStatNumStyled>
              <MainPageStatLblStyled>
                {t('mainPage.trust.experience')}
              </MainPageStatLblStyled>
            </MainPageStatStyled>
          </MainPageStatsStyled>
          <MainPageTrustNoteStyled>
            {t('mainPage.trust.note')}
          </MainPageTrustNoteStyled>
        </Container>
      </MainPageTrustStyled>

      {/* CORE IDEA */}
      <Section $tone="bg" id="core">
        <Container>
          <Split>
            <SplitText>
              <Kicker>{t('mainPage.core.kicker')}</Kicker>
              <H2>{t('mainPage.core.title')}</H2>
              <p>
                {t('mainPage.core.p1')}{' '}
                <strong>{t('mainPage.core.p1Strong')}</strong>
                {t('mainPage.core.p1End')}
              </p>
              <p>
                {t('mainPage.core.p2Start')}
                <strong>{t('mainPage.core.p2Strong')}</strong>
                {t('mainPage.core.p2End')}
              </p>
            </SplitText>
            <SplitImage>
              <img
                src={networkImg}
                alt={t('mainPage.core.imgAlt')}
                loading="lazy"
              />
            </SplitImage>
          </Split>
        </Container>
      </Section>

      {/* WHAT MAKES DIFFERENT */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.different.kicker')}</Kicker>
            <H2>{t('mainPage.different.title')}</H2>
          </SectionHead>
          <Grid $cols={2}>
            {[
              {
                i: 'AI',
                key: 'aiNative',
              },
              {
                i: '✓',
                key: 'verified',
              },
              {
                i: '↔',
                key: 'shared',
              },
              {
                i: '◎',
                key: 'real',
              },
            ].map((c) => (
              <Card key={c.key}>
                <CardIcon>{c.i}</CardIcon>
                <CardTitle>
                  {t(`mainPage.different.cards.${c.key}.title`)}
                </CardTitle>
                <CardText>
                  {t(`mainPage.different.cards.${c.key}.text`)}
                </CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section $tone="bg" id="how">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.howItWorks.kicker')}</Kicker>
            <H2>{t('mainPage.howItWorks.title')}</H2>
          </SectionHead>
          <MainPageStepsStyled>
            {[
              { n: '01', key: 'define' },
              { n: '02', key: 'assemble' },
              { n: '03', key: 'execute' },
              { n: '04', key: 'deliver' },
            ].map((step) => (
              <MainPageStepStyled key={step.n}>
                <MainPageStepNumStyled>{step.n}</MainPageStepNumStyled>
                <CardTitle>
                  {t(`mainPage.howItWorks.steps.${step.key}.title`)}
                </CardTitle>
                <CardText>
                  {t(`mainPage.howItWorks.steps.${step.key}.text`)}
                </CardText>
              </MainPageStepStyled>
            ))}
          </MainPageStepsStyled>
        </Container>
      </Section>

      {/* WHAT YOU CAN DO */}
      <Section $tone="white" id="offer">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.offer.kicker')}</Kicker>
            <H2>{t('mainPage.offer.title')}</H2>
          </SectionHead>
          <Grid $cols={3}>
            {[
              'contractors',
              'teams',
              'publish',
              'manage',
              'opportunities',
              'global',
            ].map((key) => (
              <Card key={key}>
                <CardTitle>{t(`mainPage.offer.cards.${key}.title`)}</CardTitle>
                <CardText>{t(`mainPage.offer.cards.${key}.text`)}</CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* AI LAB */}
      <Section $tone="bg" id="lab">
        <Container>
          <MainPageLabWrapStyled>
            <div>
              <Kicker style={{ color: '#FF7E55' }}>
                {t('mainPage.lab.kicker')}
              </Kicker>
              <H2>{t('mainPage.lab.title')}</H2>
              <p>{t('mainPage.lab.text')}</p>
              <MainPageLabListStyled>
                <li>{t('mainPage.lab.list.experiments')}</li>
                <li>{t('mainPage.lab.list.prototypes')}</li>
                <li>{t('mainPage.lab.list.ideas')}</li>
              </MainPageLabListStyled>
            </div>
            <MainPageLabImgStyled>
              <img src={labImg} alt={t('mainPage.lab.imgAlt')} loading="lazy" />
            </MainPageLabImgStyled>
          </MainPageLabWrapStyled>
        </Container>
      </Section>

      {/* QUALITY & TRUST */}
      <Section $tone="cream">
        <Container>
          <Split>
            <SplitImage>
              <img
                src={trustImg}
                alt={t('mainPage.quality.imgAlt')}
                loading="lazy"
              />
            </SplitImage>
            <SplitText>
              <Kicker>{t('mainPage.quality.kicker')}</Kicker>
              <H2>{t('mainPage.quality.title')}</H2>
              <p>{t('mainPage.quality.unlike')}</p>
              <ul
                style={{ listStyle: 'none', padding: 0, margin: '10px 0 18px' }}
              >
                {['verify', 'curate', 'involved'].map((key) => (
                  <li key={key} style={{ padding: '8px 0', color: theme.ink2 }}>
                    <span style={{ color: theme.brand, marginRight: 10 }}>
                      ✓
                    </span>
                    {t(`mainPage.quality.list.${key}`)}
                  </li>
                ))}
              </ul>
              <p>
                <strong>{t('mainPage.quality.conclusion')}</strong>
              </p>
            </SplitText>
          </Split>
        </Container>
      </Section>

      {/* FOR WHO */}
      <Section $tone="bg">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.forWho.kicker')}</Kicker>
            <H2>{t('mainPage.forWho.title')}</H2>
          </SectionHead>
          <MainPagePersonasStyled>
            <MainPagePersonaStyled>
              <MainPagePersonaImgStyled $src={executionImg} />
              <MainPagePersonaBodyStyled>
                <h3>{t('mainPage.forWho.personas.clients.title')}</h3>
                <p>{t('mainPage.forWho.personas.clients.text')}</p>
              </MainPagePersonaBodyStyled>
            </MainPagePersonaStyled>
            <MainPagePersonaStyled>
              <MainPagePersonaImgStyled $src={networkImg} />
              <MainPagePersonaBodyStyled>
                <h3>{t('mainPage.forWho.personas.professionals.title')}</h3>
                <p>{t('mainPage.forWho.personas.professionals.text')}</p>
              </MainPagePersonaBodyStyled>
            </MainPagePersonaStyled>
            <MainPagePersonaStyled>
              <MainPagePersonaImgStyled $src={labImg} />
              <MainPagePersonaBodyStyled>
                <h3>{t('mainPage.forWho.personas.studios.title')}</h3>
                <p>{t('mainPage.forWho.personas.studios.text')}</p>
              </MainPagePersonaBodyStyled>
            </MainPagePersonaStyled>
          </MainPagePersonasStyled>
        </Container>
      </Section>

      {/* ENTITY OVERVIEW */}
      <Section $tone="bg" id="explore">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.explore.kicker')}</Kicker>
            <H2>{t('mainPage.explore.title')}</H2>
            <Lead>{t('mainPage.explore.lead')}</Lead>
          </SectionHead>
          <MainPageEntityGridStyled>
            <MainPageEntityCardStyled to="/people">
              <MainPageEntityImgStyled $src={membersImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.members.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.members.title')}
                </CardTitle>
                <CardText>
                  {t('mainPage.explore.entities.members.text')}
                </CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.members.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
            <MainPageEntityCardStyled to="/teams">
              <MainPageEntityImgStyled $src={teamsImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.teams.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.teams.title')}
                </CardTitle>
                <CardText>{t('mainPage.explore.entities.teams.text')}</CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.teams.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
            <MainPageEntityCardStyled to="/offers">
              <MainPageEntityImgStyled $src={offersImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.offers.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.offers.title')}
                </CardTitle>
                <CardText>
                  {t('mainPage.explore.entities.offers.text')}
                </CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.offers.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
            <MainPageEntityCardStyled to="/projects">
              <MainPageEntityImgStyled $src={projectsImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.projects.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.projects.title')}
                </CardTitle>
                <CardText>
                  {t('mainPage.explore.entities.projects.text')}{' '}
                  <strong>
                    {t('mainPage.explore.entities.projects.badges.partners')}
                  </strong>
                  ,{' '}
                  <strong>
                    {t('mainPage.explore.entities.projects.badges.investor')}
                  </strong>
                  ,{' '}
                  <strong>
                    {t('mainPage.explore.entities.projects.badges.help')}
                  </strong>
                  .
                </CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.projects.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
            <MainPageEntityCardStyled to="/tasks">
              <MainPageEntityImgStyled $src={tasksImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.tasks.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.tasks.title')}
                </CardTitle>
                <CardText>{t('mainPage.explore.entities.tasks.text')}</CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.tasks.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
            <MainPageEntityCardStyled to="/about">
              <MainPageEntityImgStyled $src={networkImg} />
              <MainPageEntityBodyStyled>
                <MainPageEntityKickerStyled>
                  {t('mainPage.explore.entities.about.kicker')}
                </MainPageEntityKickerStyled>
                <CardTitle>
                  {t('mainPage.explore.entities.about.title')}
                </CardTitle>
                <CardText>{t('mainPage.explore.entities.about.text')}</CardText>
                <MainPageEntityArrowStyled>
                  {t('mainPage.explore.entities.about.link')}
                </MainPageEntityArrowStyled>
              </MainPageEntityBodyStyled>
            </MainPageEntityCardStyled>
          </MainPageEntityGridStyled>
        </Container>
      </Section>

      {/* COMMUNITY */}
      <Section $tone="white" id="community">
        <Container>
          <SectionHead>
            <Kicker>{t('mainPage.community.kicker')}</Kicker>
            <H2>{t('mainPage.community.title')}</H2>
            <Lead>{t('mainPage.community.lead')}</Lead>
          </SectionHead>
          <MainPageCommBoxStyled>
            <MainPageCommImgStyled />
            <MainPageCommTextStyled>
              <CardTitle style={{ fontSize: 26 }}>
                {t('mainPage.community.ensures')}
              </CardTitle>
              <ul>
                <li>{t('mainPage.community.list.signal')}</li>
                <li>{t('mainPage.community.list.trusted')}</li>
                <li>{t('mainPage.community.list.real')}</li>
              </ul>
            </MainPageCommTextStyled>
          </MainPageCommBoxStyled>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <MainPageFinalCTAStyled id="cta">
        <Container>
          <Kicker>{t('mainPage.cta.kicker')}</Kicker>
          <H1
            as="h2"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', maxWidth: '16ch' }}
          >
            {t('mainPage.cta.title')}
          </H1>
          <Sub>{t('mainPage.cta.sub')}</Sub>
          <CTAGroup style={{ marginTop: 28 }}>
            <GhostBtn to="https://t.me/freecode_academy">
              {t('mainPage.hero.joinTelegram')}
            </GhostBtn>
          </CTAGroup>
        </Container>
      </MainPageFinalCTAStyled>
    </>
  )
}
