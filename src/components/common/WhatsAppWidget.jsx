import { X } from 'lucide-react'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { hasBlockingOfferOverlay } from '../../config/offer'
import './whatsapp-button.css'
import './whatsapp-widget.css'

export default function WhatsAppWidget({ phone, welcome, replies }) {
  const validPhone = /^\+[1-9]\d{1,14}$/.test(phone ?? '')
  const [blocked, setBlocked] = useState(hasBlockingOfferOverlay)
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const launcher = useRef(null)
  const closeButton = useRef(null)

  useLayoutEffect(() => {
    if (!validPhone) return

    function update() {
      const blocking = hasBlockingOfferOverlay()
      setBlocked(blocking)
      if (blocking) setOpen(false)
    }

    const observer = new MutationObserver(update)
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'hidden', 'role', 'aria-modal', 'data-checkout-active'],
    })
    document.addEventListener('fullscreenchange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('fullscreenchange', update)
    }
  }, [validPhone])

  useLayoutEffect(() => {
    if (open && !blocked) closeButton.current?.focus({ preventScroll: true })
  }, [open, blocked])

  function close() {
    setOpen(false)
    launcher.current?.focus({ preventScroll: true })
  }

  if (!validPhone) return null

  return createPortal(
    <div className="whatsapp-widget" hidden={blocked} onKeyDown={(event) => {
      if (open && event.key === 'Escape') {
        event.stopPropagation()
        close()
      }
    }}>
      <button ref={launcher} type="button" className="whatsapp-button"
        aria-label={open ? 'Close WhatsApp support' : 'Open WhatsApp support'}
        aria-expanded={open} aria-controls={panelId}
        onClick={open ? close : () => setOpen(true)}>
        <img src={`${import.meta.env.BASE_URL}images/whatsapp.svg`} alt="" />
      </button>
      <section id={panelId} className="whatsapp-panel" aria-labelledby={`${panelId}-title`}
        data-open={open} inert={!open}>
        <header className="whatsapp-header">
          <div>
            <h2 id={`${panelId}-title`}>VAILYF AI</h2>
            <p>Webinar Support</p>
          </div>
          <button ref={closeButton} type="button" aria-label="Close WhatsApp support" onClick={close}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="whatsapp-chat">
          <div className="whatsapp-welcome">
            {welcome.map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="whatsapp-replies">
            {replies.map(({ label, message }) => (
              <a key={label} href={`https://wa.me/${phone.slice(1)}?text=${encodeURIComponent(message)}`}
                target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}
