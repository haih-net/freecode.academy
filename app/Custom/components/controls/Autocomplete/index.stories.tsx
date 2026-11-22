import type { Meta, StoryObj } from '@storybook/react-vite'
import { Autocomplete } from './index'
import { options, groups } from './stories/options'
import { SearchExample } from './stories/SearchExample'

const meta = {
  title: 'UI Kit/controls/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  args: { label: 'Город', options },
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Grouped: Story = { args: { options: undefined, groups } }
export const Selected: Story = { args: { defaultValue: 'moscow' } }
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'moscow' },
}
export const Loading: Story = { args: { options: [], loading: true } }
export const Error: Story = {
  args: { options: [], error: 'Не удалось загрузить города' },
}
export const Empty: Story = { args: { options: [] } }
export const RemoteSearch: Story = { render: () => <SearchExample /> }
