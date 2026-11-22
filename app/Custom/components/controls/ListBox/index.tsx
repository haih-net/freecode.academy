import type * as React from 'react'
import { useListBox } from 'react-aria'
import { Option } from './Option'
import { Group } from './Group'
import type { ListBoxProps } from './interfaces'
import { ListBoxStyled, StatusStyled } from './styles'

export const ListBox: React.FC<ListBoxProps> = ({
  state,
  listBoxProps,
  listBoxRef,
  loading,
  error,
  renderEmptyContent,
  onClose,
}) => {
  const { listBoxProps: props } = useListBox(listBoxProps, state, listBoxRef)
  const empty = Array.from(state.collection).every(
    (item) =>
      item.type === 'section' &&
      !Array.from(state.collection.getChildren?.(item.key) ?? []).length,
  )

  return (
    <>
      {loading && <StatusStyled role="status">Загрузка…</StatusStyled>}
      {error && <StatusStyled role="alert">{error}</StatusStyled>}
      {!loading && !error && empty && (
        <>
          <StatusStyled role="status">Ничего не найдено</StatusStyled>
          {renderEmptyContent?.(onClose)}
        </>
      )}
      <ListBoxStyled
        {...props}
        ref={listBoxRef}
        aria-busy={loading || undefined}
      >
        {Array.from(state.collection, (item) =>
          item.type === 'section' ? (
            <Group key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          ),
        )}
      </ListBoxStyled>
    </>
  )
}
