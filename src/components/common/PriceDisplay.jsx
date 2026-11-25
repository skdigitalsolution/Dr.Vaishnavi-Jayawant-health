import webinarConfig from '../../config/webinar'
import './price-display.css'

export default function PriceDisplay() {
  const { displayOriginalPrice, registration } = webinarConfig

  return (
    <span className="registration-price-pair">
      {displayOriginalPrice && (
        <s><span className="sr-only">Original price </span>{displayOriginalPrice}</s>
      )}
      <strong>{registration.displayPrice}</strong>
    </span>
  )
}
