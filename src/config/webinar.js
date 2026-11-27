import baseConfig from './webinarConfig.js'
import { parseWebinarInstant } from '../utils/webinarTime'
import { approvedPolicies } from './legal'

const session = {
  date: '2026-12-06',
  startTime: '11:00',
  endTime: '13:00',
  timezone: 'Asia/Kolkata',
  utcOffset: '+05:30',
  platform: 'Live on Zoom',
  languages: ['English', 'Hindi', 'Marathi'],
  timeConfirmed: false,
  platformConfirmed: false,
  languagesConfirmed: false,
}

const { timezone } = session
const sessionInstant = (time) => session.date + 'T' + time + session.utcOffset
const startInstant = sessionInstant(session.startTime)
const endInstant = sessionInstant(session.endTime)
const startTimestamp = parseWebinarInstant(startInstant)
const endTimestamp = parseWebinarInstant(endInstant)
const validRange = startTimestamp !== null && endTimestamp !== null && endTimestamp > startTimestamp
const hasConfirmedTime = validRange && session.timeConfirmed
const showTime = validRange && (hasConfirmedTime || import.meta.env.DEV)
const date = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: timezone,
}).format(parseWebinarInstant(sessionInstant('00:00')))
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric', minute: '2-digit', hour12: true, timeZone: timezone,
})
const formatTime = (timestamp) => timeFormatter.format(timestamp).toUpperCase()
const time = showTime ? [formatTime(startTimestamp), formatTime(endTimestamp)].join(' – ') + ' IST' : null
const duration = showTime
  ? new Intl.NumberFormat('en-IN', { style: 'unit', unit: 'hour', unitDisplay: 'long' })
    .format((endTimestamp - startTimestamp) / 3_600_000)
  : null
const schedule = {
  date,
  dateISO: session.date,
  time,
  duration,
  platform: session.platformConfirmed || import.meta.env.DEV ? session.platform : null,
  language: session.languagesConfirmed || import.meta.env.DEV
    ? new Intl.ListFormat('en-GB').format(session.languages)
    : null,
  summary: [date, time].filter(Boolean).join(' · '),
}
const originalPrice = 499
const showOriginalPrice = true
const { price, currency } = baseConfig.registration
const displayOriginalPrice = showOriginalPrice && Number.isFinite(originalPrice) && originalPrice > price
  ? new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0 }).format(originalPrice)
  : null

export const webinarConfig = {
  ...baseConfig,
  title: baseConfig.webinar.title,
  brand: {
    subtitle: "Women's Health & Wellness",
    description: 'Expert-led education for informed and sustainable lifestyle choices.',
    logo: null,
  },
  registrationPrice: price,
  currency,
  originalPrice,
  showOriginalPrice,
  displayOriginalPrice,
  webinarStartAt: hasConfirmedTime ? startInstant : null,
  webinarEndAt: hasConfirmedTime ? endInstant : null,
  registrationDeadline: null,
  timezone,
  registrationStatus: 'open',
  stickyCTAEnabled: true,
  eventStatus: null, // Set to 'live', 'ended' or 'cancelled' when applicable.
  paymentUrl: 'https://rzp.io/rzp/SRxnIIP',
  paymentEnabled: true,
  paymentVerified: false,
  paymentMethods: [], // Supported entries supply { id, logo? }.
  taxDisclosure: null, // Confirm taxes and the total payable before enabling checkout.
  refundGuaranteeEnabled: false,
  refundGuaranteeTerms: null,
  refundPolicyUrl: approvedPolicies.find(({ id }) => id === 'refund')?.url ?? null,
  privacyPolicyUrl: approvedPolicies.find(({ id }) => id === 'privacy')?.url ?? null,
  termsUrl: approvedPolicies.find(({ id }) => id === 'terms')?.url ?? null,
  webinar: { ...baseConfig.webinar, ...schedule },
  hero: {
    image: `${import.meta.env.BASE_URL}images/hero-background.webp`,
    video: null,
  },
  introduction: {
    poster: `${import.meta.env.BASE_URL}videos/dr-vaishnavi-introduction.webp`,
    video: `${import.meta.env.BASE_URL}videos/dr-vaishnavi-introduction.mp4`,
    captions: null, // Optional WebVTT URL for English captions.
  },
  credibility: {
    // Mark each claim verified only after client confirmation.
    statistics: [
      {
        id: 'women-supported',
        value: 1500,
        suffix: '+',
        heading: 'Women Supported',
        description: 'Guidance for women on their wellness journeys.',
        verified: false,
      },
      {
        id: 'experience',
        value: 14,
        suffix: '+',
        heading: 'Years of Experience',
        description: 'Professional experience in health and wellness.',
        verified: false,
      },
      {
        id: 'languages',
        value: 3,
        heading: 'Languages',
        description: 'Accessible and understandable communication.',
        verified: false,
      },
      {
        id: 'pcod-journey',
        value: 'Personal',
        heading: 'PCOD Journey',
        description: 'Personal understanding of the challenges associated with PCOD.',
        verified: false,
      },
    ],
    // Add client-supplied logos from public/images/recognition with name, logo and verified.
    recognition: [],
  },
}

export default webinarConfig
