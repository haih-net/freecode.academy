import { styled } from '@linaria/react'
import { theme } from '../../theme'
export const DetailContainer = styled.div`
  padding: 15px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-wrap: anywhere;
`
export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 24px;
`
export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`
export const Status = styled.span<{ $status: string }>`
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  background: ${({ $status }) => ($status.toLowerCase() === 'blocked' ? '#fee2e2' : $status.toLowerCase() === 'newbie' ? '#fef3c7' : '#dcfce7')};
  color: ${({ $status }) => ($status.toLowerCase() === 'blocked' ? '#991b1b' : $status.toLowerCase() === 'newbie' ? '#92400e' : '#166534')};
`
