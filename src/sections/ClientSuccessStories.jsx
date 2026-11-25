import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react'
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react'
import { clientStories } from '../config/clientStories'
import { responsiveReveal } from '../utils/premiumMotion'
import './client-success-stories.css'

const count = clientStories.length
const normalize = (index) => ((index % count) + count) % count

function StoryCard({ story }) {
  return (
    <article className="client-story-card">
      <header className="client-story-profile">
        <img src={story.image} alt="" width="72" height="72" loading="lazy" decoding="async" />
        <div>
          <p className="client-story-name">{story.name}</p>
          <p className="client-story-location"><MapPin size={14} aria-hidden="true" />{story.location}</p>
        </div>
      </header>
      {story.preview && <p className="client-story-preview">Development placeholder · AI-generated portrait</p>}
      <h3>{story.headline}</h3>
      {story.preview ? <p>{story.review}</p> : <blockquote><p>{story.review}</p></blockquote>}
    </article>
  )
}

export default function ClientSuccessStories() {
  const region = useRef(null)
  const track = useRef(null)
  const landingIndex = useRef(0)
  const settle = useRef()
  const [capacity, setCapacity] = useState(3)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touching, setTouching] = useState(false)
  const reducedMotion = useReducedMotion()
  const inView = useInView(region, { amount: 0.3 })
  const loops = count > capacity
  const copies = loops ? [0, 1, 2] : [0]

  function cardPosition(index) {
    const cards = track.current.children
    return cards[index].getBoundingClientRect().left - cards[0].getBoundingClientRect().left
  }

  function scrollToCard(index, behavior) {
    if (!track.current?.children[index]) return
    landingIndex.current = index
    setActive(normalize(index))
    track.current.scrollTo({ left: cardPosition(index), behavior })
  }

  useLayoutEffect(() => {
    if (!track.current) return
    const element = track.current
    function measure() {
      const visibleCards = Number(getComputedStyle(element).getPropertyValue('--client-story-columns'))
      if (visibleCards !== capacity) {
        setCapacity(visibleCards)
        return
      }
      scrollToCard(loops ? count + normalize(landingIndex.current) : 0, 'instant')
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => {
      observer.disconnect()
      clearTimeout(settle.current)
    }
  }, [capacity, loops])

  function onScroll() {
    if (!loops) return
    clearTimeout(settle.current)
    settle.current = window.setTimeout(() => {
      if (!track.current) return
      const step = cardPosition(1)
      if (!step) return
      const index = Math.round(track.current.scrollLeft / step)
      const canonical = normalize(index)
      landingIndex.current = index
      setActive(canonical)
      if (index < count || index >= count * 2) scrollToCard(count + canonical, 'instant')
    }, 120)
  }

  function move(direction) {
    scrollToCard(landingIndex.current + direction, reducedMotion ? 'instant' : 'smooth')
  }

  const advance = useEffectEvent(() => {
    if (!document.hidden && !document.querySelector('dialog[open]') &&
      !Array.from(document.querySelectorAll('video[controls]')).some((video) => !video.paused && !video.ended)) move(1)
  })

  useEffect(() => {
    if (!loops || paused || hovered || focused || touching || !inView || reducedMotion) return
    const interval = window.setInterval(() => advance(), 5000)
    return () => window.clearInterval(interval)
  }, [loops, paused, hovered, focused, touching, inView, reducedMotion, active])

  if (!count) return null

  return (
    <div
      ref={region}
      className="client-stories"
      role="region"
      aria-label="Client stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
    >
      <ul
        ref={track}
        id="client-stories-track"
        className="client-stories-track"
        aria-label="Client profiles"
        tabIndex={loops ? 0 : undefined}
        onScroll={onScroll}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
        onKeyDown={(event) => {
          if (!loops || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }}
      >
        {copies.flatMap((copy) => clientStories.map((story, index) => (
          <motion.li
            key={`${copy - Number(loops)}-${story.id}`}
            aria-hidden={loops && copy !== 1 ? true : undefined}
            {...responsiveReveal(reducedMotion, (index % capacity) * 0.07, { y: 12 }, 0.2)}
          >
            <StoryCard story={story} />
          </motion.li>
        )))}
      </ul>
      {loops && (
        <div className="client-stories-controls">
          <button type="button" aria-label="Previous client story" aria-controls="client-stories-track" onClick={() => move(-1)}>
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <div className="client-stories-pages" aria-label="Client story positions">
            {clientStories.map(({ id, location }, index) => (
              <button
                key={id}
                type="button"
                aria-label={`Go to story ${index + 1}, ${location}`}
                aria-current={active === index ? 'true' : undefined}
                aria-controls="client-stories-track"
                onClick={() => scrollToCard(count + index, reducedMotion ? 'instant' : 'smooth')}
              />
            ))}
          </div>
          <button type="button" aria-label="Next client story" aria-controls="client-stories-track" onClick={() => move(1)}>
            <ChevronRight size={19} aria-hidden="true" />
          </button>
          {!reducedMotion && (
            <button type="button" aria-label={paused ? 'Resume automatic sliding' : 'Pause automatic sliding'}
              aria-controls="client-stories-track" onClick={() => setPaused(!paused)}>
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
