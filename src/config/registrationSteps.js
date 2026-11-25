import { BellRing, CalendarCheck, MailCheck, MonitorPlay, ShieldCheck, TicketCheck, Video } from 'lucide-react'
import webinarConfig from './webinar'

export const registrationWorkflow = {
  stages: [
    'landing-page',
    'razorpay-checkout',
    'server-side-payment-verification',
    'registration-confirmation',
    'thank-you-page',
    'webinar-updates',
    'live-webinar',
  ],
  confirmation: { registeredEmail: false, whatsAppOptIn: false },
  includeCalendarLink: false,
  includeJoiningInstructions: false,
  reminders: { confirmed: false, minutesBefore: [1440, 60, 5] },
}

const { reminders } = registrationWorkflow

export const registrationSteps = [
  {
    id: 'reserve',
    stepNumber: '01',
    title: 'Reserve Your Seat',
    showRegistrationPrice: true,
    description: 'registration through our secure online checkout.',
    supportingLabel: 'Simple Online Registration',
    icon: TicketCheck,
  },
  {
    id: 'confirmation',
    stepNumber: '02',
    title: 'Receive Your Confirmation',
    description: 'Get your registration confirmation, webinar details and joining instructions through the confirmed communication channels.',
    supportingLabel: 'Registration Confirmation',
    icon: MailCheck,
  },
  {
    id: 'prepare',
    stepNumber: '03',
    title: 'Get Ready for the Masterclass',
    description: reminders.confirmed
      ? 'Save the webinar date, prepare your questions and receive important session reminders.'
      : 'Save the webinar date and prepare your questions for the live session.',
    supportingLabel: 'Save the Date',
    icon: CalendarCheck,
  },
  {
    id: 'attend',
    stepNumber: '04',
    title: 'Join the Live Masterclass',
    description: `Learn directly from ${webinarConfig.instructorName}, discover practical wellness strategies and participate in the interactive Q&A session.`,
    supportingLabel: 'Live Expert-Led Learning',
    icon: Video,
  },
]

export const registrationIndicators = [
  { label: 'Secure Online Registration', icon: ShieldCheck },
  ...(reminders.confirmed ? [{ label: 'Webinar Reminders', icon: BellRing }] : []),
  { label: 'Join From Any Device', icon: MonitorPlay },
]
