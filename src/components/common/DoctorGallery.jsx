import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function DoctorGallery({ images, entrance, reducedMotion }) {
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  function updateEdges() {
    const element = track.current
    setEdges({
      start: element.scrollLeft < 2,
      end: element.scrollWidth - element.clientWidth - element.scrollLeft < 2,
    })
  }

  useEffect(() => {
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track.current)
    return () => observer.disconnect()
  }, [])

  function step(direction) {
    const element = track.current
    const [first, second] = element.children
    if (!second) return

    element.scrollBy({
      left: direction * (second.offsetLeft - first.offsetLeft),
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }

  const canScroll = !edges.start || !edges.end

  return (
    <div className="doctor-gallery" role="region" aria-label="Professional photo gallery">
      <ul
        className="doctor-gallery-track"
        id="doctor-gallery-track"
        ref={track}
        tabIndex={canScroll ? 0 : undefined}
        onScroll={updateEdges}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          step(event.key === 'ArrowLeft' ? -1 : 1)
        }}
      >
        {images.map(({ id, image, alt, isPlaceholder }, index) => (
          <li key={id}>
            <motion.figure {...entrance((index % 4) * 0.055, { y: 8 })}>
              <img
                src={image}
                alt={alt}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
              />
              {isPlaceholder && <figcaption>AI development preview</figcaption>}
            </motion.figure>
          </li>
        ))}
      </ul>
      {canScroll && (
        <div className="doctor-gallery-controls">
          <button type="button" aria-label="Previous photos" aria-controls="doctor-gallery-track" disabled={edges.start} onClick={() => step(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next photos" aria-controls="doctor-gallery-track" disabled={edges.end} onClick={() => step(1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
