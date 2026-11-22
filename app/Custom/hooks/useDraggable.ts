import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type {
  CSSProperties,
  HTMLAttributes,
  PointerEvent,
  RefObject,
} from 'react'

type Offset = { x: number; y: number }
type Drag = {
  pointerId: number
  x: number
  y: number
  moved: boolean
  handle: HTMLElement
}

export type DraggableOptions = {
  enabled?: boolean
  bounds?: 'viewport' | RefObject<HTMLElement | null> | false
}

export type Draggable<T extends HTMLElement> = {
  ref: (element: T | null) => void
  style: CSSProperties | undefined
  isDragging: boolean
  handleProps: Pick<
    HTMLAttributes<HTMLElement>,
    | 'onPointerDown'
    | 'onPointerMove'
    | 'onPointerUp'
    | 'onPointerCancel'
    | 'onLostPointerCapture'
    | 'onClickCapture'
    | 'style'
  >
}

// ref и style принадлежат перемещаемому элементу, handleProps — ему же или ручке.
// Смещение через translate сохраняет исходное позиционирование и место в потоке.
export const useDraggable = <T extends HTMLElement>({
  enabled = true,
  bounds = 'viewport',
}: DraggableOptions = {}): Draggable<T> => {
  const [element, setElement] = useState<T | null>(null)
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<Drag | null>(null)
  const suppressClickRef = useRef(false)

  const constrain = useCallback(
    (dx: number, dy: number): void => {
      if (!element || !element.getClientRects().length) {
        return
      }
      const rect = element.getBoundingClientRect()
      const container = bounds && bounds !== 'viewport' ? bounds.current : null
      const area = container?.getBoundingClientRect()
      if (bounds === 'viewport' || area) {
        const left = area ? area.left + (container?.clientLeft ?? 0) : 0
        const top = area ? area.top + (container?.clientTop ?? 0) : 0
        const width = container ? container.clientWidth : window.innerWidth
        const height = container ? container.clientHeight : window.innerHeight
        dx =
          Math.max(left, Math.min(rect.left + dx, left + width - rect.width)) -
          rect.left
        dy =
          Math.max(top, Math.min(rect.top + dy, top + height - rect.height)) -
          rect.top
      }
      if (dx || dy) {
        setOffset((current) => ({ x: current.x + dx, y: current.y + dy }))
      }
    },
    [bounds, element],
  )

  const endDrag = useCallback((releaseCapture = true): void => {
    const drag = dragRef.current
    dragRef.current = null
    setIsDragging(false)
    if (releaseCapture && drag?.handle.hasPointerCapture(drag.pointerId)) {
      drag.handle.releasePointerCapture(drag.pointerId)
    }
  }, [])

  useLayoutEffect(() => {
    if (!enabled) {
      endDrag()
      return
    }
    constrain(0, 0)
  }, [enabled, constrain, endDrag])

  useEffect(() => {
    if (!enabled || !element) {
      return
    }
    const handleResize = (): void => constrain(0, 0)
    const observer = new ResizeObserver(handleResize)
    observer.observe(element)
    if (bounds && bounds !== 'viewport' && bounds.current) {
      observer.observe(bounds.current)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [bounds, constrain, element, enabled])

  useEffect(() => () => endDrag(), [endDrag])

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>): void => {
      if (
        !enabled ||
        !element ||
        !event.isPrimary ||
        event.button !== 0 ||
        dragRef.current
      ) {
        return
      }

      suppressClickRef.current = false
      const interactive = (event.target as Element).closest(
        'button, a, input, textarea, select, [contenteditable="true"], [data-no-drag]',
      )

      if (
        interactive &&
        interactive !== event.currentTarget &&
        event.currentTarget.contains(interactive)
      ) {
        return
      }
      dragRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        moved: false,
        handle: event.currentTarget,
      }
      if (event.pointerType !== 'touch') {
        event.currentTarget.setPointerCapture(event.pointerId)
      }
    },
    [element, enabled],
  )

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>): void => {
      const drag = dragRef.current
      if (!enabled || !drag || drag.pointerId !== event.pointerId) {
        return
      }
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      if (!drag.moved && Math.hypot(dx, dy) < 5) {
        return
      }
      if (!drag.moved) {
        event.currentTarget.setPointerCapture(event.pointerId)
      }
      drag.moved = true
      drag.x = event.clientX
      drag.y = event.clientY
      suppressClickRef.current = true
      setIsDragging(true)
      constrain(dx, dy)
    },
    [constrain, enabled],
  )

  const onPointerEnd = useCallback(
    (event: PointerEvent<HTMLElement>): void => {
      if (
        event.type === 'lostpointercapture' &&
        event.target !== event.currentTarget
      ) {
        return
      }
      if (dragRef.current?.pointerId === event.pointerId) {
        endDrag(false)
      }
    },
    [endDrag],
  )

  const onClickCapture = useCallback<
    NonNullable<HTMLAttributes<HTMLElement>['onClickCapture']>
  >((event) => {
    if (event.detail !== 0 && suppressClickRef.current) {
      suppressClickRef.current = false
      event.preventDefault()
      event.stopPropagation()
    }
  }, [])

  return {
    ref: setElement,
    style: enabled ? { translate: `${offset.x}px ${offset.y}px` } : undefined,
    isDragging,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onLostPointerCapture: onPointerEnd,
      onClickCapture,
      style: enabled ? { touchAction: 'none', userSelect: 'none' } : undefined,
    },
  }
}
