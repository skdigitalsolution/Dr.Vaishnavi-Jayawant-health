import { ExternalLink, Star } from 'lucide-react'

export default function SuccessStoryCard({ story, duplicate }) {
  const { profileImage, initials, clientName, location, rating, headline, description, sourceUrl, sourceBusiness } = story

  return (
    <article className="client-story-card">
      <header className="client-story-profile">
        {profileImage
          ? <span className="client-story-photo">
              <img src={profileImage} alt="" width="64" height="64" loading="lazy" decoding="async" />
            </span>
          : <span className="client-story-initials" aria-hidden="true">{initials}</span>}
        <div>
          <p className="client-story-name">{clientName}</p>
          <p className="client-story-meta">{location || `${sourceBusiness} Community`}</p>
        </div>
      </header>
      <div className="client-story-rating" role="img" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill={star <= rating ? 'currentColor' : 'none'} aria-hidden="true" />
        ))}
      </div>
      <h3>{headline}</h3>
      <div>
        <p className="client-story-meta">Review summary</p>
        <p className="client-story-copy">{description}</p>
      </div>
      <footer className="client-story-source">
        <span>Google Review</span>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined}>
          View Original Review <ExternalLink size={14} aria-hidden="true" />
        </a>
      </footer>
    </article>
  )
}
