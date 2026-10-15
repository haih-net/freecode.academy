import React from 'react'
import type { PublicAuthor } from '../../types/menu'
import { getResizedImagePath } from '../../helpers/getResizedImagePath'
type UserAvatarProps = {
  user: PublicAuthor | null
  size?: 'small' | 'normal' | 'big'
  className?: string
}
import { AvatarStyled } from './styles'

export const Avatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'normal',
  className,
}) => {
  if (!user) {
    return null
  }

  const { image, username, fullname } = user
  const name = fullname || username || ''

  let url
  if (image) {
    url = getResizedImagePath({ path: image, size: 'thumb' })
  }

  return (
    <AvatarStyled $size={size} className={className}>
      {url ? (
        <img src={url} alt={name} />
      ) : (
        (name && name.substring(0, 1).toUpperCase()) || 'A'
      )}
    </AvatarStyled>
  )
}
