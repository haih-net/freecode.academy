import { styled } from '@linaria/react'
import { theme } from '../../theme'
export const TopicsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`
export const TopicStyled = styled.article`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
`
export const MetaStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 24px;
  flex-wrap: wrap;
`
export const ContentStyled = styled.div`
  line-height: 1.6;
  overflow-wrap: anywhere;
  &:empty {
    display: none;
  }
`
