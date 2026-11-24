import { motion, useReducedMotion } from 'framer-motion'
import { premiumReveal } from '../utils/premiumMotion'
import FAQAccordion from '../components/common/FAQAccordion'
import { faq } from '../config/faq'
import './landing-end.css'

export default function FAQ() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    if (reducedMotion) return {}
    return {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.12 },
      transition: { ...premiumReveal, delay },
    }
  }

  return (
    <section className="webinar-faq section-light" aria-labelledby="faq-title">
      <div className="faq-content">
        <motion.p className="landing-end-label" {...entrance()}>Frequently Asked Questions</motion.p>
        <motion.h2 id="faq-title" className="faq-title" {...entrance(0.06, 12)}>
          Still Have Questions?{' '}<span>We've Got Answers.</span>
        </motion.h2>
        <p className="landing-end-description">Everything you need to know before joining the live PCOS &amp; PCOD masterclass.</p>
        <FAQAccordion items={faq} entrance={entrance} />
      </div>
    </section>
  )
}
