import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import ComparisonCard from '../components/common/ComparisonCard'
import LimitationCard from '../components/common/LimitationCard'
import RegistrationButton from '../components/common/RegistrationButton'
import { approaches, limitations } from '../config/comparison'
import webinarConfig from '../config/webinar'
import './comparison.css'

const benefits = ['Live Expert-Led Masterclass', 'Interactive Q&A', 'Practical Guidance']

export default function Comparison() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, offset = {}) {
    return responsiveReveal(reducedMotion, delay, offset, 0.15)
  }

  return (
    <section className="wellness-comparison" aria-labelledby="comparison-title">
      <div className="comparison-content">
        <motion.p className="comparison-label" {...entrance()}>The Problem With Quick Fixes</motion.p>
        <motion.h2 className="comparison-title" id="comparison-title" {...entrance(0.06, { y: 12 })}>
          It's Not About Trying Harder.{' '}
          <span>It's About Understanding Better.</span>
        </motion.h2>
        <p className="comparison-description">
          Every woman's body is different. Generic solutions may not address individual health and lifestyle needs.
        </p>
        <ul className="limitation-grid">
          {limitations.map((limitation, index) => (
            <motion.li key={limitation.category} {...entrance((index % 3) * 0.06, { y: 10 })}>
              <LimitationCard limitation={limitation} />
            </motion.li>
          ))}
        </ul>

        <div className="comparison-approaches">
          <motion.h3 {...entrance(0, { y: 10 })}>A Different Approach to Wellness</motion.h3>
          <p className="comparison-description">
            Move beyond generic restrictions and discover a more informed approach to your health.
          </p>
          <div className="comparison-columns">
            {approaches.map((approach, index) => (
              <motion.div key={approach.id} {...entrance(index * 0.06, { x: index === 0 ? -12 : 12 })}>
                <ComparisonCard approach={approach} />
              </motion.div>
            ))}
            <span className="comparison-versus" aria-hidden="true">VS</span>
          </div>
          <div className="comparison-images">
            {approaches.map((approach, index) => (
              <motion.div key={approach.id} {...entrance(index * 0.08)}>
                <img src={approach.image} alt={approach.imageAlt} width={960} height={540} loading="lazy" decoding="async" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="comparison-conclusion" {...entrance(0, { y: 10 })}>
          <h3>
            Your Body Deserves Understanding,{' '}
            <span>Not Endless Restrictions.</span>
          </h3>
          <p className="comparison-description">
            Discover a more informed approach to nutrition, hormonal health and everyday wellness with {webinarConfig.instructorName}.
          </p>
          <p className="comparison-takeaway">Practical Knowledge. Balanced Nutrition. Sustainable Habits.</p>
        </motion.div>
        <motion.div className="comparison-actions" {...entrance(0.05, { y: 8 })}>
          <RegistrationButton className="comparison-registration" showArrow />
          <ul className="comparison-benefits" aria-label="Masterclass benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
