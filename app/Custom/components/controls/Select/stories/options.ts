import type { ControlOption, ControlGroup } from '../../ListBox/interfaces'

export const options: ControlOption[] = [
  { id: '', text: 'По умолчанию' },
  { id: 'everyone', text: 'Всем по ссылке' },
  { id: 'authenticated', text: 'Только авторизованным' },
  { id: 'unavailable', text: 'Недоступный вариант', disabled: true },
]
export const groups: ControlGroup[] = [
  { id: 'access', label: 'Доступ', items: options.slice(1, 3) },
  { id: 'other', label: 'Остальное', items: [options[0], options[3]] },
]
