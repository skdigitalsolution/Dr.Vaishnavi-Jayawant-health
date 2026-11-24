import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function LiveQACard({ session, entrance }) {
  const { label, title, description, points, icon: Icon } = session

  return (
    <motion.div className="agenda-qa" {...entrance(0, { y: 10 })}>
      <div className="agenda-qa-icon"><Icon aria-hidden="true" strokeWidth={1.35} /></div>
      <div>
        <p className="agenda-label">{label}</p>
        <h3>{title}</h3>
        <p className="agenda-module-description">{description}</p>
        <ul className="agenda-checklist">
          {points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}
        </ul>
      </div>
    </motion.div>
  )
}
