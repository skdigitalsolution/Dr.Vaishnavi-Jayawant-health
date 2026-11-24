import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const numberFormat = new Intl.NumberFormat('en-IN')

export default function AnimatedCounter({ value, suffix = '' }) {
  const counter = useRef(null)
  const inView = useInView(counter, { once: true })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || reducedMotion) return

    const animation = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (current) => setCount(Math.round(current)),
    })

    return () => animation.stop()
  }, [inView, reducedMotion, value])

  return (
    <span ref={counter}>
      <span aria-hidden="true">{numberFormat.format(reducedMotion ? value : count)}{suffix}</span>
      <span className="sr-only">{numberFormat.format(value)}{suffix}</span>
    </span>
  )
}
