// Supply only approved names, locations, photographs and local media paths.
// Video and poster files belong in public/videos/testimonials and public/images/testimonials.
const videos = []

// Entries accept id, reviewerName, profileImage, rating, reviewText, reviewDate
// (ISO date), sourceUrl, isVerified and hasConsent.
const reviews = []

export const testimonials = {
  videos: videos.filter((entry) =>
    entry.isVerified && entry.hasConsent && !entry.isPlaceholder && entry.videoUrl && entry.poster,
  ),
  reviews: reviews.filter((entry) =>
    entry.isVerified && entry.hasConsent && entry.reviewerName && entry.reviewText &&
    Number.isInteger(entry.rating) && entry.rating >= 1 && entry.rating <= 5,
  ),
}
