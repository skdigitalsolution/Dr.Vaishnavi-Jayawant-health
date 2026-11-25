import { motion, useReducedMotion } from 'framer-motion'
import { responsiveReveal } from '../../utils/premiumMotion'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { contact } from '../../config/contact'
import { approvedPolicies, configuredPageUrl, registrationPoliciesReady } from '../../config/legal'
import webinarConfig from '../../config/webinar'
import PolicyModal from '../common/PolicyModal'
import '../../sections/landing-end.css'

const validPhone = (number) => /^\+[1-9]\d{6,14}$/.test(number ?? '')
const supportLinks = contact.supportAvailable ? [
  validPhone(contact.phone) && { Icon: Phone, label: contact.phone, href: `tel:${contact.phone}` },
  /^[^\s@?#]+@[^\s@?#]+\.[^\s@?#]+$/.test(contact.email ?? '') && { Icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
  validPhone(contact.whatsapp) && { Icon: MessageCircle, label: 'Have a Question? Chat With Us.', href: `https://wa.me/${contact.whatsapp.slice(1)}` },
].filter(Boolean) : []
const contactUrl = contact.supportAvailable
  ? configuredPageUrl(contact.contactUrl) ?? (supportLinks.length ? '#registration-support' : null)
  : null
const copyrightYear = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  timeZone: webinarConfig.timezone,
}).format(new Date())

export default function Footer() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)
  const { instructorName, brand } = webinarConfig

  return (
    <footer className="webinar-footer">
      <motion.div
        className="webinar-footer-content"
        {...responsiveReveal(reducedMotion, 0, {}, 0.12)}
      >
        <div className="footer-top">
          <div className="footer-brand">
            {brand.logo ? <img src={brand.logo} alt={instructorName} loading="lazy" decoding="async" /> : <p>{instructorName}</p>}
            <span>{brand.subtitle}</span>
            <p className="footer-brand-description">{brand.description}</p>
          </div>
          <div>
            {(approvedPolicies.length > 0 || contactUrl) && (
              <nav className="footer-links" aria-label="Policies and support">
                <ul>
                  {approvedPolicies.map((policy) => (
                    <li key={policy.id}>
                      {policy.url
                        ? <a href={policy.url}>{policy.title}</a>
                        : <button type="button" onClick={(event) => setSelected({ policy, trigger: event.currentTarget })}>{policy.title}</button>}
                    </li>
                  ))}
                  {contactUrl && <li><a href={contactUrl}>Contact Us</a></li>}
                </ul>
              </nav>
            )}
            {import.meta.env.DEV && !registrationPoliciesReady && (
              <p className="footer-policy-pending">Development preview · Legal policies pending approval</p>
            )}
            {supportLinks.length > 0 && (
              <div className="footer-support" id="registration-support">
                <h2>Need Help With Registration?</h2>
                <address>
                  <ul>
                    {supportLinks.map(({ Icon, label, href }) => (
                      <li key={href}><a href={href}><Icon size={17} aria-hidden="true" />{label}</a></li>
                    ))}
                  </ul>
                </address>
              </div>
            )}
          </div>
        </div>
        <p className="footer-disclaimer">
          This masterclass is intended for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis or personalised treatment. Individual experiences and outcomes may vary. Always consult a qualified healthcare professional regarding your medical condition and treatment decisions.
        </p>
        <p className="footer-copyright">© {copyrightYear} {instructorName}. All Rights Reserved.</p>
      </motion.div>
      {selected && <PolicyModal {...selected} onClose={() => setSelected(null)} />}
    </footer>
  )
}
