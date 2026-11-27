import { Play } from 'lucide-react'

export default function TestimonialVideoCard({ entry, onPlay }) {
  const { title, poster, clientName, location, duration } = entry

  return (
    <article className="testimonial-video-card">
      {poster && <img src={poster} alt="" loading="lazy" decoding="async" width={360} height={640} />}
      <div className="testimonial-video-overlay">
        {duration && <span className="testimonial-duration">{duration}</span>}
        <button
          className="testimonial-play pulse-ring"
          type="button"
          aria-label={`Play ${title}${clientName ? ` from ${clientName}` : ''}`}
          onClick={(event) => onPlay(entry, event.currentTarget)}
        >
          <Play size={26} fill="currentColor" aria-hidden="true" />
        </button>
        <div className="testimonial-video-caption">
          <h3>{title}</h3>
          {(clientName || location) && <p>{[clientName, location].filter(Boolean).join(' · ')}</p>}
        </div>
      </div>
    </article>
  )
}
