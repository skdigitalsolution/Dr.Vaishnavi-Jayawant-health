import { Brain, CalendarX, CircleCheck, CircleX, ClipboardList, Scale, Smartphone, UtensilsCrossed } from 'lucide-react'

export const limitations = [
  {
    category: 'Crash Diets',
    highlight: 'More Restrictions',
    description: 'Extreme dietary restrictions can be difficult to maintain and may overlook individual nutritional needs.',
    icon: UtensilsCrossed,
  },
  {
    category: 'Online Remedies',
    highlight: 'More Confusion',
    description: 'Trending drinks and quick fixes may not address the complexities of PCOS.',
    icon: Smartphone,
  },
  {
    category: 'Generic Diet Plans',
    highlight: "One Size Doesn't Fit All",
    description: 'Every woman has different nutritional requirements, health needs and lifestyle habits.',
    icon: ClipboardList,
  },
  {
    category: 'Weight-Focused Advice',
    highlight: 'Beyond the Scale',
    description: 'Overall wellness involves more than body weight. Nutrition, movement, sleep and medical care also matter.',
    icon: Scale,
  },
  {
    category: 'Temporary Routines',
    highlight: 'Short-Term Changes',
    description: 'Healthy habits need to fit into everyday life to become sustainable over time.',
    icon: CalendarX,
  },
  {
    category: 'Information Overload',
    highlight: 'Less Clarity',
    description: 'Conflicting advice can make it difficult to understand which next steps are appropriate.',
    icon: Brain,
  },
]

const imageDirectory = `${import.meta.env.BASE_URL}images/comparison/`

export const approaches = [
  {
    id: 'generic',
    heading: 'The Generic Approach',
    icon: CircleX,
    points: [
      'Restrictive diets',
      'Random online remedies',
      'Generic meal plans',
      'Short-term goals',
      'Conflicting advice',
      'Weight-only focus',
    ],
    image: `${imageDirectory}restrictive-approach.webp`,
    imageAlt: 'A woman reviewing a diet chart at her dining table.',
  },
  {
    id: 'sustainable',
    heading: 'The Sustainable Approach',
    icon: CircleCheck,
    points: [
      'Balanced nutrition',
      'Informed guidance',
      'Individual health needs',
      'Long-term habits',
      'Structured learning',
      'Overall wellness',
    ],
    image: `${imageDirectory}sustainable-approach.webp`,
    imageAlt: 'A woman sharing a homemade Indian meal with her family.',
  },
]
