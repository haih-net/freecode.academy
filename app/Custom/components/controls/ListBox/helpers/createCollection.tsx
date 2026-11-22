import type { CollectionElement, ItemElement } from '@react-types/shared'
import { Item, Section } from 'react-stately'
import type { ControlCollectionProps, ControlOption } from '../interfaces'

const createItem = (item: ControlOption): ItemElement<ControlOption> => (
  <Item key={item.id} textValue={item.text}>
    {item.content ?? item.text}
  </Item>
)

export const createCollection = ({
  options = [],
  groups = [],
}: ControlCollectionProps): CollectionElement<ControlOption>[] => [
  ...options.map(createItem),
  ...groups
    .filter((group) => group.items.length > 0)
    .map((group) => (
      <Section
        key={group.id}
        title={group.hideLabel ? undefined : group.label}
        aria-label={group.label}
      >
        {group.items.map(createItem)}
      </Section>
    )),
]
