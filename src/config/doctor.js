import { showSitePreview } from './sitePreview'
import { CalendarCheck, HeartHandshake, HeartPulse, Salad } from 'lucide-react'
import webinarConfig from './webinar'

const images = `${import.meta.env.BASE_URL}images/doctor/`
const biographyApproved = false
const storyApproved = false
const messageApproved = false

const previewGallery = showSitePreview ? [
  ['seminar', 'Illustrative view of a wellness seminar from the rear of an auditorium.'],
  ['workshop', 'Illustrative setup for a small wellness workshop.'],
  ['consultation', 'Illustrative discussion at a nutrition consultation desk.'],
  ['interaction', 'Illustrative group discussion around a workshop table.'],
  ['presentation', 'Illustrative presenter beside a projection screen.'],
  ['studio', 'Illustrative view of a wellness studio.'],
].map(([id, alt]) => ({
  id, image: `${images}gallery/${id}.webp`, alt, isPlaceholder: true, isVerified: false, hasConsent: false,
})) : []

export const doctor = {
  name: webinarConfig.instructorName,
  professionalTitle: "Women's Health, Nutrition & Lifestyle Guidance",
  qualifications: [],
  certifications: [],
  verificationStatus: { credentials: false, profileImage: false, biographyPortrait: true },
  approvalStatus: { biography: biographyApproved, personalStory: storyApproved, personalMessage: messageApproved },
  // The supplied portrait is approved for the biography. profileImage governs reuse in the story highlight.
  profileImage: `${images}dr-vaishnavi.webp`,
  // Add approved event photos with id, image, alt, isPlaceholder, isVerified and hasConsent.
  galleryImages: [],
  previewGallery,
  biography: (showSitePreview || biographyApproved) ? [
    'My understanding of PCOD goes beyond professional knowledge.',
    'Having personally experienced the challenges of PCOD, I understand the uncertainty, frustration and emotional struggles that can come with it.',
    "My personal health journey, combined with years of professional experience, has shaped my approach to women's wellness.",
    'I believe that every woman deserves guidance that respects her individual needs, understands her lifestyle and helps her make informed decisions about her health.',
    'Through this live masterclass, I want to share practical knowledge about hormonal health, balanced nutrition and sustainable lifestyle habits.',
    'My goal is to help women move beyond confusing advice and approach their wellness journey with greater clarity and confidence.',
  ] : null,
  personalStory: (showSitePreview || storyApproved) ? {
    paragraphs: [
      'Having personally experienced PCOD, I understand how important the right knowledge, practical guidance and compassionate support can be.',
      "My personal journey and professional experience have shaped my approach to women's health, balanced nutrition and sustainable lifestyle habits.",
      'I believe every woman deserves guidance that respects her individual needs and helps her make informed wellness decisions.',
    ],
  } : null,
  personalMessage: (showSitePreview || messageApproved)
    ? 'My goal is to help women understand their bodies with greater clarity, confidence and compassion.'
    : null,
  professionalApproach: [
    { title: 'Understanding Your Body', icon: HeartPulse },
    { title: 'Balanced Everyday Nutrition', icon: Salad },
    { title: 'Sustainable Lifestyle Habits', icon: CalendarCheck },
    { title: 'Individual Health Needs', icon: HeartHandshake },
  ],
}

export const doctorStatistics = webinarConfig.credibility.statistics.filter(
  ({ verified, value }) => verified && typeof value === 'number',
)
