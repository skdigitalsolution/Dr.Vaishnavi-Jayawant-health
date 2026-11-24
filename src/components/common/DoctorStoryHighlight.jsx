import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../../utils/premiumMotion'
import { ArrowRight, UserRound } from 'lucide-react'
import { doctor } from '../../config/doctor'
import '../../sections/about-doctor.css'

export default function DoctorStoryHighlight() {
  const reducedMotion = useReducedMotion()
  const { personalStory, approvalStatus, verificationStatus, name, profileImage } = doctor
  if (!personalStory) return null

  return (
    <aside className="doctor-story section-light" aria-labelledby="doctor-story-title">
      <motion.div
        className="doctor-story-inner"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...premiumReveal, duration: reducedMotion ? 0 : premiumReveal.duration }}
      >
        {verificationStatus.profileImage ? (
          <img src={profileImage} alt={name} width={96} height={128} loading="lazy" decoding="async" />
        ) : (
          <span className="doctor-story-avatar" aria-hidden="true"><UserRound size={30} /></span>
        )}
        <div>
          {!approvalStatus.personalStory && <p className="doctor-draft">Draft · Pending approval</p>}
          <h2 id="doctor-story-title">{personalStory.heading}</h2>
          <p>{personalStory.text}</p>
          <p className="doctor-story-name">{name}</p>
          <a href="#doctor-biography">Meet your mentor <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </motion.div>
    </aside>
  )
}
