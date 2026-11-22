import type * as React from 'react'
import { useListBoxSection } from 'react-aria'
import { Option } from '../Option'
import type { GroupProps } from './interfaces'
import { GroupStyled, GroupTitleStyled, GroupItemsStyled } from './styles'

export const Group: React.FC<GroupProps> = ({ section, state }) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  })

  return (
    <GroupStyled {...itemProps}>
      {section.rendered && (
        <GroupTitleStyled {...headingProps}>
          {section.rendered}
        </GroupTitleStyled>
      )}
      <GroupItemsStyled {...groupProps}>
        {Array.from(
          state.collection.getChildren?.(section.key) ?? [],
          (item) => (
            <Option key={item.key} item={item} state={state} />
          ),
        )}
      </GroupItemsStyled>
    </GroupStyled>
  )
}
