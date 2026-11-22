import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'app/Custom/components/Button'
import { ManagedUserForm } from '../User/View/ManagedUserForm'
import { UserFragment } from 'app/gql/generated'
import {
  UsersViewStyled,
  UsersViewGridStyled,
  UsersViewCardStyled,
  UsersViewFiltersFormStyled,
} from './styles'
import { SeparatorStyled } from 'app/Custom/components/Separator/styles'
import { StatusToggler } from '../User/View/StatusToggler'
import { FormattedDate } from 'app/Custom/components/FormattedDate'
import { Pagination } from 'app/Custom/components/Pagination'
import { UserLink, createUserLink } from 'app/Custom/components/Link/User'
import { useBoolean } from 'app/Custom/hooks/useBoolean'

type UsersViewProps = {
  users: UserFragment[]
  count: number
  search?: string
  page: number
  limit: number
}

export const UsersView: React.FC<UsersViewProps> = ({
  users,
  count,
  limit,
  page,
  search,
}) => {
  const [creating, setCreatingOn, setCreatingOff] = useBoolean(false)
  const navigate = useNavigate()
  const openUser = useCallback(
    (id: string) => {
      void navigate(createUserLink({ id }))
    },
    [navigate],
  )

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <UsersViewStyled>
      <h1>Пользователи</h1>
      <UsersViewFiltersFormStyled method="get" key={search ?? ''}>
        <label>
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Емейл, юзернейм или ФИО"
          />
        </label>
        <Button type="submit">Поиск</Button>
      </UsersViewFiltersFormStyled>
      {creating ? (
        <ManagedUserForm closeForm={setCreatingOff} onCreated={openUser} />
      ) : (
        <div>
          <Button onClick={setCreatingOn}>Создать пользователя</Button>
        </div>
      )}
      <p className="list-description">Участники сообщества · {count}</p>

      <UsersViewGridStyled>
        {users.map((user) => (
          <UsersViewCardStyled key={user.id}>
            <UserLink user={user} />

            <SeparatorStyled />

            <FormattedDate value={user.createdAt} />
            <StatusToggler user={user} />
          </UsersViewCardStyled>
        ))}
      </UsersViewGridStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </UsersViewStyled>
  )
}
