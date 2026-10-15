import { styled } from '@linaria/react'
export const UserPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  h1 {
    flex: 1;
  }
`
export const Avatar = styled.img`
  border-radius: 50%;
  float: left;
  margin: 0 15px 15px 0;
  max-width: 100%;
`
export const Info = styled.div`
  clear: both;
`
