import { styled } from '@linaria/react'
export const PostStyled = styled.article<{ $full: boolean }>`
  padding: ${(p) => (p.$full ? '0' : '16px')};
  border: ${(p) => (p.$full ? 'none' : '1px solid #eee')};
  border-radius: 8px;
  overflow-wrap: anywhere;
  h2 {
    font-size: ${(p) => (p.$full ? '2rem' : '1.25rem')};
    margin-bottom: 16px;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .status {
    font-size: 12px;
    color: #166534;
    background: #dcfce7;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .intro {
    font-size: 1.125rem;
    color: #444;
    font-style: italic;
  }
`
