import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './index'
import { options, groups } from './stories/options'
import { FormExample } from './stories/FormExample'
import { ModalExample } from './stories/ModalExample'

const meta = {
  title: 'UI Kit/controls/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Кто может войти', options, defaultValue: 'everyone' },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Placeholder: Story = { args: { defaultValue: null } }
export const Grouped: Story = { args: { options: undefined, groups } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { 'aria-invalid': true } }
export const InForm: Story = { render: () => <FormExample /> }
export const InModal: Story = { render: () => <ModalExample /> }
