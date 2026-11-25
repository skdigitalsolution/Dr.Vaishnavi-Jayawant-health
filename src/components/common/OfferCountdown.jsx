import { Timer } from 'lucide-react'

export default function OfferCountdown({ seconds, compact = false }) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const remainder = String(seconds % 60).padStart(2, '0')
  const label = `${minutes} minutes, ${remainder} seconds remaining`

  if (compact) {
    return (
      <div className="sticky-offer-countdown">
        <p>Free eBook Preview</p>
        <strong role="timer" aria-label={label}>{minutes}:{remainder}</strong>
      </div>
    )
  }

  return (
    <div className="offer-countdown">
      <p><Timer size={19} aria-hidden="true" /> Register Within 5 Minutes &amp; Get It FREE!</p>
      <div className="offer-clock" role="timer" aria-label={label}>
        <span aria-hidden="true"><strong>{minutes}</strong><small>Min</small></span>
        <b aria-hidden="true">:</b>
        <span aria-hidden="true"><strong>{remainder}</strong><small>Sec</small></span>
      </div>
    </div>
  )
}
