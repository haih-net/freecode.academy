import { theme } from '../../theme'
import { styled } from '@linaria/react'

/* ---------- Badge ---------- */

type BadgeElProps = {
  $tone?: 'brand' | 'blue' | 'green' | 'amber' | 'muted' | 'ink'
}

export const BadgeEl = styled.span<BadgeElProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  background: ${(p) =>
    p.$tone === 'brand'
      ? '#FFE4D6'
      : p.$tone === 'blue'
        ? '#E1E8FF'
        : p.$tone === 'green'
          ? '#D8F1E2'
          : p.$tone === 'amber'
            ? '#FBEACA'
            : p.$tone === 'ink'
              ? theme.ink
              : '#EFEDE5'};
  color: ${(p) =>
    p.$tone === 'brand'
      ? '#9A2B00'
      : p.$tone === 'blue'
        ? '#1E3DB0'
        : p.$tone === 'green'
          ? '#1B7A47'
          : p.$tone === 'amber'
            ? '#9A6800'
            : p.$tone === 'ink'
              ? '#fff'
              : theme.ink2};
`

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  &:empty {
    display: none;
  }
`
