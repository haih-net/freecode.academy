import type { ControlCollectionProps } from '../interfaces'

export const getDisabledKeys = ({
  options = [],
  groups = [],
}: ControlCollectionProps): string[] =>
  [...options, ...groups.flatMap((group) => group.items)]
    .filter((item) => item.disabled)
    .map((item) => item.id)
