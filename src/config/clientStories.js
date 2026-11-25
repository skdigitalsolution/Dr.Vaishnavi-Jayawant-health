import { showSitePreview } from './sitePreview'
const imageRoot = `${import.meta.env.BASE_URL}images/client-stories/`

// Add entries only after verifying the original review and securing publication consent.
// Each entry needs id, name, location, image, headline, review, isVerified and hasConsent.
const approvedStories = []

const previewStories = showSitePreview ? [
  ['mumbai', 'Mumbai, Maharashtra'],
  ['new-delhi', 'New Delhi, Delhi'],
  ['bengaluru', 'Bengaluru, Karnataka'],
  ['pune', 'Pune, Maharashtra'],
  ['ahmedabad', 'Ahmedabad, Gujarat'],
  ['hyderabad', 'Hyderabad, Telangana'],
  ['kochi', 'Kochi, Kerala'],
  ['jaipur', 'Jaipur, Rajasthan'],
  ['kolkata', 'Kolkata, West Bengal'],
].map(([id, location]) => ({
  id,
  location,
  image: `${imageRoot}${id}.webp`,
  name: 'Sample profile',
  headline: 'Client story preview',
  review: 'The original client review will appear here once it is verified and approved for publication.',
  preview: true,
})) : []

const verifiedStories = approvedStories.filter((story) =>
  story.isVerified && story.hasConsent && story.name && story.location &&
  story.image && story.headline && story.review)

export const clientStories = verifiedStories.length ? verifiedStories : previewStories
