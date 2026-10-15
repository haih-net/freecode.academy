import { styled } from '@linaria/react'

export const LearnStrategyViewStyled = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;

  & & {
    border: none;
    box-shadow: none;
  }
`

export const LearnStrategyViewToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const LearnStrategyTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
    }
  }
`

export const LearnStrategyLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: help;

  svg {
    width: 14px;
    height: 14px;
    color: #6b7280;
  }
`

export const LearnStrategyChildrenContainer = styled.div`
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
