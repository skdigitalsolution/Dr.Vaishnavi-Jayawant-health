const imageDirectory = `${import.meta.env.BASE_URL}images/bonuses/`

export const bonusResources = [
  {
    id: 'meal-guide',
    bonusNumber: '01',
    title: 'PCOS-Friendly Indian Meal Guide',
    description: 'Discover balanced meal ideas using familiar Indian foods and everyday ingredients without unnecessary dietary restrictions.',
    highlights: [
      'Balanced Indian meal plate.',
      'Practical everyday food choices.',
      'Simple meal planning ideas.',
      'Sustainable nutrition habits.',
    ],
    resourceFormat: 'Digital PDF Guide',
    image: `${imageDirectory}indian-meal-guide.webp`,
    imageAlt: 'Meal guide cover mockup featuring a balanced Indian thali.',
    resourceUrl: null,
    referenceValue: null,
    isApproved: false,
    isAvailable: false,
    isPlaceholder: true,
  },
  {
    id: 'wellness-tracker',
    bonusNumber: '02',
    title: 'Personal Cycle & Wellness Tracker',
    description: 'A simple and organized resource to track your menstrual cycle, energy levels and everyday wellness habits.',
    highlights: [
      'Menstrual cycle tracking.',
      'Daily wellness observations.',
      'Energy and sleep tracking.',
      'Personal health notes.',
    ],
    resourceFormat: 'Printable PDF Tracker',
    image: `${imageDirectory}cycle-wellness-tracker.webp`,
    imageAlt: 'Spiral-bound cycle and wellness tracker cover mockup.',
    resourceUrl: null,
    referenceValue: null,
    isApproved: false,
    isAvailable: false,
    isPlaceholder: true,
  },
  {
    id: 'action-plan',
    bonusNumber: '03',
    title: 'Daily Wellness Action Plan',
    description: 'A practical resource to help you build consistent lifestyle habits around nutrition, movement, sleep and everyday wellness.',
    highlights: [
      'Daily wellness checklist.',
      'Healthy routine planning.',
      'Movement and hydration reminders.',
      'Consistent habit tracking.',
    ],
    resourceFormat: 'Digital PDF Workbook',
    image: `${imageDirectory}daily-wellness-plan.webp`,
    imageAlt: 'Daily wellness workbook cover mockup with sample checklist pages.',
    resourceUrl: null,
    referenceValue: null,
    isApproved: false,
    isAvailable: false,
    isPlaceholder: true,
  },
]

export const bonusOffer = {
  // Enable only after genuine reference prices are confirmed.
  // Each referenceValue may then supply { displayPrice, isVerified }.
  showReferenceValues: false,
  delivery: {
    options: ['thank-you-page', 'registered-email', 'private-whatsapp'],
    method: null,
  },
}
