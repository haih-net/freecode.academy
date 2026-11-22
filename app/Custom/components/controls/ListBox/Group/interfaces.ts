import type { Node } from '@react-types/shared'
import type { ListState } from 'react-stately'
import type { ControlOption } from '../interfaces'

export interface GroupProps {
  section: Node<ControlOption>
  state: ListState<ControlOption>
}
