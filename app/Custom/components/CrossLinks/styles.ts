import { Link } from 'react-router'
import { theme } from '../../theme'
import { styled } from '@linaria/react'

/* ---------- Cross-link block ---------- */

export const CrossLinks = styled.div`
  margin-top: 64px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
export const CrossCard = styled(Link)`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition:
    border-color 0.2s,
    transform 0.2s;
  &:hover {
    border-color: ${theme.ink};
    transform: translateY(-2px);
  }
  strong {
    font-family: ${theme.serif};
    font-size: 18px;
  }
  span {
    color: ${theme.muted};
    font-size: 14px;
  }
  em {
    font-style: normal;
    color: ${theme.brand};
    font-weight: 600;
    font-size: 13px;
    margin-top: 4px;
  }
`
