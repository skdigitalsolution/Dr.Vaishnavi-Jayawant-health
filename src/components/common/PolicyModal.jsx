import { X } from 'lucide-react'
import { useId, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PolicyModal({ policy, trigger, onClose }) {
  const titleId = useId()
  const dialog = useRef(null)
  const closeButton = useRef(null)

  useLayoutEffect(() => {
    const element = dialog.current
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    closeButton.current.focus()

    return () => {
      element.close()
      document.body.style.overflow = overflow
      trigger?.focus({ preventScroll: true })
    }
  }, [trigger])

  return createPortal(
    <dialog
      className="footer-policy-dialog"
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="footer-policy-panel">
        <header>
          <h2 id={titleId}>{policy.title}</h2>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close policy">
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        {policy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </dialog>,
    document.body,
  )
}
