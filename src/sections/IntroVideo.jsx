import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal, responsiveReveal } from '../utils/premiumMotion'
import { Gift, ShieldCheck, UserRoundCheck, Video } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import VideoPlayer from '../components/common/VideoPlayer'
import webinarConfig from '../config/webinar'
import './intro-video.css'

const trustItems = [
  { Icon: ShieldCheck, label: 'Secure Payment' },
  { Icon: Video, label: 'Live Masterclass' },
  { Icon: UserRoundCheck, label: 'Expert Guidance' },
]

export default function IntroVideo() {
  const reducedMotion = useReducedMotion()
  const introduction = webinarConfig.introduction

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
          <p className="intro-ebook-bonus-label">Exclusive Registration Bonuses</p>
          <h3 className="intro-ebook-bonus-title intro-ebook-bonus-price">
            <Gift className="intro-ebook-bonus-gift" aria-hidden="true" size={26} />
            <strong>Get 3 FREE eBooks</strong>
          </h3>
          <p className="intro-ebook-bonus-description">Receive All 3 eBooks After Successful Registration</p>
        </motion.div>
      </div>
    </section>
  )
}
