import type { Node } from '@react-types/shared'
import type { ListState } from 'react-stately'
import type { ControlOption } from '../interfaces'

export interface OptionProps {
  item: Node<ControlOption>
  state: ListState<ControlOption>
}
