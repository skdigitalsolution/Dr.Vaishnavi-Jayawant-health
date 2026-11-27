import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import BonusCard from '../components/common/BonusCard'
import webinarConfig from '../config/webinar'
import RegistrationButton from '../components/common/RegistrationButton'
import { bonusBookCount, bonusPageCount, bonusResources, complimentaryEBooks, eBookRegistrationNote } from '../config/bonuses'
import './bonuses.css'

export default function Bonuses() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.12)
  }

  return (
    <section className="webinar-bonuses" aria-labelledby="bonuses-title">
      <div className="bonuses-content">
        <motion.p className="bonuses-label" {...entrance()}>Registration Bonuses</motion.p>
        <motion.h2 className="bonuses-title" id="bonuses-title" {...entrance(0.06, 12)}>
          Register for the Masterclass &amp;{' '}
          <span>Get {complimentaryEBooks}</span>
        </motion.h2>
        <p className="bonuses-description">
          Discover valuable insights into health, wealth and a more balanced life with {webinarConfig.instructorName}.
        </p>

        <ul className="bonuses-grid">
          {bonusResources.map((bonus, index) => (
            <motion.li key={bonus.id} {...entrance(index * 0.065, 10)}>
              <BonusCard bonus={bonus} entrance={entrance} reducedMotion={reducedMotion} />
            </motion.li>
          ))}
        </ul>

        <motion.div className="bonuses-offer" {...entrance(0, 10)}>
          <h3>{bonusBookCount} Books. {bonusPageCount} Pages. One Registration.</h3>
          <p className="bonuses-price"><strong>Included With Registration</strong></p>
          <p className="bonuses-inclusion-note">{eBookRegistrationNote}</p>
          <motion.div className="bonuses-actions" {...entrance(0.06, 8)}>
            <RegistrationButton className="bonuses-registration" compactText="Reserve Seat" showArrow />
            <p>No extra charge for the eBooks.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
