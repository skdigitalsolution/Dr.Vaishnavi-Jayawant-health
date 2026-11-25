import { MapPin, Quote, Star } from 'lucide-react'

const stars = [1, 2, 3, 4, 5]

export default function SuccessStoryCard({ story }) {
  const { image, name, location, rating, headline, review } = story
  const hasRating = Number.isFinite(rating) && rating >= 0 && rating <= 5

  return (
    <article className="client-story-card">
      <header className="client-story-profile">
        <img src={image} alt="" width="64" height="64" loading="lazy" decoding="async" />
        <div>
          <p className="client-story-name">{name}</p>
          <p className="client-story-location"><MapPin size={14} aria-hidden="true" />{location}</p>
        </div>
      </header>
      {hasRating && (
        <div className="client-story-rating" role="img" aria-label={`${rating} out of 5 stars`}>
          {stars.map((star) => (
            <span key={star} className="client-story-star" aria-hidden="true">
              <Star size={16} />
              <span style={{ width: `${Math.min(1, Math.max(0, rating - star + 1)) * 100}%` }}>
                <Star size={16} fill="currentColor" />
              </span>
            </span>
          ))}
        </div>
      )}
      <h3>{headline}</h3>
      <blockquote className="client-story-quote">
        <Quote size={25} aria-hidden="true" />
        <p>{review}</p>
      </blockquote>
    </article>
  )
}
