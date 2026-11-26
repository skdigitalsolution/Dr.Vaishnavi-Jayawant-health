export const bonusResources = [
  {
    id: 'circle-of-life',
    bonusNumber: '01',
    category: 'Life',
    title: 'Circle of Life',
    subtitle: 'The HWRS Model of Happiness',
    description: 'Discover a holistic approach to balancing the four essential dimensions of life and explore meaningful personal growth.',
    highlights: [
      'Health, wealth and life balance.',
      'Meaningful relationships.',
      'Spiritual bliss and happiness.',
      '90-day Circle of Life action plan.',
    ],
    pages: 77,
    image: `${import.meta.env.BASE_URL}images/ebook/circle-of-life-cover.webp`,
  },
  {
    id: 'health',
    bonusNumber: '02',
    category: 'Health',
    title: '5 Pillars of Good Health',
    subtitle: 'The Master Your Health Blueprint',
    description: 'Explore essential wellness principles and practical resources for building healthier everyday habits.',
    highlights: [
      'Regular exercise and hydration.',
      'Sleep and balanced nutrition.',
      'Positive mindset.',
      'Health goals and daily routine tracker.',
    ],
    pages: 19,
    image: `${import.meta.env.BASE_URL}images/ebook/health-cover.webp`,
  },
  {
    id: 'wealth',
    bonusNumber: '03',
    category: 'Wealth',
    title: 'The Side Hustle Funnel',
    subtitle: 'A Blueprint for Building a Side Business',
    description: 'Explore how to turn your knowledge into a useful book and develop a structured business funnel around your expertise.',
    highlights: [
      'Identify your ideal audience.',
      'AI-assisted book writing.',
      'Build a book-based business funnel.',
      '90-day side hustle action plan.',
    ],
    pages: 43,
    image: `${import.meta.env.BASE_URL}images/ebook/wealth-cover.webp`,
  },
]

export const bonusPageCount = bonusResources.reduce((sum, book) => sum + book.pages, 0)
