import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { Gift, ShieldCheck, Timer, UserRoundCheck, Video, Volume2 } from 'lucide-react'
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
const videoHintId = 'intro-video-hint'

export default function IntroVideo({ ebookPromotionActive, ebookPromotionExpired }) {
  const reducedMotion = useReducedMotion()
  const introduction = webinarConfig.introduction
  const developmentPreview = !ebookPromotionActive && (
    import.meta.env.DEV || (offer.preview && !offer.promotionApproved)
  )
  const showPromotion = ebookPromotionActive || developmentPreview
  const referenceValue = developmentPreview ? '₹999' : offer.verifiedReferenceValue

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
            showArrow
          />
          <ul className="intro-trust">
            {trustItems.map(({ Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" size={15} />{label}</li>
            ))}
          </ul>
        </motion.div>
        <motion.aside
          className="intro-ebook-offer"
          aria-label="Premium Health eBook"
          initial={false}
          whileInView={reducedMotion ? undefined : { y: [5, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          {developmentPreview && <p className="intro-ebook-preview">Development preview</p>}
          {showPromotion && <p className="intro-ebook-window"><Timer size={20} aria-hidden="true" />Register Within 5 Minutes</p>}
          <p className="intro-ebook-title">
            <Gift size={24} aria-hidden="true" />
            {showPromotion ? 'Unlock a Premium Health eBook' : 'Premium Health eBook'}
          </p>
          {showPromotion ? (
            <>
              <p className="intro-ebook-value">
                {referenceValue && <><s>{referenceValue}</s><span aria-hidden="true">—</span></>}
                <strong>Absolutely FREE!</strong>
              </p>
              <p className="intro-ebook-note">Your wellness journey begins with an exclusive bonus.</p>
            </>
          ) : (
            <p className="intro-ebook-note">
              {ebookPromotionExpired ? 'The free eBook offer has expired.' : 'The free eBook offer is currently unavailable.'}
            </p>
          )}
        </motion.aside>
      </div>
    </section>
  )
}
