import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import AudienceCategoryCard from '../components/common/AudienceCategoryCard'
import AudienceQualificationCard from '../components/common/AudienceQualificationCard'
import RegistrationButton from '../components/common/RegistrationButton'
import { audienceCategories, qualifications } from '../config/audience'
import './target-audience.css'

const benefits = ['Live Expert Guidance', 'Practical Learning', 'Interactive Q&A']

export default function TargetAudience() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, offset = {}) {
    if (reducedMotion) return {}
    return {
      initial: { opacity: 0, ...offset },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: { ...premiumReveal, delay },
    }
  }

  return (
    <section className="target-audience" aria-labelledby="audience-title">
      <div className="audience-content">
        <motion.p className="audience-label" {...entrance()}>Is This Masterclass Right for You?</motion.p>
        <motion.h2 className="audience-title" id="audience-title" {...entrance(0.06, { y: 12 })}>
          Who Should Attend{' '}<span>This Live Masterclass?</span>
        </motion.h2>
        <p className="audience-description">
          Designed for women who want to better understand their bodies, discover practical nutrition strategies and make informed wellness decisions.
        </p>
        <div className="audience-qualification-grid">
          {qualifications.map((qualification) => (
            <AudienceQualificationCard key={qualification.id} qualification={qualification} entrance={entrance} />
          ))}
        </div>

        <div className="audience-categories">
          <motion.h3 {...entrance(0, { y: 10 })}>
            Designed for Real Women.{' '}<span>Designed for Real Life.</span>
          </motion.h3>
          <p className="audience-description">
            Whether you're managing a busy career, caring for your family or focusing on your personal wellness, this masterclass offers practical learning for everyday life.
          </p>
          <ul className="audience-category-grid">
            {audienceCategories.map((category, index) => (
              <motion.li key={category.title} {...entrance(index * 0.06, { y: 10 })}>
                <AudienceCategoryCard category={category} />
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div className="audience-support" {...entrance()}>
          <h3>Wherever You Are in Your Wellness Journey,<br />Learning More Is a Meaningful First Step.</h3>
          <p className="audience-description">
            You don't need to have all the answers before you begin. Start with knowledge, practical guidance and a better understanding of your body's individual needs.
          </p>
          <p className="audience-takeaway">Your Journey. Your Pace. Your Wellness.</p>
        </motion.div>
        <motion.div className="audience-actions" {...entrance(0.05, { y: 8 })}>
          <RegistrationButton className="audience-registration" showArrow />
          <ul className="audience-benefits" aria-label="Masterclass benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
