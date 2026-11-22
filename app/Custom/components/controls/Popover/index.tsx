import type * as React from 'react'
import { useLayoutEffect } from 'react'
import {
  DismissButton,
  Overlay,
  usePopover,
  useUNSAFE_PortalContext,
} from 'react-aria'
import type { PopoverProps } from './interfaces'
import { PopoverStyled, UnderlayStyled } from './styles'

export const Popover: React.FC<PopoverProps> = ({
  state,
  triggerRef,
  popoverRef,
  isNonModal = false,
  children,
}) => {
  const { getContainer } = useUNSAFE_PortalContext()
  const { popoverProps, underlayProps } = usePopover(
    {
      triggerRef,
      popoverRef,
      isNonModal,
      placement: 'bottom start',
      offset: 4,
    },
    state,
  )

  useLayoutEffect(() => {
    const anchor = triggerRef.current
    const popup = popoverRef.current
    if (!anchor || !popup) {
      return
    }
    const resize = (): void => {
      popup.style.setProperty(
        '--control-popover-width',
        `${anchor.getBoundingClientRect().width}px`,
      )
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(anchor)
    return () => observer.disconnect()
  }, [triggerRef, popoverRef])
  return (
    <Overlay
      portalContainer={
        getContainer?.() ?? triggerRef.current?.parentElement ?? undefined
      }
    >
      {!isNonModal && <UnderlayStyled {...underlayProps} />}
      <PopoverStyled
        {...popoverProps}
        style={{ ...popoverProps.style, zIndex: undefined }}
        ref={popoverRef}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </PopoverStyled>
    </Overlay>
  )
}
