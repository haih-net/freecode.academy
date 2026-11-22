import React, { useCallback, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDraggable } from 'app/Custom/hooks/useDraggable'
import {
  ChatWindow,
  ChatHeader,
  ChatTitle,
  HeaderButtons,
  ExpandButton,
  CloseButton,
} from '../styles'
// import { useStopPropagationScroll } from 'src/hooks/useStopPropagationScroll'

export type ChatModalProps = {
  anchorRef?: React.RefObject<HTMLButtonElement | null>
  children: React.ReactNode
  isExpanded: boolean
  onClose: () => void
  onExpand: () => void
}

export const ChatModal: React.FC<ChatModalProps> = ({
  children,
  anchorRef,
  isExpanded,
  onClose,
  onExpand,
}) => {
  const [isFloating, setIsFloating] = useState(false)
  const draggable = useDraggable<HTMLDivElement>({
    enabled: isFloating && !isExpanded,
  })

  const [windowElement, setWindowElement] = useState<HTMLDivElement | null>(
    null,
  )

  const [position, setPosition] = useState<{
    left: number
    top: number
  } | null>(null)

  const draggableRef = draggable.ref
  const setWindowRef = useCallback(
    (element: HTMLDivElement | null): void => {
      setWindowElement(element)
      draggableRef(element)
    },
    [draggableRef],
  )

  useLayoutEffect(() => {
    const media = window.matchMedia('(min-width: 480px)')
    const updateFloating = (): void => setIsFloating(media.matches)
    updateFloating()
    media.addEventListener('change', updateFloating)
    return () => media.removeEventListener('change', updateFloating)
  }, [])

  useLayoutEffect(() => {
    if (
      !isFloating ||
      isExpanded ||
      !windowElement ||
      !anchorRef?.current ||
      position
    ) {
      return
    }
    const anchor = anchorRef.current.getBoundingClientRect()
    const width = windowElement.offsetWidth
    const height = windowElement.offsetHeight
    const gap = 12
    const above = anchor.top - height - gap
    const below = anchor.bottom + gap
    const top = above >= 0 ? above : below
    setPosition({
      left: Math.max(
        0,
        Math.min(anchor.right - width, window.innerWidth - width),
      ),
      top: Math.max(0, Math.min(top, window.innerHeight - height)),
    })
  }, [anchorRef, isExpanded, isFloating, position, windowElement])

  const windowStyle: React.CSSProperties | undefined =
    isFloating && !isExpanded
      ? {
          ...(position ? { ...position, right: 'auto', bottom: 'auto' } : {}),
          ...draggable.style,
        }
      : undefined

  const stopPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation()
  }, [])

  // const { containerRef } = useStopPropagationScroll()

  const modalContent = (
    <ChatWindow
      ref={setWindowRef}
      style={windowStyle}
      data-testid="chat-window"
      data-expanded={isExpanded}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      // ref={containerRef}
    >
      <ChatHeader
        {...draggable.handleProps}
        data-testid="chat-header"
        data-draggable={isFloating && !isExpanded}
        data-dragging={draggable.isDragging}
      >
        <ChatTitle>ИИ-помощник</ChatTitle>
        <HeaderButtons>
          <ExpandButton aria-label="Изменить размер чата" onClick={onExpand}>
            {isExpanded ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </ExpandButton>
          <CloseButton aria-label="Закрыть чат" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </CloseButton>
        </HeaderButtons>
      </ChatHeader>

      {children}
    </ChatWindow>
  )

  return createPortal(modalContent, document.body)
}
