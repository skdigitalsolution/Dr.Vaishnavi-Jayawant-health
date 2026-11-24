import { motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function VideoModal({ entry, trigger, onClose }) {
  const dialog = useRef(null)
  const video = useRef(null)
  const close = useRef(null)
  const reducedMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)

  useLayoutEffect(() => {
    const element = dialog.current
    const player = video.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    close.current.focus()
    player.play().catch(() => {}) // Native controls remain available if autoplay is blocked.

    return () => {
      player.pause()
      element.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [trigger])

  function dismiss() {
    video.current.pause()
    onClose()
  }

  return createPortal(
    <dialog
      className="testimonial-modal"
      ref={dialog}
      aria-labelledby="testimonial-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        dismiss()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <motion.div
        className="testimonial-modal-panel"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0 : 0.16 }}
      >
        <div className="testimonial-modal-header">
          <h2 id="testimonial-dialog-title">{entry.title}</h2>
          <button ref={close} type="button" aria-label="Close testimonial video" onClick={dismiss}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <video
          ref={video}
          src={entry.videoUrl}
          poster={entry.poster}
          aria-label={entry.title}
          controls
          playsInline
          preload="none"
          onError={() => setFailed(true)}
        />
        {failed && <p role="status">This video couldn’t be loaded.</p>}
      </motion.div>
    </dialog>,
    document.body,
  )
}
