import { styled } from '@linaria/react'
export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) auto auto auto auto;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    background: #f9fafb;
  }
`
export const Cell = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  background: #fff;
  min-width: 0;
  &:empty {
    display: none;
  }
  @media (min-width: 768px) {
    &:empty {
      display: initial;
    }
    padding: 8px 16px;
    border-bottom: 1px solid #e5e7eb;
  }
`
export const Header = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: contents;
  }
  > ${Cell} {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    background: #f9fafb;
    border-bottom: 2px solid #e5e7eb;
  }
`
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px #0000001a;
  @media (min-width: 768px) {
    display: contents;
    &:hover > ${Cell} {
      background: #f9fafb;
    }
  }
`
export const Label = styled.span`
  font-size: 12px;
  color: #6b7280;
  margin-right: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`
export const Level = styled.span<{ $level: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  background: ${({ $level }) => ($level >= 8 ? '#dcfce7' : $level >= 5 ? '#dbeafe' : $level >= 3 ? '#fef3c7' : '#f3f4f6')};
  color: ${({ $level }) => ($level >= 8 ? '#166534' : $level >= 5 ? '#1e40af' : $level >= 3 ? '#92400e' : '#6b7280')};
`
export const Chip = styled.span<{ $color: string; $bg: string }>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
`
export const Dates = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
`
