import { styled } from '@linaria/react'
import { theme } from '../../../theme'
export const OfferStyled = styled.article`
  background: ${theme.backgrounds.paper};
  padding: 20px;
  border-radius: 20px;
  overflow-wrap: anywhere;
  @media (min-width: 768px) {
    padding: 32px;
  }
  @media (min-width: 992px) {
    padding: 48px;
  }
`
export const ImageStyled = styled.div`
  position: relative;
  overflow: hidden;
  background: ${theme.colors.gray[100]};
  aspect-ratio: 21/9;
  border-radius: 16px;
  margin-bottom: 24px;
  @media (min-width: 992px) {
    margin-bottom: 32px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.gray[100]},
    ${theme.colors.gray[200]}
  );
  color: ${theme.colors.gray[400]};
  font-size: 7rem;
`
export const Title = styled.h1`
  margin: 0 0 12px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1.3;
  letter-spacing: -0.02em;
  font-size: 1.75rem;
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
  @media (min-width: 992px) {
    font-size: 2.75rem;
  }
`
export const Content = styled.div`
  max-width: 720px;
  line-height: 1.7;
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  @media (min-width: 992px) {
    font-size: 1.0625rem;
  }
  h2 {
    color: ${theme.colors.text.primary};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 32px 0 16px;
  }
  h3 {
    color: ${theme.colors.text.primary};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 24px 0 12px;
  }
  p {
    margin: 0 0 16px;
  }
  ul,
  ol {
    margin: 0 0 16px;
    padding-left: 24px;
  }
  li {
    margin-bottom: 8px;
  }
`
