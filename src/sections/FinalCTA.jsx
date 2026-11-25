import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { Lightbulb, MessagesSquare, Video } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import PriceDisplay from '../components/common/PriceDisplay'
import webinarConfig from '../config/webinar'
import './landing-end.css'

const benefits = [
  { label: 'Live Expert-Led Masterclass', Icon: Video },
  { label: 'Practical Wellness Guidance', Icon: Lightbulb },
  { label: 'Interactive Q&A', Icon: MessagesSquare },
]

export default function FinalCTA() {
  const reducedMotion = useReducedMotion()
  const { instructorName, webinar, webinarStartAt } = webinarConfig

  return (
    <section className="webinar-final-cta" aria-labelledby="final-cta-title">
      <motion.div
        className="final-cta-content"
        {...responsiveReveal(reducedMotion, 0, { y: 12 })}
      >
        <p className="landing-end-label">Your First Step Starts Today</p>
        <h2 id="final-cta-title">Stop Searching for Quick Fixes.{' '}<span>Start Understanding Your Body.</span></h2>
        <p className="landing-end-description">You deserve an approach to wellness that respects your individual needs and fits into your everyday life.</p>
        <p className="landing-end-description">
          Join {instructorName} for an expert-led masterclass on PCOS, balanced nutrition and sustainable lifestyle habits.
        </p>
        <ul className="final-cta-benefits" aria-label="Masterclass benefits">
          {benefits.map(({ label, Icon }) => (
            <li key={label}><Icon size={20} strokeWidth={1.7} aria-hidden="true" />{label}</li>
          ))}
        </ul>
        <div className="final-cta-offer">
          <p>Complete Masterclass Access</p>
          <p className="final-cta-price"><PriceDisplay /></p>
          <p>One-Time Registration Fee</p>
        </div>
        <RegistrationButton className="final-cta-registration" showArrow />
        <p className="final-cta-date">{webinar.recurringSchedule} IST</p>
        {webinarStartAt && webinar.date !== 'To be announced' && webinar.time !== 'To be announced' && (
          <time className="final-cta-date" dateTime={webinarStartAt}>{webinar.date} · {webinar.time}</time>
        )}
        <p className="final-cta-note">Live Masterclass • Expert Guidance • Practical Learning</p>
      </motion.div>
    </section>
  )
}
