import { styled } from '@linaria/react'
export const BadgeStyled = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #e3f2fd;
  color: #1976d2;
  &[data-status='PROGRESS'],
  &[data-status='DISCUSS'] {
    background: #fff3e0;
    color: #f57c00;
  }
  &[data-status='DONE'],
  &[data-status='COMPLETED'],
  &[data-status='ACCEPTED'] {
    background: #e8f5e9;
    color: #388e3c;
  }
  &[data-status='REJECTED'],
  &[data-status='REVISIONSREQUIRED'] {
    background: #ffebee;
    color: #d32f2f;
  }
  &[data-status='PAUSED'] {
    background: #f3e5f5;
    color: #7b1fa2;
  }
`
