import { styled } from '@linaria/react'
import { Link } from 'react-router'

import communityImg from './assets/community.jpg'
import { theme } from '../../theme'

/* TRUST */
export const MainPageTrustStyled = styled.section`
  padding: 56px 0 24px;
`
export const MainPageStatsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`
export const MainPageStatStyled = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: ${theme.radius};
  padding: 28px 18px;
`
export const MainPageStatLink = styled(Link)`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: ${theme.radius};
  padding: 28px 18px;
`
export const MainPageStatNumStyled = styled.div`
  font-family: ${theme.serif};
  font-size: 44px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${theme.ink};
`
export const MainPageStatLblStyled = styled.div`
  color: ${theme.muted};
  font-size: 14px;
  margin-top: 4px;
`
export const MainPageTrustNoteStyled = styled.p`
  text-align: center;
  color: ${theme.muted};
  margin-top: 22px;
  font-size: 15px;
`

/* ENTITY OVERVIEW (links to dedicated sections) */
export const MainPageEntityGridStyled = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
export const MainPageEntityCardStyled = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 50px -28px rgba(14, 15, 18, 0.22);
    border-color: #d8d3c5;
  }
`
export const MainPageEntityImgStyled = styled.div<{ $src: string }>`
  background:
    ${(p) => `url("${p.$src}")`} center/cover no-repeat,
    ${theme.cream};
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid ${theme.line};
`
export const MainPageEntityBodyStyled = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`
export const MainPageEntityKickerStyled = styled.div`
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.brand};
  font-weight: 600;
`
export const MainPageEntityArrowStyled = styled.span`
  margin-top: auto;
  font-weight: 600;
  color: ${theme.ink};
  &::after {
    content: ' →';
  }
`

/* HOW IT WORKS - timeline */
export const MainPageStepsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`
export const MainPageStepStyled = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 22px;
  position: relative;
`
export const MainPageStepNumStyled = styled.div`
  font-family: ${theme.serif};
  font-size: 40px;
  font-weight: 500;
  color: ${theme.brand};
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`

/* AI LAB BLOCK */
export const MainPageLabWrapStyled = styled.div`
  background: linear-gradient(135deg, #0e0f12 0%, #1a1c22 100%);
  color: #fff;
  border-radius: 32px;
  padding: 64px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    padding: 40px 28px;
  }
  h2 {
    color: #fff;
  }
  p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 17px;
  }
`
export const MainPageLabListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  li {
    padding: 14px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
  }
  li::before {
    content: '→';
    color: ${theme.brand};
    font-weight: 600;
  }
`
export const MainPageLabImgStyled = styled.div`
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 4/3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

/* FOR WHO */
export const MainPagePersonasStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const MainPagePersonaStyled = styled.div`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid ${theme.line};
  background: ${theme.surface};
`
export const MainPagePersonaImgStyled = styled.div<{ $src: string }>`
  height: 200px;
  background: ${(p) => `url("${p.$src}")`} center/cover no-repeat;
`
export const MainPagePersonaBodyStyled = styled.div`
  padding: 22px 24px 26px;
  h3 {
    font-family: ${theme.serif};
    font-size: 22px;
    margin: 0 0 6px;
    font-weight: 600;
  }
  p {
    margin: 0;
    color: ${theme.ink2};
    font-size: 15px;
  }
`

/* COMMUNITY */
export const MainPageCommBoxStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid ${theme.line};
  background: ${theme.surface};
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const MainPageCommImgStyled = styled.div`
  background: url(${communityImg}) center/cover no-repeat;
  min-height: 360px;
`
export const MainPageCommTextStyled = styled.div`
  padding: 56px 48px;
  ul {
    list-style: none;
    padding: 0;
    margin: 22px 0 0;
  }
  li {
    padding: 10px 0;
    color: ${theme.ink2};
    display: flex;
    gap: 12px;
  }
  li::before {
    content: '✓';
    color: ${theme.brand};
    font-weight: 700;
  }
  @media (max-width: 880px) {
    padding: 36px 28px;
  }
`

/* FINAL CTA */
export const MainPageFinalCTAStyled = styled.section`
  padding: 120px 24px;
  text-align: center;
  background:
    radial-gradient(ellipse at top, ${theme.brandSoft} 0%, transparent 60%),
    ${theme.bg};
`
