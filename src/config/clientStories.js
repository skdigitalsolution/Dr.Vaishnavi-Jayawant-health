const imageRoot = `${import.meta.env.BASE_URL}images/client-stories/`

// Add original feedback and a genuine photo only after verifying the details and obtaining consent.
// Fields: id, name, city, state, image (filename), headline, review, isVerified, hasConsent.
// rating is optional and preserves the original score on a five-star scale.
// Use 40–60 words when the original supports that length. Preserve shorter reviews as supplied.
// Confirm city and state before entry. Any location is supported, including:
// Mumbai and Pune (Maharashtra), New Delhi (Delhi), Bengaluru (Karnataka),
// Hyderabad (Telangana), Ahmedabad (Gujarat), Jaipur (Rajasthan),
// Kolkata (West Bengal), and Kochi (Kerala).
const approvedStories = []

export const clientStories = approvedStories
  .filter(({ isVerified, hasConsent, id, name, city, state, image, headline, review }) =>
    isVerified === true && hasConsent === true &&
    [id, name, city, state, image, headline, review].every((value) =>
      typeof value === 'string' && value.trim().length > 0),
  )
  .map((story) => ({
    ...story,
    location: `${story.city}, ${story.state}`,
    image: `${imageRoot}${encodeURIComponent(story.image)}`,
  }))
