import { theme } from '../../theme'
import { styled } from '@linaria/react'

/* ---------- Why-strip (the "what you can do here" callout) ---------- */

export const WhyStrip = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 32px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`
export const WhyItem = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 14px;
  padding: 18px 20px;
  strong {
    font-family: ${theme.serif};
    font-size: 17px;
    display: block;
    margin-bottom: 4px;
  }
  span {
    color: ${theme.muted};
    font-size: 14px;
  }
`
