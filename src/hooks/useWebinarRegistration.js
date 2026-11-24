import webinarConfig from '../config/webinar'
import useCountdown from './useCountdown'

export default function useWebinarRegistration() {
  const { registrationDeadline, registrationStatus, webinarEndAt, eventStatus } = webinarConfig
  const deadline = useCountdown(registrationDeadline)
  const end = useCountdown(webinarEndAt)
  const status = eventStatus === 'cancelled' ? 'cancelled' : end === 0 ? 'ended' : eventStatus
  const closed = registrationStatus === 'closed' || deadline === 0 || status === 'cancelled' || status === 'ended'

  return { eventStatus: status, closed, canReserve: registrationStatus === 'open' && !closed }
}
