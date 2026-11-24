const registrationPrice = 199
const currency = 'INR'

export const webinarConfig = {
  instructorName: 'Dr. Vaishnavi',
  webinar: {
    title: 'PCOS & PCOD Webinar',
    date: 'To be announced',
    time: 'To be announced',
    duration: 'To be announced',
    language: 'To be announced',
  },
  registration: {
    price: registrationPrice,
    currency,
    displayPrice: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(registrationPrice),
  },
  payment: {
    provider: 'razorpay',
    enabled: false,
    // Placeholder fields for future Razorpay integration. Do not store secrets in client code.
    keyId: '',
    orderEndpoint: '',
    notes: {
      purpose: 'webinar_registration',
    },
  },
}

export default webinarConfig
