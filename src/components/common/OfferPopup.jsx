import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Gift, X } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PriceDisplay from './PriceDisplay'
import RegistrationButton from './RegistrationButton'
import '../../styles/animations.css'

const easing = [0.22, 1, 0.36, 1]

export default function OfferPopup({ onOpen, onClose }) {
  const dialog = useRef(null)
  const close = useRef(null)
  const restoreScroll = useRef(null)
  const [visible, setVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = dialog.current
    const overflow = document.body.style.overflow
    element.showModal()
    onOpen?.()
    document.body.style.overflow = 'hidden'
    close.current.focus({ preventScroll: true })
    restoreScroll.current = () => {
      element.close()
      document.body.style.overflow = overflow
    }
    return () => {
      restoreScroll.current?.()
      restoreScroll.current = null
    }
  }, [onOpen])

  function finish() {
    restoreScroll.current?.()
    restoreScroll.current = null
    onClose()
  }

  function trapFocus(event) {
    if (event.key !== 'Tab') return
    const controls = dialog.current.querySelectorAll('button:not(:disabled), a[href]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey ? document.activeElement === first : document.activeElement === last) {
      event.preventDefault()
      const target = event.shiftKey ? last : first
      target.focus()
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="offer-dialog"
      aria-labelledby="offer-heading"
      onKeyDown={trapFocus}
      onCancel={(event) => { event.preventDefault(); setVisible(false) }}
    >
      <div className="offer-overlay" onClick={(event) => {
        if (event.target === event.currentTarget) setVisible(false)
      }}>
        <AnimatePresence onExitComplete={finish}>
          {visible && (
            <motion.div
              key="scrim"
              className="offer-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.25 } }}
              transition={{ duration: reducedMotion ? 0 : 0.5 }}
            />
          )}
          {visible && (
            <motion.div
              key="panel"
              className="offer-panel"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.25, ease: easing } }}
              transition={{ duration: reducedMotion ? 0 : 0.52, ease: easing }}
            >
              <button ref={close} className="offer-close" type="button" aria-label="Close offer" onClick={() => setVisible(false)}>
                <X size={22} aria-hidden="true" />
              </button>
              <div className="offer-content">
                <p className="offer-label"><Gift size={17} aria-hidden="true" /> Exclusive Registration Bonuses</p>
                <h2 id="offer-heading">
                  Book Your Seat for
                  <span className="offer-price"><PriceDisplay /></span>
                  <span>&amp; Get <em className="offer-free">3 FREE eBooks</em></span>
                </h2>
                <RegistrationButton
                  className="offer-register"
                  showArrow
                  observeInPage={false}
                />
                <p className="offer-note">Receive All 3 eBooks After Successful Registration</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </dialog>,
    document.body,
  )
}
