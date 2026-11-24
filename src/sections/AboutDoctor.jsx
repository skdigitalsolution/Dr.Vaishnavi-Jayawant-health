import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import DoctorBiography from '../components/common/DoctorBiography'
import DoctorGallery from '../components/common/DoctorGallery'
import RegistrationButton from '../components/common/RegistrationButton'
import { doctor } from '../config/doctor'
import './about-doctor.css'

const approvedGallery = doctor.galleryImages.filter(
  ({ image, alt, isPlaceholder, isVerified, hasConsent }) => image && alt && !isPlaceholder && isVerified && hasConsent,
)
const gallery = approvedGallery.length ? approvedGallery : doctor.previewGallery
const benefits = ['Expert Guidance', 'Practical Learning', 'Interactive Q&A']

export default function AboutDoctor() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, offset = {}) {
    if (reducedMotion) return {}
    return {
      initial: { opacity: 0, ...offset },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, amount: 0.12 },
      transition: { ...premiumReveal, delay },
    }
  }

  return (
    <section className="about-doctor section-light" aria-label="Meet Dr. Vaishnavi">
      <div className="doctor-content">
        {gallery.length > 0 && (
          <>
            <div className="doctor-gallery-heading">
              <motion.p className="doctor-label" {...entrance()}>Experience Beyond the Consultation Room</motion.p>
              <motion.h2 {...entrance(0.06, { y: 12 })}>
                Professional Knowledge.{' '}<span>Personal Understanding.</span>
              </motion.h2>
              <p>Combining professional experience, personal understanding and a compassionate approach to women's health and wellness.</p>
              {!approvedGallery.length && <p className="doctor-draft">Development preview · Illustrative scenes</p>}
            </div>
            <DoctorGallery images={gallery} entrance={entrance} reducedMotion={reducedMotion} />
          </>
        )}
        <DoctorBiography entrance={entrance} />
        <motion.div className="doctor-actions" {...entrance(0.05, { y: 8 })}>
          <h3>Learn Live With {doctor.name}</h3>
          <RegistrationButton className="doctor-registration" />
          <ul className="doctor-benefits" aria-label="Masterclass benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
