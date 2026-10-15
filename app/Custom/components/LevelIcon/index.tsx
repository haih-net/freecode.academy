import React from 'react'

export type LevelIconVariant = 'strategy' | 'rating'

type LevelIconProps = {
  variant?: LevelIconVariant
  level: number
  maxLevel?: number
  userLevel?: number
}

const bars = [
  { x: 1, y: 16, height: 4 },
  { x: 5.5, y: 14, height: 6 },
  { x: 10, y: 11, height: 9 },
  { x: 14.5, y: 7, height: 13 },
  { x: 19, y: 3, height: 17 },
]

const COLORS = {
  strategy: {
    active: '#6b7280',
    inactive: '#d1d5db',
    userActive: '#22c55e',
    userRequired: '#15803d',
    userMissing: '#dc2626',
  },
  rating: {
    active: '#f59e0b',
    inactive: '#d1d5db',
  },
}

const getBarColor = (
  barIndex: number,
  level: number,
  variant: LevelIconVariant,
  userLevel?: number,
): string => {
  const barLevel = barIndex + 1

  if (variant === 'rating') {
    const colors = COLORS.rating
    return barLevel <= level ? colors.active : colors.inactive
  }

  const colors = COLORS.strategy

  if (userLevel === undefined) {
    return barLevel <= level ? colors.active : colors.inactive
  }

  if (userLevel >= level) {
    if (barLevel <= level) {
      return colors.userRequired
    }
    if (barLevel <= userLevel) {
      return colors.userActive
    }
    return colors.inactive
  }

  if (barLevel <= userLevel) {
    return colors.active
  }
  if (barLevel <= level) {
    return colors.userMissing
  }
  return colors.inactive
}

export const LevelIcon: React.FC<LevelIconProps> = ({
  variant = 'strategy',
  level,
  maxLevel,
  userLevel,
}) => {
  let displayLevel = level

  if (maxLevel && maxLevel !== 5) {
    displayLevel = Math.ceil((level / maxLevel) * 5)
  }

  return (
    <svg viewBox="0 0 24 24">
      {bars.map((bar, index) => (
        <rect
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          x={bar.x}
          y={bar.y}
          width={3}
          height={bar.height}
          rx={0.5}
          fill={getBarColor(index, displayLevel, variant, userLevel)}
        />
      ))}
    </svg>
  )
}
