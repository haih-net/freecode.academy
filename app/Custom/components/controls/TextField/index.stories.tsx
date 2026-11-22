import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './index'

const meta = {
  title: 'UI Kit/controls/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Текстовое поле',
    placeholder: 'Введите значение',
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AccessCode: Story = {
  args: {
    'aria-label': 'Код доступа',
    defaultValue: 'Код-комнаты-123',
    masked: true,
    autoComplete: 'off',
  },
}

export const Password: Story = {
  args: {
    'aria-label': 'Пароль',
    type: 'password',
    defaultValue: 'Пример-пароля-123',
    autoComplete: 'current-password',
  },
}

export const Disabled: Story = {
  args: { ...AccessCode.args, disabled: true },
}

export const ReadOnly: Story = {
  args: { ...AccessCode.args, readOnly: true },
}
