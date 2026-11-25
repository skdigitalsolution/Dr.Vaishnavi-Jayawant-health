import RegistrationButton from '../common/RegistrationButton'
import webinarConfig from '../../config/webinar'
import './site-header.css'

export default function Navbar() {
  return (
    <header className="webinar-navbar">
      <div className="webinar-navbar-inner">
        <div className="webinar-brand">
          {webinarConfig.brand.logo
            ? <img className="max-h-12 w-auto max-w-36 object-contain" src={webinarConfig.brand.logo} alt={webinarConfig.instructorName} />
            : <>
              <span className="webinar-brand-name">{webinarConfig.instructorName}</span>
              <span className="webinar-brand-tagline">{webinarConfig.brand.subtitle}</span>
            </>}
        </div>
        <RegistrationButton compactText="Reserve" />
      </div>
    </header>
  )
}
