import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, Languages, Ticket, Timer, Video } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import webinarConfig from '../config/webinar'
import { responsiveReveal } from '../utils/premiumMotion'
import '../styles/animations.css'
import './webinar-schedule.css'

const { webinar, registration } = webinarConfig
const awaitingDetails = 'To be confirmed'
const details = [
  { Icon: CalendarDays, label: 'Webinar Date', value: webinar.date, description: 'Live Masterclass' },
  { Icon: Clock, label: 'Webinar Time', value: webinar.time ?? awaitingDetails, description: 'Indian Standard Time' },
  { Icon: Timer, label: 'Duration', value: webinar.duration ?? awaitingDetails, description: 'Interactive Session' },
  { Icon: Video, label: 'Platform', value: webinar.platform ?? 'Live online', description: 'Join From Anywhere' },
  { Icon: Languages, label: 'Languages', value: webinar.language ?? awaitingDetails, description: 'Live Instruction' },
  { Icon: Ticket, label: 'Registration Fee', value: registration.displayPrice, description: 'One-Time Registration' },
]

export default function WebinarSchedule() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="webinar-schedule" aria-labelledby="webinar-schedule-title">
      <div className="webinar-schedule-content">
        <p className="webinar-schedule-label">Your Live Masterclass Details</p>
        <h2 className="webinar-schedule-title" id="webinar-schedule-title">
          Take the First Step Towards <span>Better Wellness.</span>
        </h2>
        <dl className="webinar-schedule-grid">
          {details.map(({ Icon, label, value, description }, index) => (
            <motion.div
              className="webinar-schedule-card"
              key={label}
              {...responsiveReveal(reducedMotion, index * 0.045, { y: 12 })}
              onViewportEnter={(entry) => { if (entry) entry.target.dataset.revealed = 'true' }}
            >
              <dt>
                <span className="webinar-schedule-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                {label}
              </dt>
              <dd>
                <strong>{value}</strong>
                <span>{description}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
        <div className="webinar-schedule-actions">
          <RegistrationButton />
        </div>
      </div>
    </section>
  )
}
