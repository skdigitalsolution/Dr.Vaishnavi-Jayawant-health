import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import AgendaModule from '../components/common/AgendaModule'
import LiveQACard from '../components/common/LiveQACard'
import RegistrationButton from '../components/common/RegistrationButton'
import { agendaModules, liveQA } from '../config/agenda'
import './webinar-agenda.css'

const benefits = ['Live Expert Guidance', 'Practical Learning', 'Interactive Q&A']

export default function WebinarAgenda() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, offset = {}) {
    return responsiveReveal(reducedMotion, delay, offset, 0.15)
  }

  return (
    <section className="webinar-agenda section-light" aria-labelledby="agenda-title">
      <div className="agenda-content">
        <motion.p className="agenda-label" {...entrance()}>Inside the Live Masterclass</motion.p>
        <motion.h2 className="agenda-title" id="agenda-title" {...entrance(0.06, { y: 12 })}>
          3 Powerful Insights That Can Change{' '}
          <span>The Way You Understand PCOS.</span>
        </motion.h2>
        <p className="agenda-description">Discover practical knowledge, expert-led guidance and realistic lifestyle strategies designed for everyday life.</p>
        <ol className="agenda-modules">
          {agendaModules.map((module) => (
            <li key={module.id}><AgendaModule module={module} entrance={entrance} /></li>
          ))}
        </ol>
        <LiveQACard session={liveQA} entrance={entrance} />
        <div className="agenda-summary">
          <h3>Understand Better. Choose Wisely. Live Mindfully.</h3>
          <p className="agenda-description">One masterclass designed to give you practical knowledge and a clearer direction for your wellness journey.</p>
        </div>
        <motion.div className="agenda-actions" {...entrance(0.05, { y: 8 })}>
          <RegistrationButton className="agenda-registration" showArrow />
          <ul className="agenda-benefits" aria-label="Masterclass benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
