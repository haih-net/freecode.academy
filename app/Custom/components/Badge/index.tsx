import type * as React from 'react'
import { BadgeEl } from './styles'
export const Badge: React.FC<
  React.PropsWithChildren<{
    tone?: 'brand' | 'blue' | 'green' | 'amber' | 'muted' | 'ink'
  }>
> = ({ children, tone }) => <BadgeEl $tone={tone}>{children}</BadgeEl>
