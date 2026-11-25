const sourceBusiness = 'Wellness Redefined'
const sourceRoot = 'https://img.flexifunnels.com/images/5147/'
const imageRoot = `${import.meta.env.BASE_URL}images/client-stories/`
const previewImageRoot = `${import.meta.env.BASE_URL}src/assets/client-stories.local/`

// Move a record here with reviewReuseApproved: true after permission is confirmed.
// For an approved avatar, add the original crop to public/images/client-stories,
// set profileImage to its filename, and set photoReuseApproved: true.
const approvedStories = []

// Unapproved review records stay in the Git-ignored localhost preview file.
const localReviews = import.meta.env.DEV
  ? import.meta.glob('./client-stories.local/reviews.js', { eager: true, import: 'default' })
  : {}
const previewStories = localReviews['./client-stories.local/reviews.js'] ?? []
const stories = [...previewStories, ...approvedStories]

export const clientStoryCards = stories
  .map(({ source, ...story }) => ({
    location: null,
    profileImage: null,
    photoReuseApproved: false,
    reviewReuseApproved: false,
    ...story,
    sourceUrl: `${sourceRoot}${source}.PNG`,
    sourceBusiness,
  }))
  .filter(({ reviewReuseApproved }) => import.meta.env.DEV || reviewReuseApproved)
  .map((story) => ({
    ...story,
    profileImage: story.profileImage && (import.meta.env.DEV || story.photoReuseApproved)
      ? `${story.photoReuseApproved ? imageRoot : previewImageRoot}${encodeURIComponent(story.profileImage)}`
      : null,
  }))
