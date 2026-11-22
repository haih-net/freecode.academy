import { styled } from '@linaria/react'
import { FormStyled } from '../../Form/styles'
import { SelectTriggerStyled } from '../../controls/Select/styles'
import { theme } from 'app/Custom/theme'

export const CallRoomFormStyled = styled(FormStyled)`
  ${SelectTriggerStyled} {
    background: white;
  }

  .code-actions {
    align-self: flex-start;
  }

  .form-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 14px;
    padding-top: 20px;
    border-top: 1px solid ${theme.colors.border};
  }

  @media (min-width: 560px) {
    .form-actions {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
  }
`
