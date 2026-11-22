import type * as React from 'react'
import { useCallback, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../Button'
import { TextFieldStyled } from './styles'

export interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  masked?: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  masked = false,
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [visible, setVisible] = useState(false)
  const canReveal = type === 'password' || (type === 'text' && masked)
  const StateIcon = visible ? Eye : EyeOff
  const ActionIcon = visible ? EyeOff : Eye
  const toggleVisibility = useCallback(() => setVisible((value) => !value), [])

  return (
    <TextFieldStyled data-reveal={canReveal || undefined}>
      <input
        {...props}
        id={inputId}
        disabled={disabled}
        type={type === 'password' && visible ? 'text' : type}
        data-masked={(type === 'text' && masked && !visible) || undefined}
      />
      {canReveal && (
        <Button
          variant="ghost"
          size="small"
          disabled={disabled}
          onClick={toggleVisibility}
          aria-label={visible ? 'Скрыть содержимое' : 'Показать содержимое'}
          aria-controls={inputId}
        >
          <StateIcon data-icon="state" size={20} aria-hidden="true" />
          <ActionIcon data-icon="action" size={20} aria-hidden="true" />
        </Button>
      )}
    </TextFieldStyled>
  )
}
