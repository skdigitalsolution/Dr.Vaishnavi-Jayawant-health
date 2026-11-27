import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react'
import SuccessStoryCard from '../components/common/SuccessStoryCard'
import { clientStoryCards } from '../config/clientStories'
import { responsiveReveal } from '../utils/premiumMotion'
import './client-success-stories.css'

const count = clientStoryCards.length
const normalize = (index) => ((index % count) + count) % count

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
    const target = landingIndex.current + direction
    const lastStart = track.current.children.length - capacity
    if (target < 0 || target > lastStart) {
      scrollToCard(count + normalize(landingIndex.current), 'instant')
    }
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

  if (!count) {
    return null
  }

  return (
    <div
      ref={region}
      className="client-stories"
      role="region"
      aria-label="Wellness Redefined community reviews"
      aria-roledescription={loops ? 'carousel' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
    >
      <ul
        ref={track}
        id="client-stories-track"
        className="client-stories-track"
        aria-label="Reviewer profiles"
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
        {copies.flatMap((copy) => clientStoryCards.map((story, index) => (
          <motion.li
            key={`${copy - Number(loops)}-${story.id}`}
            aria-hidden={loops && copy !== 1 ? true : undefined}
            {...responsiveReveal(reducedMotion, (index % capacity) * 0.07, { y: 12 }, 0.2)}
          >
            <SuccessStoryCard story={story} duplicate={loops && copy !== 1} />
          </motion.li>
        )))}
      </ul>
      {loops && (
        <div className="client-stories-controls">
          <button type="button" aria-label="Previous card" aria-controls="client-stories-track" onClick={() => move(-1)}>
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <div className="client-stories-pages" aria-label="Card positions">
            {clientStoryCards.map(({ id, headline }, index) => (
              <button
                key={id}
                type="button"
                aria-label={`Go to card ${index + 1}, ${headline}`}
                aria-current={active === index ? 'true' : undefined}
                aria-controls="client-stories-track"
                onClick={() => scrollToCard(count + index, reducedMotion ? 'instant' : 'smooth')}
              />
            ))}
          </div>
          <button type="button" aria-label="Next card" aria-controls="client-stories-track" onClick={() => move(1)}>
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
