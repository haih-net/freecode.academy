import { styled } from '@linaria/react'
export const TechnologyStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-wrap: anywhere;
`
export const TableScroll = styled.div`
  max-width: 100%;
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #eee;
    text-align: left;
    vertical-align: top;
  }
`
