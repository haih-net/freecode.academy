import { theme } from 'app/Custom/theme'
import { styled } from '@linaria/react'
import { Form } from 'react-router'

export const UsersViewFiltersFormStyled = styled(Form)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 640px;

  > label {
    display: contents;

    input {
      flex: 1;
      height: 100%;
    }
  }
`

export const UsersViewStyled = styled.div`
  display: contents;

  h1 {
    margin: 0 0 8px;
    font-size: clamp(26px, 4vw, 34px);
  }
  .list-description {
    color: ${theme.colors.text.secondary};
    margin: 0 0 28px;
  }
`
export const UsersViewGridStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`
export const UsersViewCardStyled = styled.div`
  padding: 20px;
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  > a {
    font-weight: 700;
    text-decoration: none;
  }
  > a:hover {
    text-decoration: underline;
  }
  time {
    color: ${theme.colors.text.secondary};
    font-size: 13px;
  }
  @media (max-width: 559px) {
    > a {
      flex-basis: 100%;
    }
    > span {
      display: none;
    }
  }
`
