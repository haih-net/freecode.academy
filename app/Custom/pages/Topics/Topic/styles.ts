import { styled } from '@linaria/react'
export const TopicStyled = styled.article`
  line-height: 1.6;
  overflow-wrap: anywhere;
`
export const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 16px;
`
export const Comments = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const Comment = styled.article`
  line-height: 1.6;
`
export const BlogEntry = styled.article`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
`
