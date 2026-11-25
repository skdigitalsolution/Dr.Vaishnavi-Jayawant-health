import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import BonusCard from '../components/common/BonusCard'
import RegistrationButton from '../components/common/RegistrationButton'
import { bonusOffer, bonusResources } from '../config/bonuses'
import webinarConfig from '../config/webinar'
import './bonuses.css'

const availableBonuses = bonusResources.filter(({ isApproved, isAvailable, isPlaceholder }) =>
  isApproved && isAvailable && !isPlaceholder,
)
const preview = import.meta.env.DEV && availableBonuses.length < bonusResources.length
const visibleBonuses = preview ? bonusResources : availableBonuses
const count = visibleBonuses.length
const countWord = ['Zero', 'One', 'Two', 'Three'][count] ?? String(count)
const resourceLabel = count === 1 ? 'Wellness Resource' : 'Wellness Resources'

export default function Bonuses() {
  const reducedMotion = useReducedMotion()
  if (!count) return null

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.12)
  }

  return (
    <section className="webinar-bonuses" aria-labelledby="bonuses-title">
      <div className="bonuses-content">
        <motion.p className="bonuses-label" {...entrance()}>Exclusive Resources for Webinar Attendees</motion.p>
        <motion.h2 className="bonuses-title" id="bonuses-title" {...entrance(0.06, 12)}>
          Register for the Masterclass &amp;{' '}
          <span>Unlock {count} Exclusive {count === 1 ? 'Bonus' : 'Bonuses'}</span>
        </motion.h2>
        <p className="bonuses-description">
          Practical wellness resources designed to help you continue your learning beyond the live masterclass and build more informed everyday habits.
        </p>
        {preview && <p className="bonuses-preview">Development preview · Proposed resources pending confirmation</p>}

        <ul className="bonuses-grid" data-count={count}>
          {visibleBonuses.map((bonus, index) => (
            <motion.li key={bonus.id} {...entrance(index * 0.065, 10)}>
              <BonusCard bonus={bonus} preview={!availableBonuses.includes(bonus)} entrance={entrance} reducedMotion={reducedMotion} showReferenceValues={bonusOffer.showReferenceValues} />
            </motion.li>
          ))}
        </ul>

        <motion.div className="bonuses-offer" {...entrance(0, 10)}>
          <h3>One Masterclass. {countWord} {resourceLabel}.</h3>
          <p className="bonuses-description">
            {preview
              ? 'The proposed package combines the live PCOS & PCOD masterclass, interactive Q&A and three practical wellness resources.'
              : `Get access to the live PCOS & PCOD masterclass, interactive Q&A and ${countWord.toLowerCase()} practical ${count === 1 ? 'wellness resource' : 'wellness resources'} with a single registration.`}
          </p>
          <p className="bonuses-price-label">{preview ? 'Webinar Registration' : 'Complete Access For Just'}</p>
          <p className="bonuses-price">{webinarConfig.registration.displayPrice}</p>
          <p className="bonuses-inclusion-note">
            {preview ? 'Bonus availability is pending confirmation.' : 'All Included With Your Webinar Registration.'}
          </p>
          <motion.div className="bonuses-actions" {...entrance(0.06, 8)}>
            <RegistrationButton className="bonuses-registration" text="Claim My Seat + Bonuses" showArrow />
            <p>One-Time Registration <span aria-hidden="true">•</span> No Additional Charges</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
