import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { doctor, doctorStatistics } from '../../config/doctor'
import AnimatedCounter from './AnimatedCounter'

export default function DoctorBiography({ entrance }) {
  const { name, professionalTitle, qualifications, certifications, biography, profileImage,
    professionalApproach, personalMessage, verificationStatus, approvalStatus } = doctor
  const credentials = verificationStatus.credentials ? [...qualifications, ...certifications] : []

  return (
    <>
      <div className="doctor-biography" id="doctor-biography" tabIndex={-1}>
        {verificationStatus.biographyPortrait && (
          <motion.figure className="doctor-profile" {...entrance(0, { x: -18 })}>
            <motion.div className="doctor-profile-frame" aria-hidden="true" {...entrance(0.12, { y: -6 })} />
            <div className="doctor-profile-portrait">
              <img src={profileImage} alt={name} width={1280} height={1600} loading="lazy" decoding="async" />
              <motion.figcaption className="doctor-profile-namecard" {...entrance(0.16, { y: 8 })}>
                <strong>{name}</strong>
                <span>{professionalTitle}</span>
              </motion.figcaption>
            </div>
          </motion.figure>
        )}
        <motion.div className="doctor-biography-copy" {...entrance(0.05, { x: 18 })}>
          <p className="doctor-label">Meet Your Webinar Host</p>
          <h2>{name}</h2>
          <p className="doctor-subtitle">{professionalTitle}</p>
          {credentials.length > 0 && (
            <ul className="doctor-credentials" aria-label="Professional credentials">
              {credentials.map((credential) => <li key={credential}>{credential}</li>)}
            </ul>
          )}
          {biography && (
            <div className="doctor-biography-journey">
              {!approvalStatus.biography && <p className="doctor-draft">Draft biography · Pending approval</p>}
              <h3>I've Been Through This Journey Too.</h3>
              {biography.map((paragraph, index) => (
                <motion.p key={paragraph} {...entrance(index * 0.05, { y: 6 })}>{paragraph}</motion.p>
              ))}
            </div>
          )}
          {doctorStatistics.length > 0 && (
            <ul className="doctor-stats" aria-label="Verified professional experience">
              {doctorStatistics.map(({ id, value, suffix, heading }, index) => (
                <motion.li key={id} {...entrance(index * 0.06, { y: 6 })}>
                  <strong><AnimatedCounter value={value} suffix={suffix} /></strong>
                  <span>{heading}</span>
                </motion.li>
              ))}
            </ul>
          )}
          <div className="doctor-approach">
            <h3>My Approach to Women's Wellness</h3>
            <ul>
              {professionalApproach.map(({ title, icon: Icon }, index) => (
                <motion.li key={title} {...entrance(index * 0.045, { y: 4 })}>
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />{title}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      {personalMessage && (
        <motion.figure className="doctor-message" {...entrance(0, { y: 8 })}>
          <Quote size={32} strokeWidth={1.6} aria-hidden="true" />
          {!approvalStatus.personalMessage && <p className="doctor-draft">Draft quotation · Pending approval</p>}
          <blockquote>{personalMessage}</blockquote>
          <figcaption>{name}</figcaption>
        </motion.figure>
      )}
    </>
  )
}
