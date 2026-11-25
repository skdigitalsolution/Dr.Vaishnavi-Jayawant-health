import baseConfig from './webinarConfig.js'
import { parseWebinarInstant } from '../utils/webinarTime'
import { approvedPolicies } from './legal'

// Use an ISO date-time with an explicit offset, such as +05:30 for India.
const webinarStartAt = null
const timezone = 'Asia/Kolkata'
const startTimestamp = parseWebinarInstant(webinarStartAt)
const duration = null
const language = null
const platform = null
const originalPrice = null
const showOriginalPrice = false
const { price, currency } = baseConfig.registration
const displayOriginalPrice = showOriginalPrice && Number.isFinite(originalPrice) && originalPrice > price
  ? new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0 }).format(originalPrice)
  : null

const schedule = startTimestamp === null ? {} : {
  date: new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: timezone }).format(startTimestamp),
  time: new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: timezone }).format(startTimestamp),
}

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
  webinarStartAt,
  webinarEndAt: null,
  registrationDeadline: null,
  timezone,
  duration,
  language,
  platform,
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
  webinar: {
    ...baseConfig.webinar,
    ...schedule,
    duration: duration ?? baseConfig.webinar.duration,
    language: language ?? baseConfig.webinar.language,
    platform,
  },
  hero: {
    image: `${import.meta.env.BASE_URL}images/hero-background.webp`,
    video: null,
  },
  introduction: {
    // Replace the development poster and clear the label when client assets are ready.
    poster: `${import.meta.env.BASE_URL}images/intro-video-thumbnail.webp`,
    video: null,
    captions: null, // Optional WebVTT URL for English captions.
    developmentPoster: true,
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
