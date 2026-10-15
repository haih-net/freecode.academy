import { styled } from '@linaria/react'

export const TechnologiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const TechnologyCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'title title'
    'author members';
  gap: 8px;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

export const TechnologyCardTitle = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  align-self: center;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
    }
  }
`

export const TechnologyCardAuthor = styled.div`
  grid-area: author;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: center;
`

export const TechnologyCardMembers = styled.div`
  grid-area: members;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: 0.8125rem;
  color: #6b7280;
  align-self: center;

  svg {
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }
`

export const TechnologiesViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
