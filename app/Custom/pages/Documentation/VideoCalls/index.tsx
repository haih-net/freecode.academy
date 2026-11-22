import type * as React from 'react'
import { Link } from 'react-router'
import { Markdown } from 'app/Custom/components/Markdown'
import { DocumentationStyled } from '../styles'
import { videoCallsDocumentation } from './content'

export const VideoCallsDocumentationPage: React.FC = () => (
  <DocumentationStyled>
    <nav aria-label="Документация">
      <Link to="/docs">Документация</Link>
      <Link to="/calls">Создать звонок</Link>
      <Link to="/calls/devices">Проверка устройств</Link>
      <a href="#system-additions">Что реализовано в системе</a>
    </nav>
    <h1 tabIndex={-1}>Видеозвонки</h1>
    <p className="status">
      Групповой P2P · Восстановление связи · Проверка устройств
    </p>
    <Markdown>{videoCallsDocumentation}</Markdown>
  </DocumentationStyled>
)
