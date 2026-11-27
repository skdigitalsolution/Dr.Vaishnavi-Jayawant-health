import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import DoctorBiography from '../components/common/DoctorBiography'
import DoctorGallery from '../components/common/DoctorGallery'
import RegistrationButton from '../components/common/RegistrationButton'
import { doctor } from '../config/doctor'
import './about-doctor.css'

const approvedGallery = doctor.galleryImages.filter(
  ({ image, alt, isPlaceholder, isVerified, hasConsent }) => image && alt && !isPlaceholder && isVerified && hasConsent,
)
const gallery = approvedGallery.length ? approvedGallery : doctor.illustrativeGallery
const benefits = ['Expert Guidance', 'Practical Learning', 'Interactive Q&A']

export default function AboutDoctor() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, offset = {}) {
    return responsiveReveal(reducedMotion, delay, offset, 0.12)
  }

  return (
    <section className="about-doctor section-light" aria-label={'Meet ' + doctor.name}>
      <div className="doctor-content">
        {gallery.length > 0 && (
          <>
            <div className="doctor-gallery-heading">
              <motion.p className="doctor-label" {...entrance()}>{approvedGallery.length ? 'Professional Gallery' : 'Wellness Education'}</motion.p>
              <motion.h2 {...entrance(0.06, { y: 12 })}>
                {approvedGallery.length ? 'Professional Gallery' : 'Settings for Learning and Discussion'}
              </motion.h2>
              {!approvedGallery.length && <p>Illustrations of wellness education settings, including talks, workshops and consultations.</p>}
            </div>
            <DoctorGallery label={approvedGallery.length ? 'Professional photo gallery' : 'Wellness education illustrations'} images={gallery} entrance={entrance} reducedMotion={reducedMotion} />
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
