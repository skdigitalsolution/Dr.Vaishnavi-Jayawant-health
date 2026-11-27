import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, HeartHandshake, Quote } from 'lucide-react'
import { useRef } from 'react'
import { responsiveReveal } from '../../utils/premiumMotion'
import { doctor } from '../../config/doctor'
import Button from '../ui/Button'
import '../../sections/about-doctor.css'

export default function DoctorStoryHighlight() {
  const reducedMotion = useReducedMotion()
  const mentorLink = useRef(null)
  const linkInView = useInView(mentorLink, { amount: 0.5 })
  const { personalStory, approvalStatus, profileImage, name } = doctor
  const hasApprovedStory = approvalStatus.personalStory
  const StoryIcon = hasApprovedStory ? Quote : HeartHandshake

  function reveal(delay = 0, offset = { y: 16 }) {
    return responsiveReveal(reducedMotion, delay, offset)
  }

  return (
    <section className="doctor-story section-light" aria-labelledby="doctor-story-title">
      <div className="doctor-story-inner">
        <motion.header className="doctor-story-heading" {...reveal()}>
          <p className="doctor-label">{hasApprovedStory ? 'A Personal Journey' : 'Understanding PCOS'}</p>
          <h2 id="doctor-story-title">{hasApprovedStory ? 'A Personal Understanding of PCOD' : 'Practical Guidance for Everyday Wellness'}</h2>
        </motion.header>
        <div className="doctor-story-grid">
          <motion.figure className="doctor-story-portrait" {...reveal(0.06, { x: -22 })}>
            <div className="doctor-story-photo">
              <motion.img
                src={profileImage} alt={name} width={1280} height={1600} loading="lazy" decoding="async"
                whileHover={reducedMotion ? undefined : { scale: 1.035 }}
                transition={{ duration: 0.56 }}
              />
              {!reducedMotion && (
                <motion.span className="doctor-story-border-shine" aria-hidden="true"
                  initial={{ backgroundPosition: '100% 0%' }}
                  whileInView={{ backgroundPosition: '0% 0%' }}
                  transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 4.1 }} />
              )}
            </div>
            <motion.figcaption className="doctor-story-namecard" {...reveal(0.16, { y: 12 })}>
              <strong>{name}</strong>
              <span>Women's Health &amp; Wellness</span>
            </motion.figcaption>
          </motion.figure>
          <motion.div className="doctor-story-copy" {...reveal(0.06, { x: 22 })}>
            <StoryIcon className="doctor-story-quote" size={48} strokeWidth={1.5} aria-hidden="true" />
            <h3>{hasApprovedStory ? "I've Been Through This Journey Too." : 'Start With the Questions That Matter to You'}</h3>
            <div className="doctor-story-paragraphs">
              {personalStory.paragraphs.map((paragraph, index) => (
                <motion.p key={paragraph} {...reveal(index * 0.06)}>{paragraph}</motion.p>
              ))}
            </div>
            <p className="doctor-story-statement">Balanced Nutrition. Sustainable Habits. Informed Choices.</p>
            <Button as={motion.a} ref={mentorLink} href="#doctor-biography"
              className="registration-button btn-shine doctor-story-mentor"
              data-shine-visible={linkInView} whileTap={reducedMotion ? undefined : { scale: 0.97 }}>
              Meet Your Mentor <ArrowRight className="registration-button-arrow" size={20} aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
