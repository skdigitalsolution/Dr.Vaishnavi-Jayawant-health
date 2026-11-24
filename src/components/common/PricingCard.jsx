import { motion } from 'framer-motion'
import { CalendarDays, CircleCheck, Clock, Hourglass, Languages, MonitorPlay } from 'lucide-react'
import { bonusResources } from '../../config/bonuses'
import { registrationPoliciesReady } from '../../config/legal'
import webinarConfig from '../../config/webinar'
import useWebinarRegistration from '../../hooks/useWebinarRegistration'
import CountdownTimer from './CountdownTimer'
import PaymentTrust from './PaymentTrust'
import RegistrationButton from './RegistrationButton'

const { instructorName, webinar, registration, displayOriginalPrice } = webinarConfig
const approvedBonuses = bonusResources.filter(({ isApproved, isAvailable, isPlaceholder }) =>
  isApproved && isAvailable && !isPlaceholder,
)
const benefits = [
  `Live Masterclass With ${instructorName}`,
  'Understanding PCOS & Hormonal Health',
  'Practical Indian Nutrition Guidance',
  'Sustainable Lifestyle Strategies',
  ...approvedBonuses.map(({ title }) => title),
  'Interactive Live Q&A',
]

const details = [
  { label: 'Webinar Date', value: webinar.date, Icon: CalendarDays },
  { label: 'Webinar Time', value: webinar.time, Icon: Clock },
  { label: 'Duration', value: webinarConfig.duration, Icon: Hourglass },
  { label: 'Platform', value: webinarConfig.platform, Icon: MonitorPlay },
  { label: 'Language', value: webinarConfig.language, Icon: Languages },
].filter(({ value }) => value && value !== 'To be announced')

export default function PricingCard({ entrance, onCheckout }) {
  const { eventStatus, closed, canReserve } = useWebinarRegistration()
  const checkoutReady = canReserve &&
    registrationPoliciesReady &&
    webinarConfig.paymentEnabled && webinarConfig.paymentVerified &&
    Boolean(webinarConfig.taxDisclosure) && typeof onCheckout === 'function'

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
        {displayOriginalPrice && <p className="pricing-original"><span className="sr-only">Original price </span><s>{displayOriginalPrice}</s></p>}
        <p className="pricing-price">{registration.displayPrice}</p>
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

      <motion.div className="pricing-timer-slot" {...entrance(0.04, 6)}>
        <CountdownTimer startAt={webinarConfig.webinarStartAt} eventStatus={eventStatus} />
      </motion.div>

      <motion.div className="pricing-actions" {...entrance(0.06, 8)}>
        <RegistrationButton
          className="pricing-registration"
          text={closed ? 'Registration Closed' : `Yes! Reserve My Seat – ${registration.displayPrice}`}
          showArrow={!closed}
          disabled={closed || !checkoutReady}
          onClick={onCheckout}
        />
        {!closed && !checkoutReady && (
          <p className="pricing-checkout-status">
            {import.meta.env.DEV ? 'Development preview · Checkout is not available yet.' : 'Online checkout is not available yet.'}
          </p>
        )}
        <PaymentTrust enabled={webinarConfig.paymentEnabled} verified={webinarConfig.paymentVerified} methods={webinarConfig.paymentMethods} />
      </motion.div>
    </motion.div>
  )
}
