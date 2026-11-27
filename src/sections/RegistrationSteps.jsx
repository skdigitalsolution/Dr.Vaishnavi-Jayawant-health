import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { ChevronRight } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import RegistrationStepCard from '../components/common/RegistrationStepCard'
import { registrationIndicators, registrationSteps } from '../config/registrationSteps'
import { refundPolicySummary } from '../config/legal'
import webinarConfig from '../config/webinar'
import './registration-steps.css'

const benefits = ['Secure Registration', 'Simple Process', 'Live Online']

export default function RegistrationSteps() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.12)
  }

  return (
    <section className="registration-steps section-light" aria-labelledby="registration-steps-title">
      <div className="registration-steps-content">
        <motion.p className="registration-steps-label" {...entrance()}>Getting Started Is Simple</motion.p>
        <motion.h2 className="registration-steps-title" id="registration-steps-title" {...entrance(0.06, 12)}>
          Your Wellness Journey Begins With{' '}<span>4 Simple Steps.</span>
        </motion.h2>
        <p className="registration-steps-description">
          Live masterclass · {webinarConfig.webinar.summary}
        </p>
        <ol className="registration-step-grid" role="list">
          {registrationSteps.map((step, index) => (
            <li key={step.id}>
              <motion.span className="registration-step-connector" aria-hidden="true" {...entrance(index * 0.07)}>
                {index < registrationSteps.length - 1 && <ChevronRight size={14} strokeWidth={2} />}
              </motion.span>
              <motion.div className="registration-step-reveal" {...entrance(index * 0.07, 10)}>
                <RegistrationStepCard step={step} />
              </motion.div>
            </li>
          ))}
        </ol>

        <ul className="registration-indicators" aria-label="Registration information">
          {registrationIndicators.map(({ label, icon: Icon }) => (
            <li key={label}><Icon size={20} strokeWidth={1.7} aria-hidden="true" />{label}</li>
          ))}
        </ul>

        <motion.div className="registration-steps-closing" {...entrance(0, 8)}>
          <h3>One Registration.{' '}<span>A Meaningful First Step.</span></h3>
          <p className="registration-steps-description">Join the live PCOS &amp; PCOD masterclass and take a more informed approach to your wellness journey.</p>
        </motion.div>
        <motion.div className="registration-steps-actions" {...entrance(0.06, 8)}>
          <p className="registration-policy-note">{refundPolicySummary}</p>
          <RegistrationButton className="registration-steps-button" showArrow />
          <ul className="registration-steps-benefits" aria-label="Registration benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
