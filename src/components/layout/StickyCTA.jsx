import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import webinarConfig from '../../config/webinar'
import useWebinarRegistration from '../../hooks/useWebinarRegistration'
import CountdownTimer from '../common/CountdownTimer'
import OfferCountdown from '../common/OfferCountdown'
import RegistrationButton from '../common/RegistrationButton'
import PriceDisplay from '../common/PriceDisplay'
import './sticky-cta.css'

const { webinarStartAt } = webinarConfig
const ctaSelector = '[data-registration-cta]'

function isInPageCTA(button) {
  for (let element = button; element; element = element.parentElement) {
    const { position } = window.getComputedStyle(element)
    if (position === 'fixed' || position === 'sticky') return false
  }
  return true
}

function useVisibleRegistrationCTA(bar) {
  const [hasVisibleCTA, setHasVisibleCTA] = useState(false)

  useLayoutEffect(() => {
    const rootStyle = document.documentElement.style
    const observed = new Set()
    const visible = new Set()
    let observer
    let height = -1

    function synchronizeTargets() {
      const targets = new Set([...document.querySelectorAll(ctaSelector)].filter(isInPageCTA))
      for (const button of observed) {
        if (targets.has(button)) continue
        observer.unobserve(button)
        observed.delete(button)
        visible.delete(button)
      }
      for (const button of targets) {
        if (observed.has(button)) continue
        observed.add(button)
        observer.observe(button)
      }
    }

    function measure() {
      const nextHeight = bar.current.offsetHeight
      if (height === nextHeight) return

      height = nextHeight
      rootStyle.setProperty('--sticky-cta-height', `${height}px`)
      observer?.disconnect()
      observed.clear()
      visible.clear()

      // Keep the same usable viewport when hidden so the threshold cannot flip-flop.
      observer = new IntersectionObserver((entries, source) => {
        if (source !== observer) return
        for (const entry of entries) {
          if (!observed.has(entry.target)) continue
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setHasVisibleCTA(visible.size > 0)
      }, { rootMargin: `0px 0px -${height}px 0px`, threshold: 0.5 })

      synchronizeTargets()
      if (!observed.size) setHasVisibleCTA(false)
    }

    const resize = new ResizeObserver(measure)
    resize.observe(bar.current, { box: 'border-box' })
    measure()

    const mutations = new MutationObserver((records) => {
      const changed = records.some((record) => record.type === 'attributes' ||
        [...record.addedNodes, ...record.removedNodes].some((node) =>
          node instanceof Element && (node.matches(ctaSelector) || node.querySelector(ctaSelector))))
      if (!changed) return

      synchronizeTargets()
      setHasVisibleCTA(visible.size > 0)
    })
    mutations.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-registration-cta'] })

    return () => {
      resize.disconnect()
      mutations.disconnect()
      observer.disconnect()
      rootStyle.removeProperty('--sticky-cta-height')
    }
  }, [bar])

  return hasVisibleCTA
}

function useStickySuspension() {
  const [suspended, setSuspended] = useState(false)

  useEffect(() => {
    const viewport = window.visualViewport
    const mediaEvents = ['play', 'pause', 'ended', 'fullscreenchange']

    function update() {
      const focused = document.activeElement
      const typing = focused?.matches('input:not([readonly]), textarea:not([readonly]), select') || focused?.isContentEditable
      const keyboard = typing && viewport && viewport.scale <= 1 &&
        window.innerHeight - viewport.height > 100
      const overlay = document.querySelector('dialog[open], [data-checkout-active="true"]')
      const playing = [...document.querySelectorAll('video[controls]')].some((video) => !video.paused && !video.ended)

      setSuspended(Boolean(keyboard || overlay || playing || document.fullscreenElement))
    }

    const observer = new MutationObserver(update)
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open', 'data-checkout-active', 'controls'],
    })
    viewport?.addEventListener('resize', update)
    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)
    mediaEvents.forEach((event) => document.addEventListener(event, update, true))
    update()

    return () => {
      observer.disconnect()
      viewport?.removeEventListener('resize', update)
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
      mediaEvents.forEach((event) => document.removeEventListener(event, update, true))
    }
  }, [])

  return suspended
}

function StickyRegistrationBar({ offerSeconds }) {
  const bar = useRef(null)
  const reducedMotion = useReducedMotion()
  const suspended = useStickySuspension()
  const hasVisibleCTA = useVisibleRegistrationCTA(bar)
  const { closed, canReserve, eventStatus } = useWebinarRegistration()

  return (
    <motion.aside
      ref={bar}
      className="sticky-registration"
      aria-label="Webinar registration"
      data-suspended={suspended}
      data-cta-visible={hasVisibleCTA}
      inert={suspended || hasVisibleCTA}
      initial={reducedMotion ? false : { opacity: 0, y: '18%' }}
      animate={{ opacity: hasVisibleCTA ? 0 : 1, y: hasVisibleCTA ? '100%' : '0%' }}
      transition={{ duration: reducedMotion ? 0 : hasVisibleCTA ? 0.3 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sticky-registration-inner">
        <div className="sticky-registration-offer">
          <p className="sticky-desktop-label">Complete Masterclass Access</p>
          <p className="sticky-mobile-label">Registration Fee</p>
          <p className="sticky-registration-amount">
            <PriceDisplay />
          </p>
          <p className="sticky-desktop-label sticky-registration-fee">One-Time Registration</p>
        </div>
        <div className="sticky-registration-timer">
          {offerSeconds > 0
            ? <OfferCountdown seconds={offerSeconds} compact />
            : <CountdownTimer startAt={webinarStartAt} eventStatus={eventStatus} />}
        </div>
        <div className="sticky-registration-actions">
          <RegistrationButton
            className="sticky-registration-button"
            showArrow={!closed}
            observeInPage={false}
          />
          {!closed && !canReserve && <p className="sr-only">Registration is not open yet.</p>}
        </div>
      </div>
    </motion.aside>
  )
}

export default function StickyCTA({ offerSeconds }) {
  return webinarConfig.stickyCTAEnabled ? <StickyRegistrationBar offerSeconds={offerSeconds} /> : null
}
