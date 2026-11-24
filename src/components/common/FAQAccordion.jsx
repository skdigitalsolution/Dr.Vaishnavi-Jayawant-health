import { motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useId, useRef, useState } from 'react'

export default function FAQAccordion({ items, entrance }) {
  const id = useId()
  const buttons = useRef([])
  const [openIndex, setOpenIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  function moveFocus(event, index) {
    const last = items.length - 1
    const positions = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    if (!Object.hasOwn(positions, event.key)) return

    event.preventDefault()
    buttons.current[positions[event.key]]?.focus()
  }

  return (
    <div className="faq-accordion">
      {items.map(({ question, answer }, index) => {
        const expanded = openIndex === index
        const triggerId = `${id}-question-${index}`
        const panelId = `${id}-answer-${index}`
        const Icon = expanded ? Minus : Plus

        return (
          <motion.div className="faq-item" key={question} data-open={expanded} {...entrance((index % 4) * 0.045, 6)}>
            <h3>
              <button
                id={triggerId}
                type="button"
                ref={(button) => { buttons.current[index] = button }}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenIndex(expanded ? null : index)}
                onKeyDown={(event) => moveFocus(event, index)}
              >
                {question}<Icon size={21} aria-hidden="true" strokeWidth={1.8} />
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!expanded}
              className="faq-answer"
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeInOut' }}
            >
              <p>{answer}</p>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
