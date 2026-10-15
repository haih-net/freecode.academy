import type * as React from 'react'
import { useLoaderData } from 'react-router'
import type { DetailPageData } from '../../../types/detail'
import { Markdown } from '../../../components/Markdown'
import { UserLink } from '../../../components/Link/User'
import { DetailDate } from '../../../components/Detail/Date'
import { Meta } from '../../../components/Detail/styles'
import { getResizedImagePath } from '../../../helpers/getResizedImagePath'
import { OfferStyled, ImageStyled, Placeholder, Title, Content } from './styles'
export const OfferPage: React.FC = () => {
  const { record: offer } = useLoaderData<DetailPageData>()
  const image =
    offer.image && !offer.image.startsWith('http')
      ? getResizedImagePath({ path: offer.image, size: 'middle' })
      : null
  return (
    <OfferStyled>
      <ImageStyled>
        {image ? (
          <img src={image} alt={offer.title || ''} />
        ) : (
          <Placeholder>📦</Placeholder>
        )}
      </ImageStyled>
      <Title tabIndex={-1}>{offer.title}</Title>
      <Meta>
        <DetailDate value={offer.createdAt} />
        {offer.CreatedBy && <UserLink user={offer.CreatedBy} />}
      </Meta>
      <Content>
        <Markdown>{offer.content}</Markdown>
      </Content>
    </OfferStyled>
  )
}
