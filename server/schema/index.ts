import { builder } from './builder'
import './statistics'

import './types/User'
import './types/files'
import './types/imageGeneration'

export const schema = builder.toSchema()
