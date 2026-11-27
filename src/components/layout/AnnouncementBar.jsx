import PriceDisplay from '../common/PriceDisplay'
import webinarConfig from '../../config/webinar'
import './site-header.css'

const announcements = [
  'LIVE PCOS & PCOD Masterclass',
  webinarConfig.webinar.summary,
  'Expert-Led Wellness Guidance',
  'Registration at Just',
  'Interactive Live Q&A',
  'Practical Nutrition Strategies',
  'Sustainable Lifestyle Guidance',
]

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Webinar announcements" tabIndex={0}>
      <div className="announcement-track">
        {[false, true].map((duplicate) => (
          <ul className="announcement-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
            {announcements.map((announcement) => (
              <li key={announcement}>
                <span>{announcement}{announcement === 'Registration at Just' && <> <PriceDisplay /></>}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
