import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import PricingCard from '../components/common/PricingCard'
import webinarConfig from '../config/webinar'
import './pricing.css'

const policies = [
  ['Privacy Policy', webinarConfig.privacyPolicyUrl],
  ['Terms & Conditions', webinarConfig.termsUrl],
  ['Refund Policy', webinarConfig.refundPolicyUrl],
].filter(([, url]) => url)

export default function Pricing() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.12)
  }

  return (
    <section className="webinar-pricing" id="registration" tabIndex={-1} aria-labelledby="pricing-title">
      <div className="pricing-content">
        <motion.p className="pricing-label" {...entrance()}>Your Wellness Journey Starts Here</motion.p>
        <motion.h2 id="pricing-title" className="pricing-title" {...entrance(0.06, 12)}>
          One Masterclass.{' '}<span>A Clearer Direction.</span>
        </motion.h2>
        <p className="pricing-description">
          Everything you need to take a more informed approach towards your health, nutrition and everyday wellness.
        </p>
        <PricingCard entrance={entrance} />
        <div className="pricing-privacy">
          <h3>Your Privacy Matters</h3>
          <p>Your registration information will be handled in accordance with our privacy policy.</p>
          {policies.length > 0 && (
            <ul aria-label="Registration policies">
              {policies.map(([label, url]) => <li key={label}><a href={url}>{label}</a></li>)}
            </ul>
          )}
          {webinarConfig.refundGuaranteeEnabled && webinarConfig.refundGuaranteeTerms && (
            <p>{webinarConfig.refundGuaranteeTerms}</p>
          )}
        </div>
      </div>
    </section>
  )
}
