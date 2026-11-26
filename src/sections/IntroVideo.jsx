import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal, responsiveReveal } from '../utils/premiumMotion'
import { Gift, ShieldCheck, Timer, UserRoundCheck, Video } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import VideoPlayer from '../components/common/VideoPlayer'
import offer from '../config/offer'
import webinarConfig from '../config/webinar'
import './intro-video.css'

const trustItems = [
  { Icon: ShieldCheck, label: 'Secure Payment' },
  { Icon: Video, label: 'Live Masterclass' },
  { Icon: UserRoundCheck, label: 'Expert Guidance' },
]

export default function IntroVideo({ promotionActive, promotionExpired }) {
  const reducedMotion = useReducedMotion()
  const introduction = webinarConfig.introduction
  const referenceValue = import.meta.env.DEV ? '₹999' : offer.verifiedReferenceValue
  const showPromotion = import.meta.env.DEV || (promotionActive && !promotionExpired)

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.15)
  }

  return (
    <section className="intro-video-section" aria-labelledby="intro-video-title">
      <div className="intro-video-content">
        <motion.p className="intro-video-label" {...entrance()}>
          A personal message from {webinarConfig.instructorName}
        </motion.p>
        <motion.h2 id="intro-video-title" className="intro-video-title" {...entrance(0.05, 12)}>
          Before You Take the First Step,{' '}
          <span>Watch This Video.</span>
        </motion.h2>
        <motion.p className="intro-video-description" {...entrance(0.1)}>
          Discover why understanding your body is the first step towards a more informed wellness journey.
        </motion.p>
        <motion.div className="intro-video-media" {...entrance(0.05, 14)}>
          <VideoPlayer {...introduction} />
        </motion.div>
        <motion.div className="intro-video-actions" {...entrance(0.05, 10)}>
          <RegistrationButton
            className="intro-registration-button"
            showArrow
          />
          <ul className="intro-trust">
            {trustItems.map(({ Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" size={15} />{label}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="intro-ebook-bonus"
          initial={false}
          whileInView={reducedMotion ? undefined : { opacity: [0.65, 1], y: [8, 0] }}
          viewport={{ once: true, amount: 0.2 }}
          transition={premiumReveal}
        >
          {showPromotion && (
            <p className="intro-ebook-bonus-label">
              <Timer aria-hidden="true" size={18} />
              Register Within 5 Minutes
            </p>
          )}
          <h3 className="intro-ebook-bonus-title">
            {showPromotion ? 'Unlock a Premium Health eBook' : 'Premium Health eBook'}
          </h3>
          {showPromotion && (
            <>
              <p className="intro-ebook-bonus-price">
                <Gift className="intro-ebook-bonus-gift" aria-hidden="true" size={26} />
                {referenceValue && <s>{referenceValue}</s>}
                <strong>Absolutely FREE!</strong>
              </p>
              <p className="intro-ebook-bonus-description">
                Your wellness journey begins with an exclusive bonus.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
