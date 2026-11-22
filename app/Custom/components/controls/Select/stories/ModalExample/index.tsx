import type * as React from 'react'
import { useCallback, useState } from 'react'
import { Modal } from '../../../../Modal'
import { Button } from '../../../../Button'
import { FormExample } from '../FormExample'

export const ModalExample: React.FC = () => {
  const [open, setOpen] = useState(false)
  const show = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  return (
    <>
      <Button onClick={show}>Открыть настройки</Button>
      <Modal isOpen={open} onClose={close} title="Настройки">
        <FormExample />
      </Modal>
    </>
  )
}
