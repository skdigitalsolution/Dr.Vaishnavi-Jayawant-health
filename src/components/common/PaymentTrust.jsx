import { ShieldCheck } from 'lucide-react'

const methodLabels = {
  upi: 'UPI',
  visa: 'Visa',
  mastercard: 'Mastercard',
  rupay: 'RuPay',
  'net-banking': 'Net Banking',
}

export default function PaymentTrust({ enabled, verified, methods }) {
  if (!enabled || !verified) return null
  const supportedMethods = methods.filter(({ id }) => Object.hasOwn(methodLabels, id))

  return (
    <div className="pricing-payment">
      <p><ShieldCheck size={19} aria-hidden="true" />Secure Payment via Razorpay</p>
      {supportedMethods.length > 0 && (
        <ul aria-label="Supported payment methods">
          {supportedMethods.map(({ id, logo }) => (
            <li key={id}>{logo ? <img src={logo} alt={methodLabels[id]} loading="lazy" /> : methodLabels[id]}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
