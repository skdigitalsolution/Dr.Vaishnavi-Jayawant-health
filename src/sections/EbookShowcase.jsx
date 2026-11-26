import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ClipboardList, Droplets, Dumbbell, Heart, Moon, Target, Utensils } from 'lucide-react'
import { memo, useRef } from 'react'
import RegistrationButton from '../components/common/RegistrationButton'
import offer from '../config/offer'
import { responsiveReveal } from '../utils/premiumMotion'
import './ebook-showcase.css'

const cover = `${import.meta.env.BASE_URL}images/ebook/health-ebook-cover.webp`
const topics = [
  { Icon: Dumbbell, label: 'Regular Exercise' },
  { Icon: Droplets, label: 'Hydration' },
  { Icon: Moon, label: 'Sleep' },
  { Icon: Utensils, label: 'Balanced Nutrition' },
  { Icon: Heart, label: 'Positive Mindset' },
  { Icon: Target, label: 'Health Goal Setting' },
  { Icon: ClipboardList, label: 'Daily Routine Tracker' },
]

export default memo(function EbookShowcase({ promotionActive, promotionExpired }) {
  const section = useRef(null)
  const inView = useInView(section, { amount: 0.15 })
  const reducedMotion = useReducedMotion()

  return (
    <section ref={section} className="ebook-showcase" data-in-view={inView} aria-labelledby="ebook-showcase-title">
      <div className="ebook-showcase-content">
        <header className="ebook-showcase-header">
          <p className="ebook-showcase-label">Complimentary Wellness Bonus</p>
          <h2 id="ebook-showcase-title">Start Your Wellness Journey With <span>A Special Gift.</span></h2>
        </header>
        <div className="ebook-showcase-grid">
          <motion.div className="ebook-stage" {...responsiveReveal(reducedMotion, 0, { y: 16 })}>
            <div className="ebook-book-float">
              <div className="ebook-book">
                <div className="ebook-book-spine" aria-hidden="true" />
                <div className="ebook-book-pages" aria-hidden="true" />
                <div className="ebook-book-front">
                  <img src={cover} alt="Original cover of 5 Pillars of Good Health" width={900} height={1273} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </motion.div>
          <div className="ebook-copy">
            <p className="ebook-edition">Revised Edition 2026</p>
            <h3>5 Pillars of Good Health</h3>
            <p className="ebook-subtitle">The Master Your Health Blueprint</p>
            <p className="ebook-author">By Dr. Vaishnavi Jayawant</p>
            <p className="ebook-description">Explore practical insights and everyday habits to support your health and wellness journey.</p>
            <ul className="ebook-topics" aria-label="Book contents">
              {topics.map(({ Icon, label }, index) => (
                <motion.li key={label} {...responsiveReveal(reducedMotion, index * 0.035, { y: 8 })}>
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </motion.li>
              ))}
            </ul>
            <div className="ebook-offer">
              {promotionActive ? (
                <>
                  <p className="ebook-offer-window">Limited-time registration bonus</p>
                  <p className="ebook-offer-value">
                    {offer.verifiedReferenceValue && <s>{offer.verifiedReferenceValue}</s>}
                    <strong>Absolutely FREE!</strong>
                  </p>
                  <p>Complimentary eBook with eligible webinar registration.</p>
                </>
              ) : (
                <p>{promotionExpired ? 'The complimentary eBook offer has ended.' : 'Complimentary eBook availability is pending confirmation.'}</p>
              )}
              <RegistrationButton className="ebook-registration" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
