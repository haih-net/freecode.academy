// @vitest-environment jsdom
import React from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Header } from './index'

const { context } = vi.hoisted(() => ({
  context: {
    user: null as null | { sudo: boolean; username: string },
    userLoading: false,
  },
}))

vi.mock('app/Custom/components/AppContext', () => ({
  useAppContext: () => context,
}))
vi.mock('../../components/Chat/hooks/useOpenChatWithMessage', () => ({
  useOpenChatWithMessage: () => vi.fn(),
}))
vi.mock('../../components/Auth/SignOutButton', () => ({
  SignOutButton: () => null,
}))
vi.mock('app/Custom/components/UserAvatar', () => ({ UserAvatar: () => null }))

afterEach(cleanup)

it.each([
  { name: 'гость', user: null, visible: false },
  {
    name: 'обычный пользователь',
    user: { sudo: false, username: 'user' },
    visible: false,
  },
  { name: 'sudo', user: { sudo: true, username: 'admin' }, visible: true },
])('меню звонков и документации: $name', ({ user, visible }) => {
  context.user = user
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
  for (const name of ['Видеозвонки', 'Документация']) {
    const link = screen.queryByRole('link', { name })
    if (visible) {
      expect(link).not.toBeNull()
    } else {
      expect(link).toBeNull()
    }
  }
  expect(
    screen.getByRole('link', { name: 'На главную' }).getAttribute('href'),
  ).toBe('/')
})
