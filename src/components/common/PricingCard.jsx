import { complimentaryEBooks } from '../../config/bonuses'
import { refundPolicyText } from '../../config/legal'
import { motion } from 'framer-motion'
import { CalendarDays, CircleCheck, Clock, Hourglass, Languages, MonitorPlay } from 'lucide-react'
import webinarConfig from '../../config/webinar'
import useWebinarRegistration from '../../hooks/useWebinarRegistration'
import CountdownTimer from './CountdownTimer'
import PaymentTrust from './PaymentTrust'
import RegistrationButton from './RegistrationButton'
import PriceDisplay from './PriceDisplay'

const { instructorName, webinar } = webinarConfig
const benefits = [
  `Live Masterclass With ${instructorName}`,
  'Understanding PCOS & Hormonal Health',
  'Practical Indian Nutrition Guidance',
  'Sustainable Lifestyle Strategies',
  complimentaryEBooks + ' included after successful payment',
  'Interactive Live Q&A',
]

const details = [
  { label: 'Webinar Date', value: webinar.date, Icon: CalendarDays },
  { label: 'Webinar Time', value: webinar.time, Icon: Clock },
  { label: 'Duration', value: webinar.duration, Icon: Hourglass },
  { label: 'Platform', value: webinar.platform, Icon: MonitorPlay },
  { label: 'Language', value: webinar.language, Icon: Languages },
].filter(({ value }) => value)

export default function PricingCard({ entrance }) {
  const { eventStatus, closed, canReserve } = useWebinarRegistration()

  return (
    <motion.div className="pricing-card animated-border" {...entrance(0, 12)}>
      <p className="pricing-label">Live PCOS &amp; PCOD Masterclass</p>
      <p className="pricing-instructor">With {instructorName}</p>

      <div className="pricing-benefits">
        <h3>Here's Everything You'll Get</h3>
        <ul>
          {benefits.map((benefit, index) => (
            <motion.li key={benefit} {...entrance((index % 4) * 0.045, 5)}>
              <CircleCheck size={20} strokeWidth={1.75} aria-hidden="true" />{benefit}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div className="pricing-amount" {...entrance(0, 8)}>
        <p className="pricing-price-label">Get Complete Access For Just</p>
        <p className="pricing-price"><PriceDisplay /></p>
        <p className="pricing-fee">One-Time Registration Fee</p>
        {webinarConfig.taxDisclosure && <p className="pricing-fee">{webinarConfig.taxDisclosure}</p>}
      </motion.div>

      {details.length > 0 && (
        <dl className="pricing-details">
          {details.map(({ label, value, Icon }) => (
            <div key={label}>
              <dt><Icon size={18} strokeWidth={1.7} aria-hidden="true" />{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {(webinarConfig.webinarStartAt || eventStatus) && (
        <motion.div className="pricing-timer-slot" {...entrance(0.04, 6)}>
          <CountdownTimer startAt={webinarConfig.webinarStartAt} eventStatus={eventStatus} />
        </motion.div>
      )}

      <motion.div className="pricing-actions" {...entrance(0.06, 8)}>
        <p className="registration-policy-note">{refundPolicyText}</p>
        <RegistrationButton
          className="pricing-registration"
          showArrow={!closed}
        />
        {!closed && !canReserve && (
          <p className="pricing-checkout-status">
            Online checkout is currently unavailable.
          </p>
        )}
        <PaymentTrust enabled={webinarConfig.paymentEnabled} verified={webinarConfig.paymentVerified} methods={webinarConfig.paymentMethods} />
      </motion.div>
    </motion.div>
  )
}
