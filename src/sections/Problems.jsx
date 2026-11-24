import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import ProblemCard from '../components/common/ProblemCard'
import RegistrationButton from '../components/common/RegistrationButton'
import { problems } from '../config/problems'
import './problems.css'

const benefits = ['Live Expert-Led Masterclass', 'Practical Guidance', 'Interactive Q&A']

export default function Problems() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    if (reducedMotion) return {}

    return {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: { ...premiumReveal, delay },
    }
  }

  return (
    <section className="problems-section" aria-labelledby="problems-title">
      <div className="problems-content">
        <motion.p className="problems-label" {...entrance()}>
          Let's Talk About the Real Problem
        </motion.p>
        <motion.h2 className="problems-title" id="problems-title" {...entrance(0.06, 12)}>
          Making an Effort, But Still{' '}
          <span>Looking for Answers?</span>
        </motion.h2>
        <p className="problems-description">
          Living with PCOS can bring unique challenges. Does any of this feel familiar?
        </p>
        <ul className="problems-grid">
          {problems.map((problem, index) => (
            <motion.li key={problem.id} {...entrance((index % 3) * 0.065, 10)}>
              <ProblemCard problem={problem} />
            </motion.li>
          ))}
        </ul>
        <motion.div className="problems-support" {...entrance()}>
          <h3>If Any of These Feel Familiar, You're Not Alone.</h3>
          <p>It's time to move beyond confusing advice and understand your body's individual needs.</p>
          <p>PCOS is a complex condition, and an informed approach to nutrition, lifestyle and appropriate healthcare can help you make better decisions about your wellness.</p>
          <p className="problems-takeaway">Understanding Your Body Comes First.</p>
        </motion.div>
        <motion.div className="problems-actions" {...entrance(0.05, 8)}>
          <RegistrationButton className="problems-registration" />
          <ul className="problems-benefits" aria-label="Masterclass benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
