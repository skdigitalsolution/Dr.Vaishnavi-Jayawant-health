import { Activity, CalendarCheck, MessagesSquare, Utensils } from 'lucide-react'

const imageDirectory = `${import.meta.env.BASE_URL}images/agenda/`

export const agendaModules = [
  {
    id: 'hormones',
    moduleNumber: '01',
    title: 'Understand Your Hormones',
    headline: 'Why PCOS Can Make Weight Management Challenging',
    description: 'Discover the relationship between hormonal health, insulin resistance, metabolism and PCOS. Understand why individual health needs matter when making lifestyle decisions.',
    learningPoints: [
      'Understand PCOS and hormonal health.',
      'Explore insulin resistance and metabolic health.',
      'Identify common myths surrounding PCOS.',
      'Understand why individual health needs matter.',
    ],
    icon: Activity,
    image: `${imageDirectory}hormonal-health.webp`,
    imageAlt: 'Educational illustration of the uterus, fallopian tubes and ovaries.',
    imagePosition: 'left',
  },
  {
    id: 'nutrition',
    moduleNumber: '02',
    title: 'Rethink Your Nutrition',
    headline: 'Balanced Nutrition Without Extreme Restrictions',
    description: 'Explore how familiar Indian foods and balanced everyday meals can support your nutritional needs and overall wellness without unnecessary dietary restrictions.',
    learningPoints: [
      'Learn how to build a balanced Indian meal plate.',
      'Understand the role of everyday food choices.',
      'Explore practical and sustainable eating habits.',
      'Move beyond extreme dietary restrictions.',
    ],
    icon: Utensils,
    image: `${imageDirectory}balanced-nutrition.webp`,
    imageAlt: 'An Indian thali with roti, dal, vegetables and salad.',
    imagePosition: 'right',
  },
  {
    id: 'wellness',
    moduleNumber: '03',
    title: 'Build Your Wellness Roadmap',
    headline: 'Healthy Habits That Fit Into Real Life',
    description: 'Discover how sleep, stress management, physical activity and consistent lifestyle habits can support your long-term wellness journey.',
    learningPoints: [
      'Understand the importance of sleep and stress management.',
      'Explore realistic physical activity routines.',
      'Learn how to build consistent daily habits.',
      'Identify practical next steps for your wellness journey.',
    ],
    icon: CalendarCheck,
    image: `${imageDirectory}wellness-roadmap.webp`,
    imageAlt: 'A woman practicing a seated yoga stretch on a mat at home.',
    imagePosition: 'left',
  },
]

export const liveQA = {
  label: 'Special Live Session',
  title: 'Live Q&A With Dr. Vaishnavi',
  description: 'Bring your questions and gain clarity on common concerns related to PCOS, nutrition, hormonal health and everyday lifestyle habits.',
  points: [
    'Interactive live discussion.',
    'Expert-led educational guidance.',
    'Answers to common PCOS questions.',
  ],
  icon: MessagesSquare,
}
