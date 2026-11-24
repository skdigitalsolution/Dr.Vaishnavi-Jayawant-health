import { BatteryLow, CalendarDays, HeartPulse, Scale, Sparkles, Utensils } from 'lucide-react'

const imageDirectory = `${import.meta.env.BASE_URL}images/problems/`

// These development illustrations depict fictional people.
export const problems = [
  {
    id: 'weight-management',
    title: 'Weight Management Challenges',
    description: 'Finding weight management difficult despite consistent efforts.',
    icon: Scale,
    image: `${imageDirectory}weight-management.webp`,
    imageAlt: 'A woman standing beside a weighing scale at home.',
  },
  {
    id: 'irregular-periods',
    title: 'Irregular Periods',
    description: 'Uncertainty about menstrual cycles and hormonal health.',
    icon: CalendarDays,
    image: `${imageDirectory}irregular-periods.webp`,
    imageAlt: 'A woman seated at home looking at her phone.',
  },
  {
    id: 'low-energy',
    title: 'Low Energy & Fatigue',
    description: 'Finding it difficult to maintain energy throughout the day.',
    icon: BatteryLow,
    image: `${imageDirectory}low-energy.webp`,
    imageAlt: 'A woman resting on a sofa after work.',
  },
  {
    id: 'skin-hair',
    title: 'Skin & Hair Concerns',
    description: 'Navigating acne, hair thinning or unwanted facial hair.',
    icon: Sparkles,
    image: `${imageDirectory}skin-hair.webp`,
    imageAlt: 'A woman looking at her reflection in a bathroom mirror.',
  },
  {
    id: 'nutrition-confusion',
    title: 'Confusing Diet Advice',
    description: 'Not knowing which foods and lifestyle choices are right for you.',
    icon: Utensils,
    image: `${imageDirectory}nutrition-confusion.webp`,
    imageAlt: 'A woman reading a nutrition plan beside a plate of dal, vegetables and roti.',
  },
  {
    id: 'hormonal-health',
    title: 'Fertility & Hormonal Health',
    description: 'Looking for clarity about reproductive and long-term wellness.',
    icon: HeartPulse,
    image: `${imageDirectory}hormonal-health.webp`,
    imageAlt: 'Two women talking across a desk in a healthcare consultation room.',
  },
]
