import useCountdown from '../../hooks/useCountdown'

export default function CountdownTimer({ startAt, eventStatus }) {
  const remaining = useCountdown(eventStatus === 'ended' || eventStatus === 'cancelled' || eventStatus === 'live' ? null : startAt)
  if (eventStatus === 'cancelled') return <p className="pricing-countdown-status">The Masterclass Has Been Cancelled</p>
  if (eventStatus === 'ended') return <p className="pricing-countdown-status">The Masterclass Has Ended</p>
  if (eventStatus === 'live' || remaining === 0) {
    return <p className="pricing-countdown-status">The Masterclass Is Now Live</p>
  }
  if (remaining === null) {
    return <p className="pricing-countdown-status">Webinar Date To Be Announced</p>
  }

  const units = [
    ['Days', Math.floor(remaining / 86400)],
    ['Hours', Math.floor(remaining / 3600) % 24],
    ['Minutes', Math.floor(remaining / 60) % 60],
    ['Seconds', remaining % 60],
  ]

  return (
    <div className="pricing-countdown" role="timer" aria-label="Time until the masterclass starts">
      <p className="pricing-label">Masterclass Starts In</p>
      <dl>
        {units.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{String(value).padStart(2, '0')}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
