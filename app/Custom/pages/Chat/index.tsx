import type * as React from 'react'
import { ChatStyled } from './styles'
export const ChatPage: React.FC = () => (
  <ChatStyled>
    <h1 tabIndex={-1}>Привет! Чем могу помочь?</h1>
    <p>Спросите что угодно</p>
  </ChatStyled>
)
