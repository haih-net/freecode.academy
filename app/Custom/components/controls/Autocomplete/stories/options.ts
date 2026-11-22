import type { ControlOption, ControlGroup } from '../../ListBox/interfaces'

export const options: ControlOption[] = [
  { id: 'moscow', text: 'Москва' },
  { id: 'petersburg', text: 'Санкт-Петербург' },
  { id: 'kazan', text: 'Казань' },
  { id: 'unavailable', text: 'Недоступный город', disabled: true },
]
export const groups: ControlGroup[] = [
  { id: 'capitals', label: 'Столицы', items: options.slice(0, 2) },
  { id: 'other', label: 'Другие города', items: options.slice(2) },
]
