import { bonusBookCount } from './bonuses'
import { contact } from './contact'
import webinarConfig from './webinar'

const { instructorName, registration, webinar } = webinarConfig
const { displayPrice } = registration
const date = webinar.date.replace(/^[^,]+,\s*/, '')
const time = webinar.time?.replace(/:00\b| IST$/g, '')

export const whatsAppSupport = {
  phone: contact.whatsapp,
  welcome: [
    `Hello! 👋 Welcome to our LIVE PCOS & PCOD Masterclass with ${instructorName}.`,
    `📅 ${date}`,
    time && `⏰ ${time}`,
    `💰 Registration: ${displayPrice}`,
    `🎁 Get ${bonusBookCount} FREE eBooks after successful registration!`,
    'How can we help you?',
  ].filter(Boolean),
  replies: [
    {
      label: 'Webinar Details',
      message: `Hello, I would like to know more about ${instructorName}'s LIVE PCOS & PCOD Masterclass.`,
    },
    {
      label: 'Registration Process',
      message: `Hello, I would like to register for the ${displayPrice} PCOS & PCOD Masterclass. Please guide me through the registration process.`,
    },
    {
      label: 'Payment Support',
      message: 'Hello, I need assistance regarding my PCOS & PCOD webinar payment.',
    },
  ],
}
