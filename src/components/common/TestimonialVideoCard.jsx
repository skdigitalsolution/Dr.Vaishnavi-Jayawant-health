import { Film, Play } from 'lucide-react'

export default function TestimonialVideoCard({ entry, onPlay }) {
  const { title, poster, clientName, location, duration, isPlaceholder } = entry

  return (
    <article className="testimonial-video-card">
      {poster && <img src={poster} alt="" loading="lazy" decoding="async" width={360} height={640} />}
      <div className="testimonial-video-overlay">
        {duration && <span className="testimonial-duration">{duration}</span>}
        {isPlaceholder ? (
          <>
            <span className="testimonial-preview-tag">Development preview</span>
            <Film className="testimonial-placeholder-icon" aria-hidden="true" size={36} strokeWidth={1.4} />
          </>
        ) : (
          <button
            className="testimonial-play pulse-ring"
            type="button"
            aria-label={`Play ${title}${clientName ? ` from ${clientName}` : ''}`}
            onClick={(event) => onPlay(entry, event.currentTarget)}
          >
            <Play size={26} fill="currentColor" aria-hidden="true" />
          </button>
        )}
        <div className="testimonial-video-caption">
          <h3>{title}</h3>
          {isPlaceholder && <p>Authorized video pending</p>}
          {(clientName || location) && <p>{[clientName, location].filter(Boolean).join(' · ')}</p>}
        </div>
      </div>
    </article>
  )
}
