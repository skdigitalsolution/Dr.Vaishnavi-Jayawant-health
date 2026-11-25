import { showSitePreview } from '../config/sitePreview'
import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../utils/premiumMotion'
import { Award, HeartHandshake, Languages, UsersRound } from 'lucide-react'
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
const visibleStats = statistics.filter(({ verified }) => verified || showSitePreview)
const showPreviewLabel = visibleStats.some(({ verified }) => !verified)
const showSupportingCopy = ['experience', 'pcod-journey'].every(
  (id) => visibleStats.some((stat) => stat.id === id),
)

function TrustStatGrid() {
  const reducedMotion = useReducedMotion()

  function entrance(delay = 0, y = 0) {
    return responsiveReveal(reducedMotion, delay, { y }, 0.15)
  }

  return (
    <div className="trust-statistics">
      <motion.p className="trust-stats-label" {...entrance()}>
        Experience That Makes a Difference
      </motion.p>
      <motion.h2 className="trust-stats-title" id="trust-stats-title" {...entrance(0.06, 12)}>
        Expert Guidance.{' '}
        <span>Real Understanding.</span>
      </motion.h2>
      {showSupportingCopy && (
        <p className="trust-stats-description">
          Years of experience, personal understanding and a compassionate approach to women's wellness.
        </p>
      )}
      {showPreviewLabel && (
        <p className="trust-stats-preview">Development preview · Some credibility details are pending confirmation.</p>
      )}
      <ul className="trust-stat-grid" data-count={visibleStats.length}>
        {visibleStats.map(({ id, value, suffix, heading, description }, index) => {
          const Icon = icons[id]

          return (
            <motion.li key={id} className="trust-stat" {...entrance(index * 0.07, 10)}>
              <Icon className="trust-stat-icon" aria-hidden="true" size={28} strokeWidth={1.7} />
              <p className="trust-stat-value">
                {typeof value === 'number' ? <AnimatedCounter value={value} suffix={suffix} /> : value}
              </p>
              <h3>{heading}</h3>
              <p className="trust-stat-description">{description}</p>
            </motion.li>
          )
        })}
      </ul>
      {showSupportingCopy && (
        <p className="trust-stats-footer">Professional Experience. Personal Understanding. Practical Guidance.</p>
      )}
    </div>
  )
}

export default function TrustStats() {
  const hasRecognition = recognition.some(({ verified, name, logo }) => verified && name && logo)
  if (!visibleStats.length && !hasRecognition) return null

  return (
    <section
      className="trust-stats-section"
      aria-labelledby={visibleStats.length ? 'trust-stats-title' : 'trust-recognition-title'}
    >
      <div className="trust-stats-content">
        <FeaturedIn entries={recognition} />
        {visibleStats.length > 0 && <TrustStatGrid />}
      </div>
    </section>
  )
}
