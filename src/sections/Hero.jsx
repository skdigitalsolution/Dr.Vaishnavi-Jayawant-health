import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import { Layers, MessageCircle, Video } from 'lucide-react'
import webinarConfig from '../config/webinar'
import RegistrationButton from '../components/common/RegistrationButton'
import './hero.css'

const benefits = [
  { Icon: Video, label: 'Live Online Masterclass' },
  { Icon: MessageCircle, label: 'Interactive Q&A' },
  { Icon: Layers, label: 'Practical Guidance' },
]

const headlineLines = [
  'How Women With PCOS Can',
  'Better Understand Their',
  'Hormonal Health Through',
]

const { date, time, duration } = webinarConfig.webinar
const details = [date, time, duration]
const badgeText = details.every((detail) => detail && detail !== 'To be announced')
  ? ['LIVE ONLINE', ...details].join(' · ')
  : 'LIVE PCOS & PCOD MASTERCLASS'

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const { image, video } = webinarConfig.hero

  function entrance(delay, offset = {}) {
    const compact = window.matchMedia('(max-width: 1023px)').matches
    return {
      initial: reducedMotion || compact ? false : { opacity: 0, ...offset },
      animate: { opacity: 1, y: 0 },
      transition: { ...premiumReveal, duration: reducedMotion ? 0 : premiumReveal.duration, delay: reducedMotion ? 0 : delay },
    }
  }

  return (
    <main className="webinar-hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <img alt="" src={image} fetchPriority="high" decoding="async" />
        {video && reducedMotion === false && (
          <video src={video} poster={image} autoPlay muted loop playsInline />
        )}
      </div>
      <div className="hero-content">
        <motion.p className="hero-badge" {...entrance(0)}>
          <span className="hero-live-dot" aria-hidden="true" />
          {badgeText}
        </motion.p>
        <motion.h1 id="hero-title" className="hero-title" {...entrance(0.08, { y: 16 })}>
          {headlineLines.map((line) => <span key={line}>{line}{' '}</span>)}
          <span className="hero-title-accent gradient-text-shine">Nutrition &amp; Sustainable Habits</span>
        </motion.h1>
        <motion.p className="hero-description" {...entrance(0.18)}>
          A practical live masterclass with <strong>{webinarConfig.instructorName}</strong> to help you understand PCOS, explore balanced nutrition and make informed lifestyle choices for your long-term wellness.
        </motion.p>
        <ul className="hero-benefits" aria-label="Masterclass benefits">
          {benefits.map(({ Icon, label }, index) => (
            <motion.li key={label} {...entrance(0.26 + index * 0.07, { y: 6 })}>
              <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
              {label}
            </motion.li>
          ))}
        </ul>
        <motion.div className="mt-5" {...entrance(0.35, { y: 6 })}>
          <RegistrationButton />
        </motion.div>
      </div>
    </main>
  )
}
