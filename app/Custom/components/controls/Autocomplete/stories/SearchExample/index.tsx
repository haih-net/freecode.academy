import type * as React from 'react'
import { useCallback, useState } from 'react'
import { Autocomplete } from '../..'
import type { ControlOption } from '../../../ListBox/interfaces'
import { options } from '../options'

export const SearchExample: React.FC = () => {
  const [items, setItems] = useState<ControlOption[]>([])
  const [value, setValue] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const select = useCallback((id: string | null): void => {
    setValue(id)
    setQuery(options.find((option) => option.id === id)?.text ?? '')
  }, [])

  const changeQuery = useCallback((text: string): void => {
    setQuery(text)
    setValue((id) =>
      options.find((option) => option.id === id)?.text === text ? id : null,
    )
  }, [])

  const search = useCallback(
    async (text: string, signal: AbortSignal): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (signal.aborted) {
        return
      }
      if (text === 'ошибка') {
        throw new Error('Не удалось загрузить города')
      }
      setItems(
        options.filter((option) =>
          option.text.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
        ),
      )
    },
    [],
  )

  return (
    <>
      <Autocomplete
        label="Город"
        options={items}
        value={value}
        onChange={select}
        inputValue={query}
        onInputChange={changeQuery}
        onSearch={search}
      />
      <p>Введите «ошибка», чтобы проверить ошибку загрузки.</p>
      <output aria-label="Выбранный город">{value ?? 'Не выбран'}</output>
    </>
  )
}
