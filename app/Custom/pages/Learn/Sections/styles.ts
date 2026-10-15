import { styled } from '@linaria/react'
export const Block = styled.div`
  box-shadow: 0 0 2px 1px #aaa;
  margin: 10px 0;
  padding: 10px;
  .title {
    text-transform: capitalize;
    font-size: 1.2rem;
    padding: 4px;
    display: inline-block;
  }
  .nested {
    margin-left: 16px;
    box-shadow: none;
  }
  .nested .title {
    font-size: 1rem;
  }
  .challenge {
    margin-left: 24px;
    a {
      display: inline-block;
      margin: 6px 0;
    }
  }
`
