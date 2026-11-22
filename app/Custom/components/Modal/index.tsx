import React, { useEffect, useCallback, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { UNSAFE_PortalProvider } from 'react-aria'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
} from './styles'

interface ModalProps {
  isOpen: boolean
  onClose: (() => void) | undefined
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const pointerDownOnOverlay = useRef(false)
  const getContainer = useCallback(
    (): HTMLElement | null => overlayRef.current,
    [],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault()
        onClose()
      }
    },
    [onClose],
  )

  const handleOverlayPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>): void => {
      pointerDownOnOverlay.current = e.target === e.currentTarget
    },
    [],
  )

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        pointerDownOnOverlay.current &&
        e.target === e.currentTarget &&
        onClose
      ) {
        e.preventDefault()
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !mounted) {
    return null
  }

  return createPortal(
    <ModalOverlay
      ref={overlayRef}
      onPointerDown={handleOverlayPointerDown}
      onClick={handleOverlayClick}
    >
      <UNSAFE_PortalProvider getContainer={getContainer}>
        <ModalContent
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalHeader>
            <ModalTitle id="modal-title">{title}</ModalTitle>
            <ModalClose onClick={onClose} aria-label="Close modal">
              ×
            </ModalClose>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </UNSAFE_PortalProvider>
    </ModalOverlay>,
    document.body,
  )
}
