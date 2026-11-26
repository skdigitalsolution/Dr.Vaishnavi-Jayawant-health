import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import BonusCard from '../components/common/BonusCard'
import RegistrationButton from '../components/common/RegistrationButton'
import { bonusPageCount, bonusResources } from '../config/bonuses'
import './bonuses.css'

export default function Bonuses() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.12)
  }

  return (
    <section className="webinar-bonuses" aria-labelledby="bonuses-title">
      <div className="bonuses-content">
        <motion.p className="bonuses-label" {...entrance()}>Exclusive Registration Bonuses</motion.p>
        <motion.h2 className="bonuses-title" id="bonuses-title" {...entrance(0.06, 12)}>
          Register for the Masterclass &amp;{' '}
          <span>Get 3 eBooks Absolutely FREE!</span>
        </motion.h2>
        <p className="bonuses-description">
          Discover valuable insights into health, wealth and a more balanced life with Dr. Vaishnavi Jayawant.
        </p>

        <ul className="bonuses-grid">
          {bonusResources.map((bonus, index) => (
            <motion.li key={bonus.id} {...entrance(index * 0.065, 10)}>
              <BonusCard bonus={bonus} entrance={entrance} reducedMotion={reducedMotion} />
            </motion.li>
          ))}
        </ul>

        <motion.div className="bonuses-offer" {...entrance(0, 10)}>
          <h3>3 Books. {bonusPageCount} Pages. One Registration.</h3>
          <p className="bonuses-price"><strong>Absolutely FREE!</strong></p>
          <p className="bonuses-inclusion-note">Receive all three eBooks after successful payment.</p>
          <motion.div className="bonuses-actions" {...entrance(0.06, 8)}>
            <RegistrationButton className="bonuses-registration" compactText="Reserve Seat" showArrow />
            <p>One-Time Registration <span aria-hidden="true">•</span> No Additional Charges</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
