const registrationPrice = 199
const currency = 'INR'

export const webinarConfig = {
  instructorName: 'Dr. Vaishnavi Jayawant',
  webinar: {
    title: 'PCOS & PCOD Webinar',
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
}

export default webinarConfig
