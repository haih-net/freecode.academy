import { useCallback, useState } from 'react'
export default function InteractionProbe() {
  const [count, setCount] = useState(0)
  const [broken, setBroken] = useState(false)
  const increment = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  const triggerError = useCallback(() => {
    setBroken(true)
  }, [])

  if (broken) {
    throw new Error('Intentional architecture verification error')
  }
  return (
    <section aria-label="Interaction probe">
      <p>Lazy interaction probe loaded.</p>
      <button onClick={increment}>Count: {count}</button>
      <button onClick={triggerError}>Test error boundary</button>
    </section>
  )
}
