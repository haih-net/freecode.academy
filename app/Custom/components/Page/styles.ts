import { Link } from 'react-router'
import { styled } from '@linaria/react'
import { theme } from '../../theme'
import heroImg from './assets/hero.jpg'

export const Container = styled.div`
  max-width: ${theme.maxw};
  margin: 0 auto;
  padding: 0 24px;
`

/* NAV */
export const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(140%) blur(14px);
  background: rgba(251, 250, 246, 0.78);
  border-bottom: 1px solid ${theme.line};
`
export const Logo = styled(Link)`
  font-family: ${theme.serif};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, ${theme.brand}, #b82f00);
    box-shadow: 0 2px 10px rgba(255, 91, 46, 0.35);
  }
`

export const NavInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;

  ${Logo} {
    margin: 10px;
  }
`

export const NavLinks = styled.nav`
  display: none;
  gap: 24px;
  font-size: 14px;
  color: ${theme.ink2};
  @media (min-width: 880px) {
    display: flex;
  }
  Link:hover {
    color: ${theme.ink};
  }
`

/* HERO */
export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px 0;
`
export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: url(${heroImg}) center/cover no-repeat;
  opacity: 0.55;
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 100%
  );
`
export const HeroInner = styled(Container)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HeroImage = styled.div<{ $src: string }>`
  background:
    ${(p) => `url("${p.$src}")`} center/cover no-repeat,
    ${theme.cream};
  border-radius: ${theme.radius};
  aspect-ratio: 5 / 4;
  border: 1px solid ${theme.line};
  box-shadow: 0 24px 60px -30px rgba(20, 18, 12, 0.25);
`

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  font-size: 13px;
  color: ${theme.ink2};
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${theme.brand};
  }
`
export const H1 = styled.h1`
  font-family: ${theme.serif};
  font-weight: 500;
  font-size: clamp(40px, 6.4vw, 84px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 22px auto 18px;
  max-width: 14ch;
  animation: freecodeFadeUp 0.7s ease both;
  em {
    font-style: italic;
    color: ${theme.brand};
  }
`
export const Sub = styled.p`
  max-width: 640px;
  margin: 12px auto;
  font-size: 19px;
  color: ${theme.ink2};
  animation: freecodeFadeUp 0.8s ease both;
`
export const Support = styled.p`
  max-width: 520px;
  margin: 0 auto 36px;
  font-size: 15px;
  color: ${theme.muted};
`
export const CTAGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`
export const PrimaryBtn = styled.button`
  background: ${theme.ink};
  color: #fff;
  padding: 12px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  /* box-shadow: 0 10px 30px rgba(14, 15, 18, 0.18); */
  &:hover {
    transform: translateY(-2px);
    /* box-shadow: 0 16px 40px rgba(14, 15, 18, 0.22); */
  }
`
export const GhostBtn = styled(Link)`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  color: ${theme.ink};
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s ease;
  &:hover {
    background: ${theme.cream};
  }
`

/* SECTION primitives */

type SectionProps = { $tone?: 'cream' | 'white' | 'bg' }

export const Section = styled.section<SectionProps>`
  padding: 48px 0;
  background: ${(p) =>
    p.$tone === 'cream'
      ? theme.cream
      : p.$tone === 'white'
        ? theme.surface
        : theme.bg};
`
export const SectionHead = styled.div`
  max-width: 720px;
  margin: 0 auto 56px;
  text-align: center;
`

export const SectionLede = styled.p`
  font-size: 17px;
  color: ${theme.ink2};
  max-width: 640px;
  margin: 0 0 40px;
`

export const Kicker = styled.div`
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${theme.brand};
  font-weight: 600;
  margin-bottom: 14px;
`
export const H2 = styled.h2`
  font-family: ${theme.serif};
  font-size: clamp(32px, 4.4vw, 54px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-weight: 500;
  margin: 0 0 16px;
`
export const Lead = styled.p`
  color: ${theme.ink2};
  font-size: 17px;
  margin: 0;
`

/* CORE IDEA - split */
export const Split = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const SplitText = styled.div`
  p {
    color: ${theme.ink2};
    font-size: 17px;
    margin: 0 0 14px;
  }
  strong {
    color: ${theme.ink};
  }
`
export const SplitImage = styled.div`
  position: relative;
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

/* DIFFERENT - cards grid */
export const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols ?? 2}, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const Card = styled.article`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 30px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -20px rgba(14, 15, 18, 0.18);
    border-color: #d8d3c5;
  }
`

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: ${theme.radius};
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 50px -28px rgba(20, 18, 12, 0.25);
    border-color: #d9d4c5;
  }
`

export const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: ${theme.brandSoft};
  color: ${theme.brand};
  font-weight: 700;
  font-family: ${theme.serif};
  font-size: 18px;
  margin-bottom: 18px;
`
export const CardTitle = styled.h3`
  font-family: ${theme.serif};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
`
export const CardText = styled.p`
  color: ${theme.ink2};
  font-size: 15px;
  margin: 0;
`

export const CardImg = styled.div<{ $src: string }>`
  background:
    ${(p) => `url("${p.$src}")`} center/cover no-repeat,
    ${theme.cream};
  aspect-ratio: 16 / 10;
  border-bottom: 1px solid ${theme.line};
`
export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`

export const CardMeta = styled.div`
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.muted};
  display: flex;
  align-items: center;
  gap: 6px;
`

/* ---------- Locked notice ---------- */

export const LockedNotice = styled.div`
  padding: 14px 18px;
  background: ${theme.cream};
  border: 1px dashed #cfc8b3;
  border-radius: 12px;
  font-size: 14px;
  color: ${theme.ink2};
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '🔒';
  }
`

export const VisuallyHiddenTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`
