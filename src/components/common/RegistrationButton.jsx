import { useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import webinarConfig from '../../config/webinar'
import Button from '../ui/Button'
import './registration-button.css'

export default function RegistrationButton({
  text = `Reserve My Seat – ${webinarConfig.registration.displayPrice}`,
  className = '',
  showArrow = false,
  disabled = false,
  onClick,
  observeInPage = true,
}) {
  const button = useRef(null)
  const inView = useInView(button, { amount: 0.25 })

  function scrollToRegistration() {
    const section = document.getElementById('registration')
    if (!section) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (section.hasAttribute('tabindex')) section.focus({ preventScroll: true })
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }

  return (
    <Button
      ref={button}
      className={`registration-button btn-shine ${className}`.trim()}
      data-registration-cta={observeInPage ? '' : undefined}
      data-shine-visible={inView && !disabled}
      onClick={onClick ?? scrollToRegistration}
      disabled={disabled}
    >
      {text}
      {showArrow && <ArrowRight className="registration-button-arrow" aria-hidden="true" size={21} />}
    </Button>
  )
}
