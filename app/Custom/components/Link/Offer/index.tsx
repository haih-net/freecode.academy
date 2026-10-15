import type * as React from 'react'
import { Link, type LinkProps } from 'react-router'
import type { MenuItem } from '../../../types/menu'

type LinkObject = Pick<MenuItem, 'id' | 'title'>
type OfferLinkProps = Omit<LinkProps, 'to'> & {
  offer: LinkObject | null | undefined
}

export function makeOfferLink(object: LinkObject): string {
  return `/offers/${object.id}`
}

export const OfferLink: React.FC<OfferLinkProps> = ({
  offer,
  children,
  ...other
}) => {
  if (!offer) {return null}
  return (
    <Link to={makeOfferLink(offer)} title={offer.title || undefined} {...other}>
      {children ?? offer.title}
    </Link>
  )
}
