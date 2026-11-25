import { useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import webinarConfig from '../../config/webinar'
import useWebinarRegistration from '../../hooks/useWebinarRegistration'
import Button from '../ui/Button'
import PriceDisplay from './PriceDisplay'
import './registration-button.css'

export default function RegistrationButton({
  text = 'Yes! Reserve My Seat',
  compactText = 'Reserve My Seat',
  className = '',
  showArrow = true,
  observeInPage = true,
}) {
  const button = useRef(null)
  const inView = useInView(button, { amount: 0.25 })
  const { canReserve, closed } = useWebinarRegistration()
  const [touchPressed, setTouchPressed] = useState(false)

  function startPress(event) {
    if (canReserve && event.pointerType !== 'mouse') setTouchPressed(true)
  }

  function endPress() {
    setTouchPressed(false)
  }

  return (
    <Button
      ref={button}
      as={canReserve ? 'a' : 'button'}
      className={`registration-button btn-shine ${className}`.trim()}
      data-registration-cta={observeInPage ? '' : undefined}
      data-shine-visible={inView && canReserve}
      data-touch-pressed={touchPressed || undefined}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onPointerLeave={endPress}
      href={canReserve ? webinarConfig.paymentUrl : undefined}
      disabled={canReserve ? undefined : true}
    >
      <span className="registration-button-label">
        {closed ? <span>Registration Closed</span> : <>
          <span className="registration-button-full-text">{text}</span>
          <span className="registration-button-compact-text">{compactText}</span>
          <span className="registration-button-prices">– <PriceDisplay /></span>
        </>}
      </span>
      {showArrow && !closed && <ArrowRight className="registration-button-arrow" aria-hidden="true" size={21} />}
    </Button>
  )
}
