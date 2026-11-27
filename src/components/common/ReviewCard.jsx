import { Star } from 'lucide-react'

const dateFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'UTC' })

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" width="20" height="20" role="img" aria-label="Google">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.7c3.9-3.6 6-8.8 6-14.9Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.6l-6.7-5c-1.8 1.2-4.1 1.9-6.8 1.9-5.3 0-9.8-3.6-11.4-8.4H5.7v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.9a12 12 0 0 1 0-7.8v-5.2H5.7a20 20 0 0 0 0 18.2l6.9-5.2Z" />
      <path fill="#EA4335" d="M24 11.7c3 0 5.7 1 7.8 3l5.8-5.7C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.7 14.9l6.9 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z" />
    </svg>
  )
}

export default function ReviewCard({ review }) {
  const { reviewerName, profileImage, rating, reviewText, reviewDate, sourceUrl } = review
  const date = reviewDate ? new Date(reviewDate) : null

  return (
    <article className="testimonial-review">
      <div className="testimonial-review-rating">
        <span className="testimonial-stars" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={16} fill={index < rating ? 'currentColor' : 'none'} aria-hidden="true" />
          ))}
        </span>
        <GoogleMark />
      </div>
      <blockquote>{reviewText}</blockquote>
      <div className="testimonial-review-author">
        {profileImage && <img src={profileImage} alt="" width={38} height={38} loading="lazy" decoding="async" />}
        <div>
          <p>{reviewerName}</p>
          {date && !Number.isNaN(date.getTime()) && <time dateTime={reviewDate}>{dateFormat.format(date)}</time>}
        </div>
      </div>
      {sourceUrl && <a href={sourceUrl}>Read original Google review<span className="sr-only"> by {reviewerName}</span></a>}
    </article>
  )
}
