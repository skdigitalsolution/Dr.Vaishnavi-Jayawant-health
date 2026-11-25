import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { ShieldCheck, UserRoundCheck, Video, Volume2 } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import VideoPlayer from '../components/common/VideoPlayer'
import webinarConfig from '../config/webinar'
import './intro-video.css'

const trustItems = [
  { Icon: ShieldCheck, label: 'Secure Payment' },
  { Icon: Video, label: 'Live Masterclass' },
  { Icon: UserRoundCheck, label: 'Expert Guidance' },
]
const videoHintId = 'intro-video-hint'

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
          <VideoPlayer {...introduction} descriptionId={introduction.video ? videoHintId : undefined} />
          {introduction.video && (
            <p className="intro-video-hint" id={videoHintId}>
              <Volume2 aria-hidden="true" size={17} />
              Tap to play the video with sound.
            </p>
          )}
        </motion.div>
        <motion.div className="intro-video-actions" {...entrance(0.05, 10)}>
          <RegistrationButton
            className="intro-registration-button"
            text={`Yes! Reserve My Seat – ${webinarConfig.registration.displayPrice}`}
            showArrow
          />
          <ul className="intro-trust">
            {trustItems.map(({ Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" size={15} />{label}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
