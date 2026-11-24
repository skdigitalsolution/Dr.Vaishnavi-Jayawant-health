import { BriefcaseBusiness, CircleCheck, CircleX, Flower2, HeartHandshake, House } from 'lucide-react'

export const qualifications = [
  {
    id: 'positive',
    title: 'This Masterclass Is For You If...',
    icon: CircleCheck,
    points: [
      'You have been diagnosed with PCOS or PCOD.',
      'You want to understand your hormonal health better.',
      'You are looking for realistic and balanced nutrition guidance.',
      'You feel confused by conflicting diet and wellness advice.',
      'You want to develop sustainable lifestyle habits.',
      'You want to make more informed decisions about your health.',
    ],
  },
  {
    id: 'negative',
    title: 'This Masterclass Is Not For You If...',
    icon: CircleX,
    points: [
      'You are expecting overnight results.',
      'You are looking for a guaranteed medical cure.',
      'You want a temporary quick-fix solution.',
      'You expect a personalized medical diagnosis during a group webinar.',
      'You require immediate medical treatment.',
      'You expect the webinar to replace your prescribed treatment or professional medical care.',
    ],
  },
]

const imageDirectory = `${import.meta.env.BASE_URL}images/audience/`

export const audienceCategories = [
  {
    title: 'Working Professionals',
    description: 'Discover wellness habits that can fit into a busy work schedule.',
    icon: BriefcaseBusiness,
    image: `${imageDirectory}working-professionals.webp`,
    imageAlt: 'A woman working on a laptop in a modern office.',
  },
  {
    title: 'Homemakers',
    description: 'Explore balanced nutrition and practical routines alongside family responsibilities.',
    icon: House,
    image: `${imageDirectory}homemakers.webp`,
    imageAlt: 'A woman arranging fruit at her kitchen counter.',
  },
  {
    title: 'Young Women',
    description: 'Build a better understanding of hormonal health and everyday wellness.',
    icon: Flower2,
    image: `${imageDirectory}young-women.webp`,
    imageAlt: 'A young woman reading a book outdoors.',
  },
  {
    title: 'Women Seeking Clarity',
    description: 'Gain a more informed perspective on PCOS, nutrition and sustainable lifestyle habits.',
    icon: HeartHandshake,
    image: `${imageDirectory}wellness-seekers.webp`,
    imageAlt: 'A woman writing in a journal at her desk.',
  },
]
