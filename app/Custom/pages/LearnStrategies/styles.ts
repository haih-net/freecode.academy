import { styled } from '@linaria/react'

export const LearnStrategiesViewHeaderStyled = styled.div`
  margin-bottom: 24px;
`

export const LearnStrategiesViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StrategiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const StrategyCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'title level'
    'description description'
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

export const StrategyCardTitle = styled.h3`
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

export const StrategyCardDescription = styled.p`
  grid-area: description;
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const StrategyCardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const StrategyCardMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: #6b7280;

  svg {
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }
`

export const StrategyCardLevel = styled.div`
  grid-area: level;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: help;
  align-self: center;

  svg {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }
`

export const StrategyCardAuthor = styled.div`
  grid-area: author;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: center;
`

export const StrategyCardMembers = styled.div`
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
