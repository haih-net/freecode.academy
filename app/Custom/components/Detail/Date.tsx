import type * as React from 'react'
import { FormattedDate } from '../FormattedDate'
export const DetailDate: React.FC<{
  value: string
  time?: boolean
  format?: React.ComponentProps<typeof FormattedDate>['format']
}> = ({ value, time = false, format }) => (
  <time dateTime={value}>
    <FormattedDate
      value={value}
      format={format ?? (time ? 'dateTimeMedium' : 'dateMedium')}
    />
  </time>
)
