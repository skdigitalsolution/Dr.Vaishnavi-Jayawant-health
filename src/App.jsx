import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import WebinarSchedule from './sections/WebinarSchedule'
import IntroVideo from './sections/IntroVideo'
import TrustStats from './sections/TrustStats'
import Problems from './sections/Problems'
import Comparison from './sections/Comparison'
import WebinarAgenda from './sections/WebinarAgenda'
import TargetAudience from './sections/TargetAudience'
import DoctorStoryHighlight from './components/common/DoctorStoryHighlight'
import AboutDoctor from './sections/AboutDoctor'
import Bonuses from './sections/Bonuses'
import RegistrationSteps from './sections/RegistrationSteps'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './components/layout/Footer'
import StickyCTA from './components/layout/StickyCTA'
import OfferPopup from './components/common/OfferPopup'
import FloatingOfferButton from './components/common/FloatingOfferButton'
import WhatsAppWidget from './components/common/WhatsAppWidget'
import { whatsAppSupport } from './config/whatsAppSupport'
import offer, { hasBlockingOfferOverlay } from './config/offer'
import useWebinarRegistration from './hooks/useWebinarRegistration'

function RegistrationOverlays({ closed }) {
  const [popupMode, setPopupMode] = useState(null)
  const isPopupOpen = popupMode !== null
  const [hasAutoPopupDismissed, setAutoPopupDismissed] = useState(() =>
    offer.preview && sessionStorage.getItem(offer.shownKey) === 'true')
  const manualTrigger = useRef(null)

  const showAutomatically = useEffectEvent(() => {
    if (closed || sessionStorage.getItem(offer.shownKey) === 'true' || hasBlockingOfferOverlay()) return
    setPopupMode('automatic')
  })

  const markOfferShown = useCallback(() => {
    sessionStorage.setItem(offer.shownKey, 'true')
  }, [])

  useEffect(() => {
    if (!offer.preview) return
    window.resetOfferPreview = () => {
      sessionStorage.removeItem(offer.shownKey)
      window.location.reload()
    }

    let timeout
    let cancelled = false
    const schedule = async () => {
      const heroImage = document.querySelector('.hero-backdrop img')
      await heroImage?.decode().catch(() => {})
      if (!cancelled) timeout = window.setTimeout(() => showAutomatically(), offer.popupDelayMs)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      cancelled = true
      delete window.resetOfferPreview
      window.removeEventListener('load', schedule)
      window.clearTimeout(timeout)
    }
  }, [])

  function openOfferPopup(event) {
    if (closed || hasBlockingOfferOverlay()) return
    manualTrigger.current = event.currentTarget
    setPopupMode('manual')
  }

  function closeOfferPopup() {
    setAutoPopupDismissed(true)
    setPopupMode(null)
    const trigger = manualTrigger.current
    manualTrigger.current = null
    if (trigger) {
      requestAnimationFrame(() => {
        if (!trigger.closest('[inert]')) trigger.focus({ preventScroll: true })
      })
    }
  }

  return (
    <>
      <StickyCTA />
      <WhatsAppWidget {...whatsAppSupport} />
      {offer.preview && hasAutoPopupDismissed && (
        <FloatingOfferButton enabled={!closed && !isPopupOpen} onOpen={openOfferPopup} />
      )}
      {isPopupOpen && (
        <OfferPopup
          onOpen={popupMode === 'automatic' ? markOfferShown : undefined}
          onClose={closeOfferPopup}
        />
      )}
    </>
  )
}

export default function App() {
  const { closed } = useWebinarRegistration()

  return (
    <div className="webinar-page relative min-h-screen bg-primary-bg text-primary-text">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <IntroVideo />
      <WebinarSchedule />
      <TrustStats />
      <Problems />
      <DoctorStoryHighlight />
      <Comparison />
      <WebinarAgenda />
      <TargetAudience />
      <AboutDoctor />
      <Bonuses />
      <RegistrationSteps />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <RegistrationOverlays closed={closed} />
    </div>
  )
}
