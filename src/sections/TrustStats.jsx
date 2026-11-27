import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { Award, CalendarCheck, HeartHandshake, Languages, MessagesSquare, Salad, UsersRound, Video } from 'lucide-react'
import AnimatedCounter from '../components/common/AnimatedCounter'
import FeaturedIn from '../components/common/FeaturedIn'
import webinarConfig from '../config/webinar'
import './trust-stats.css'

const icons = {
  'women-supported': UsersRound,
  experience: Award,
  languages: Languages,
  'pcod-journey': HeartHandshake,
}

const { statistics, recognition } = webinarConfig.credibility
const verifiedStats = statistics.filter(({ verified }) => verified)
const webinarHighlights = [
  { id: 'live', Icon: Video, value: 'Live', heading: 'Online Masterclass', description: 'Join the scheduled session online.' },
  { id: 'qa', Icon: MessagesSquare, value: 'Q&A', heading: 'Interactive Discussion', description: 'Bring your questions about PCOS, nutrition and everyday habits.' },
  { id: 'nutrition', Icon: Salad, value: 'Nutrition', heading: 'Balanced Meals', description: 'Explore meal ideas using familiar Indian foods.' },
  { id: 'habits', Icon: CalendarCheck, value: 'Habits', heading: 'Everyday Wellness', description: 'Explore practical approaches to sleep, movement and stress.' },
]
const visibleStats = verifiedStats.length
  ? verifiedStats.map((stat) => ({ ...stat, Icon: icons[stat.id] }))
  : webinarHighlights

function TrustStatGrid() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.15)
  }

  return (
    <div className="trust-statistics">
      <motion.p className="trust-stats-label" {...entrance()}>
        {verifiedStats.length ? 'Professional Experience' : 'What to Expect'}
      </motion.p>
      <motion.h2 className="trust-stats-title" id="trust-stats-title" {...entrance(0.06, 12)}>
        {verifiedStats.length ? 'Professional Experience and Guidance' : 'A Live Session With Practical Guidance'}
      </motion.h2>
      <ul className="trust-stat-grid" data-count={visibleStats.length}>
        {visibleStats.map(({ id, value, suffix, heading, description, Icon }, index) => (
          <motion.li key={id} className="trust-stat" {...entrance(index * 0.07, 10)}>
            <Icon className="trust-stat-icon" aria-hidden="true" size={28} strokeWidth={1.7} />
            <p className="trust-stat-value">
              {typeof value === 'number' ? <AnimatedCounter value={value} suffix={suffix} /> : value}
            </p>
            <h3>{heading}</h3>
            <p className="trust-stat-description">{description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default function TrustStats() {
  return (
    <section
      className="trust-stats-section"
      aria-labelledby="trust-stats-title"
    >
      <div className="trust-stats-content">
        <FeaturedIn entries={recognition} />
        <TrustStatGrid />
      </div>
    </section>
  )
}
