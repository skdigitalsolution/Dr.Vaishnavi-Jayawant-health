import { Gift } from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { hasBlockingOfferOverlay } from '../../config/offer'

export default function FloatingOfferButton({ seconds, enabled, onOpen }) {
  const [blocked, setBlocked] = useState(hasBlockingOfferOverlay)
  const visible = enabled && !blocked
  const remaining = Math.max(0, seconds)
  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const remainder = String(remaining % 60).padStart(2, '0')
  const time = `${minutes}:${remainder}`

  useLayoutEffect(() => {
    if (!enabled) return

    function update() {
      setBlocked(hasBlockingOfferOverlay())
    }

    const mutations = new MutationObserver(update)
    mutations.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'hidden', 'role', 'aria-modal', 'data-checkout-active'],
    })
    document.addEventListener('fullscreenchange', update)
    update()

    return () => {
      mutations.disconnect()
      document.removeEventListener('fullscreenchange', update)
    }
  }, [enabled])

  return createPortal(
    <div className="floating-offer" data-visible={visible} hidden={!visible} inert={!visible}>
      <div className="floating-offer-motion">
        <button type="button" className="floating-offer-button" aria-label="Open Free eBook Offer"
          aria-haspopup="dialog" onClick={onOpen}>
          <span className="floating-offer-face">
            <span className="floating-offer-shine" aria-hidden="true" />
            <Gift className="floating-offer-gift" aria-hidden="true" />
            <strong>FREE</strong>
            <small>eBook</small>
          </span>
          <span className="floating-offer-tooltip" aria-hidden="true">Claim Your FREE eBook</span>
        </button>
        <div className="floating-offer-clock" role="timer" aria-label={`${minutes} minutes, ${remainder} seconds remaining`}>
          <span key={time} aria-hidden="true">{time}</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
