import { useCallRoomMutations } from '../../components/Calls/hooks/useCallRoomMutations'
import type { CallRoomFormData } from '../../components/Calls/interfaces'
import { CallRoomList } from 'app/Custom/components/Calls/RoomList'
import { useCallback } from 'react'
import type * as React from 'react'
import { Link, useNavigate } from 'react-router'
import { Video, MonitorUp } from 'lucide-react'
import { useAppContext } from 'app/Custom/components/AppContext'
import { CallsStyled } from 'app/Custom/components/Calls/styles'

import { CallRoomForm } from 'app/Custom/components/Calls/RoomForm'

export const CallsPage: React.FC = () => {
  const { user } = useAppContext() ?? {}
  const { createRoom } = useCallRoomMutations()
  const navigate = useNavigate()
  const save = useCallback(
    async (data: CallRoomFormData): Promise<void> => {
      if (!createRoom) {
        throw new Error('Управление звонками недоступно')
      }
      const id = await createRoom(data)
      void navigate(
        `/calls/${id}${data.accessCode ? `#code=${encodeURIComponent(data.accessCode)}` : ''}`,
      )
    },
    [createRoom, navigate],
  )

  return (
    <>
      <div>
        <h1 tabIndex={-1}>Видеозвонки</h1>
      </div>
      <CallsStyled>
        {user?.sudo === true && (
          <section className="panel create-room">
            <h2>Начать новый звонок</h2>
            <p className="hint">
              Создайте комнату и отправьте участникам приглашение.
            </p>
            <CallRoomForm onSave={save} />
          </section>
        )}
        {user?.sudo && <CallRoomList />}
        <div className="calls-content">
          <section className="page-card">
            <span className="eyebrow">Рядом, даже на расстоянии</span>
            <h2>Общайтесь по видеосвязи</h2>
            <p>
              Создайте комнату и отправьте ссылку участникам. Общайтесь голосом,
              включайте камеры и делитесь экраном.
            </p>
            <div className="call-invite">
              <Video size={26} aria-hidden="true" />
              <div>
                <strong>Вас пригласили на звонок?</strong>
                <p>
                  Откройте ссылку приглашения. Перед входом можно проверить
                  камеру и микрофон.
                </p>
              </div>
            </div>
            <div className="actions">
              <Link to="/calls/devices">Проверить устройства</Link>
            </div>
          </section>
          <section className="page-group">
            <h2>Возможности звонков</h2>
            <div className="feature-grid">
              <article className="feature">
                <Video aria-hidden="true" />
                <h3>Живой разговор</h3>
                <p>
                  Общайтесь с участниками голосом и по видео, обсуждайте идеи и
                  задавайте вопросы.
                </p>
              </article>
              <article className="feature">
                <MonitorUp aria-hidden="true" />
                <h3>Демонстрация экрана</h3>
                <p>
                  Показывайте документы, презентации и приложения, чтобы
                  обсуждать их вместе.
                </p>
              </article>
            </div>
          </section>
        </div>
      </CallsStyled>
    </>
  )
}
