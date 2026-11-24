import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import RegistrationButton from '../components/common/RegistrationButton'
import ReviewCard from '../components/common/ReviewCard'
import TestimonialVideoCard from '../components/common/TestimonialVideoCard'
import VideoModal from '../components/common/VideoModal'
import { testimonials } from '../config/testimonials'
import './testimonials.css'

const { videos, reviews, previewVideos, previewReviews } = testimonials
const videoEntries = videos.length ? videos : previewVideos
const reviewEntries = reviews.length ? reviews : previewReviews
const isPreview = (!videos.length && previewVideos.length > 0) ||
  (!reviews.length && previewReviews.length > 0)

function VideoCarousel({ onPlay, reducedMotion, entrance }) {
  const track = useRef(null)
  const [positions, setPositions] = useState([0])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const element = track.current
    const observer = new ResizeObserver(() => {
      const limit = element.scrollWidth - element.clientWidth
      const start = element.firstElementChild.offsetLeft
      const offsets = Array.from(element.children, (child) => Math.min(limit, child.offsetLeft - start))
      setPositions([...new Set(offsets)])
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function scrollTo(index) {
    const left = positions[index]
    if (left === undefined) return

    track.current.scrollTo({ left, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  function updateActive() {
    const left = track.current.scrollLeft
    setActive(positions.reduce((closest, position, index) =>
      Math.abs(position - left) < Math.abs(positions[closest] - left) ? index : closest, 0))
  }

  useEffect(updateActive, [positions])

  function onKeyDown(event) {
    if (event.target !== track.current && !event.target.matches('.testimonial-play')) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    scrollTo(active + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <div className="testimonial-carousel" role="region" aria-label="Video testimonials" aria-roledescription="carousel">
      <ul
        id="testimonial-video-track"
        className="testimonial-track"
        ref={track}
        tabIndex={positions.length > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
        onScroll={updateActive}
      >
        {videoEntries.map((entry, index) => (
          <motion.li key={entry.id} {...entrance((index % 3) * 0.07)}>
            <TestimonialVideoCard entry={entry} onPlay={onPlay} />
          </motion.li>
        ))}
      </ul>
      {positions.length > 1 && (
        <div className="testimonial-navigation">
          <button type="button" aria-label="Previous testimonials" aria-controls="testimonial-video-track" disabled={active === 0} onClick={() => scrollTo(active - 1)}>
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          {positions.map((position, index) => (
            <button
              key={position}
              type="button"
              className="testimonial-page-dot"
              aria-label={`Go to testimonial position ${index + 1}`}
              aria-current={active === index ? 'true' : undefined}
              aria-controls="testimonial-video-track"
              onClick={() => scrollTo(index)}
            />
          ))}
          <button type="button" aria-label="Next testimonials" aria-controls="testimonial-video-track" disabled={active === positions.length - 1} onClick={() => scrollTo(active + 1)}>
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)

  if (!videoEntries.length && !reviewEntries.length) return null

  function entrance(delay = 0) {
    return reducedMotion ? {} : {
      initial: { opacity: 0, y: 10 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.1 },
      transition: { ...premiumReveal, delay },
    }
  }

  return (
    <section className="testimonials-section section-light" aria-labelledby="testimonials-title" data-video-open={Boolean(selected)}>
      <div className="testimonials-content">
        <motion.div className="testimonials-heading" {...entrance()}>
          <p className="testimonials-label">Real Women · Real Experiences</p>
          <h2 id="testimonials-title">Every Woman Has a Story.{' '}<span>Every Journey Matters.</span></h2>
          <p className="testimonials-description">
            Discover the experiences of women who have received guidance from Dr. Vaishnavi on their health, nutrition and lifestyle journeys.
          </p>
          {isPreview && <p className="testimonials-preview-note">Development preview · Client stories and reviews will appear with consent.</p>}
        </motion.div>
        {videoEntries.length > 0 && (
          <VideoCarousel onPlay={(entry, trigger) => setSelected({ entry, trigger })} reducedMotion={reducedMotion} entrance={entrance} />
        )}
        {reviewEntries.length > 0 && (
          <div className="testimonials-reviews">
            <motion.h3 {...entrance()}>What Women Say About Us</motion.h3>
            <ul className="testimonial-review-grid">
              {reviewEntries.map((entry, index) => (
                <motion.li key={entry.id || entry} {...entrance((index % 3) * 0.07)}>
                  <ReviewCard review={typeof entry === 'string' ? null : entry} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        <div className="testimonials-footer">
          <p className="testimonials-disclaimer">Every body responds differently. Individual experiences and outcomes may vary.</p>
          <p>Take the first step towards understanding your body better.</p>
          <RegistrationButton className="testimonials-registration" showArrow />
        </div>
      </div>
      <AnimatePresence>
        {selected && <VideoModal {...selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
