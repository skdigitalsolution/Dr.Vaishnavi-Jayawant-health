import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, Languages, Ticket, Timer, Video } from 'lucide-react'
import RegistrationButton from '../components/common/RegistrationButton'
import webinarConfig from '../config/webinar'
import { responsiveReveal } from '../utils/premiumMotion'
import '../styles/animations.css'
import './webinar-schedule.css'

const { scheduleDetails } = webinarConfig.webinar
const timeRange = `${scheduleDetails.startsAt} – ${scheduleDetails.endsAt}`.replaceAll(':00', '')
const details = [
  { Icon: CalendarDays, label: 'Webinar Day', value: scheduleDetails.day, description: 'Live Masterclass' },
  { Icon: Clock, label: 'Webinar Time', value: timeRange, description: scheduleDetails.timezoneLabel },
  { Icon: Timer, label: 'Duration', value: scheduleDetails.duration, description: 'Interactive Session' },
  { Icon: Video, label: 'Platform', value: scheduleDetails.platform, description: 'Join From Anywhere' },
  { Icon: Languages, label: 'Language', value: scheduleDetails.languages.join(' · '), description: 'Easy to Understand' },
  { Icon: Ticket, label: 'Registration Fee', value: webinarConfig.registration.displayPrice, description: 'One-Time Registration' },
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
        {!scheduleDetails.confirmed && (
          <p className="webinar-schedule-preview">Preview schedule, platform and languages are subject to confirmation.</p>
        )}
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
