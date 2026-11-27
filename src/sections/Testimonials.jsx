import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import RegistrationButton from '../components/common/RegistrationButton'
import ReviewCard from '../components/common/ReviewCard'
import TestimonialVideoCard from '../components/common/TestimonialVideoCard'
import VideoModal from '../components/common/VideoModal'
import { testimonials } from '../config/testimonials'
import { clientStoryCards } from '../config/clientStories'
import ClientSuccessStories from './ClientSuccessStories'
import './testimonials.css'

const { videos: videoEntries, reviews: reviewEntries } = testimonials
const hasTestimonials = clientStoryCards.length > 0 || videoEntries.length > 0 || reviewEntries.length > 0

function VideoCarousel({ onPlay, reducedMotion, entrance, videoOpen }) {
  const track = useRef(null)
  const carousel = useRef(null)
  const [positions, setPositions] = useState([0])
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touching, setTouching] = useState(false)
  const inView = useInView(carousel, { amount: 0.3 })

  useEffect(() => {
    const element = track.current
    const observer = new ResizeObserver(() => {
      setMobile(window.matchMedia('(max-width: 639px)').matches)
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

  const advance = useEffectEvent(() => {
    if (document.hidden || document.querySelector('dialog[open]') ||
      Array.from(document.querySelectorAll('video[controls]')).some((video) => !video.paused && !video.ended)) return
    scrollTo((active + 1) % positions.length)
  })

  const canAutoPlay = mobile && !reducedMotion && positions.length > 1
  useEffect(() => {
    if (!canAutoPlay || !inView || paused || hovered || focused || touching || videoOpen) return
    const interval = window.setInterval(() => advance(), 5000)
    return () => window.clearInterval(interval)
  }, [canAutoPlay, inView, paused, hovered, focused, touching, videoOpen])

  function onKeyDown(event) {
    if (event.target !== track.current && !event.target.matches('.testimonial-play')) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    scrollTo(active + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <div ref={carousel} className="testimonial-carousel" role="region" aria-label="Video testimonials" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
      <ul
        id="testimonial-video-track"
        className="testimonial-track"
        ref={track}
        tabIndex={positions.length > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
        onScroll={updateActive}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
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
          {canAutoPlay && (
            <button type="button" aria-label={paused ? 'Resume automatic video slides' : 'Pause automatic video slides'}
              aria-controls="testimonial-video-track" onClick={() => setPaused(!paused)}>
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)

  function entrance(delay = 0) {
    return responsiveReveal(reducedMotion, delay, { y: 10 }, 0.1)
  }

  return (
    <section className="testimonials-section section-light" aria-labelledby="testimonials-title" data-video-open={Boolean(selected)}>
      <div className="testimonials-content">
        <motion.div className="testimonials-heading" {...entrance()}>
          <p className="testimonials-label">{hasTestimonials ? 'Community Experiences' : 'Wellness Redefined'}</p>
          <h2 id="testimonials-title">{hasTestimonials ? 'Experiences From the Wellness Redefined Community' : 'Bring Your Questions to the Live Webinar'}</h2>
          <p className="testimonials-description">
            {hasTestimonials
              ? 'Discover the wellness experiences shared by members of the Wellness Redefined community.'
              : 'The live Q&A gives attendees a chance to ask about PCOS, nutrition and everyday wellness habits.'}
          </p>
        </motion.div>
        <ClientSuccessStories />
        {videoEntries.length > 0 && (
          <VideoCarousel onPlay={(entry, trigger) => setSelected({ entry, trigger })} reducedMotion={reducedMotion}
            entrance={entrance} videoOpen={Boolean(selected)} />
        )}
        {reviewEntries.length > 0 && (
          <div className="testimonials-reviews">
            <motion.h3 {...entrance()}>What Women Say About Us</motion.h3>
            <ul className="testimonial-review-grid">
              {reviewEntries.map((entry, index) => (
                <motion.li key={entry.id} {...entrance((index % 3) * 0.07)}>
                  <ReviewCard review={entry} />
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        <div className="testimonials-footer">
          {hasTestimonials && <p className="testimonials-disclaimer">Every body responds differently. Individual experiences and outcomes may vary.</p>}
          <RegistrationButton className="testimonials-registration" showArrow />
        </div>
      </div>
      <AnimatePresence>
        {selected && <VideoModal {...selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
