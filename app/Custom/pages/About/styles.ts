import { styled } from '@linaria/react'
import { Link } from 'react-router'
import { theme } from '../../theme'

import founderImg from './assets/about-founder.jpg'

/* SPLIT */
export const AboutPageSplitStyled = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  direction: ${(p) => (p.$reverse ? 'rtl' : 'ltr')};
  & > * {
    direction: ltr;
  }
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 32px;
  }
`
export const AboutPageSplitImgStyled = styled.div`
  border-radius: 26px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 30px 60px -30px rgba(14, 15, 18, 0.25);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const AboutPageSplitTextStyled = styled.div`
  p {
    color: ${theme.ink2};
    font-size: 17px;
    margin: 0 0 14px;
  }
  strong {
    color: ${theme.ink};
  }
`

/* PILLARS */
export const AboutPagePillarsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`
export const AboutPagePillarStyled = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 22px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -20px rgba(14, 15, 18, 0.18);
  }
`
export const AboutPagePillarTagStyled = styled.div`
  font-family: ${theme.serif};
  font-size: 36px;
  font-weight: 500;
  color: ${theme.brand};
  letter-spacing: -0.02em;
  margin-bottom: 10px;
`
export const AboutPagePillarTitleStyled = styled.h3`
  font-family: ${theme.serif};
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 8px;
`
export const AboutPagePillarTextStyled = styled.p`
  color: ${theme.ink2};
  font-size: 14.5px;
  margin: 0;
`

/* ROLES — partnership */
export const AboutPageRolesStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`
export const AboutPageRoleStyled = styled.article`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
  &:hover {
    border-color: #d8d3c5;
    transform: translateY(-3px);
  }
`
export const AboutPageRoleBadgeStyled = styled.div`
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${theme.brandSoft};
  color: ${theme.brand};
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 16px;
`
export const AboutPageRoleTitleStyled = styled.h3`
  font-family: ${theme.serif};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`
export const AboutPageRoleTextStyled = styled.p`
  color: ${theme.ink2};
  font-size: 15px;
  margin: 0 0 16px;
`
export const AboutPageRoleListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto 0 0;
  li {
    font-size: 14px;
    color: ${theme.ink2};
    padding: 6px 0;
    display: flex;
    gap: 10px;
  }
  li::before {
    content: '→';
    color: ${theme.brand};
    font-weight: 700;
  }
`

/* MANIFESTO */
export const AboutPageManifestoStyled = styled.div`
  background: linear-gradient(135deg, #0e0f12 0%, #1a1c22 100%);
  color: #fff;
  border-radius: 32px;
  padding: 72px 56px;
  text-align: center;
  h2 {
    color: #fff;
    max-width: 18ch;
    margin: 0 auto 22px;
  }
  p {
    color: rgba(255, 255, 255, 0.78);
    font-size: 19px;
    max-width: 680px;
    margin: 0 auto;
  }
  @media (max-width: 720px) {
    padding: 48px 28px;
  }
`

/* TIMELINE */
export const AboutPageTimelineStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const AboutPageTimeCardStyled = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px;
`
export const AboutPageTimeYearStyled = styled.div`
  font-family: ${theme.serif};
  font-size: 28px;
  font-weight: 600;
  color: ${theme.brand};
  margin-bottom: 8px;
`
export const AboutPageTimeTitleStyled = styled.h3`
  font-family: ${theme.serif};
  font-size: 20px;
  margin: 0 0 8px;
  font-weight: 600;
`
export const AboutPageTimeTextStyled = styled.p`
  color: ${theme.ink2};
  font-size: 15px;
  margin: 0;
`

/* FOUNDER QUOTE */
export const AboutPageQuoteWrapStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 28px;
  overflow: hidden;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const AboutPageQuoteImgStyled = styled.div`
  background: url(${founderImg}) center/cover no-repeat;
  min-height: 380px;
`
export const AboutPageQuoteBodyStyled = styled.div`
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  blockquote {
    font-family: ${theme.serif};
    font-size: clamp(22px, 2.4vw, 30px);
    line-height: 1.3;
    letter-spacing: -0.015em;
    margin: 0 0 24px;
    color: ${theme.ink};
  }
  cite {
    font-style: normal;
    color: ${theme.muted};
    font-size: 14px;
    strong {
      color: ${theme.ink};
      display: block;
      font-size: 16px;
      margin-bottom: 2px;
    }
  }
  @media (max-width: 880px) {
    padding: 36px 28px;
  }
`

/* FINAL CTA */
export const AboutPageFinalCTAStyled = styled.section`
  padding: 120px 24px;
  text-align: center;
  background:
    radial-gradient(ellipse at top, ${theme.brandSoft} 0%, transparent 60%),
    ${theme.bg};
  h2 {
    max-width: 18ch;
    margin: 0 auto 18px;
  }
`
export const AboutPageCTAGroupStyled = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
`
export const AboutPagePrimaryBtnStyled = styled.button`
  background: ${theme.ink};
  color: #fff;
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 10px 30px rgba(14, 15, 18, 0.18);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(14, 15, 18, 0.22);
  }
`
export const AboutPageGhostBtnStyled = styled(Link)`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  color: ${theme.ink};
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  &:hover {
    background: ${theme.cream};
  }
`
