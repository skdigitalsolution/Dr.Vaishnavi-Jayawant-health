import { bonusBookCount, complimentaryEBooks } from '../../config/bonuses'
import { Gift } from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { hasBlockingOfferOverlay } from '../../config/offer'

export default function FloatingOfferButton({ enabled, onOpen }) {
  const [blocked, setBlocked] = useState(hasBlockingOfferOverlay)
  const visible = enabled && !blocked

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
        <button type="button" className="floating-offer-button" aria-label={'See the ' + complimentaryEBooks + ' included with paid registration'}
          aria-haspopup="dialog" onClick={onOpen}>
          <span className="floating-offer-face">
            <span className="floating-offer-shine" aria-hidden="true" />
            <Gift className="floating-offer-gift" aria-hidden="true" />
            <strong>{bonusBookCount} FREE</strong>
            <small>eBooks</small>
          </span>
          <span className="floating-offer-tooltip" aria-hidden="true">{complimentaryEBooks} included</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}
