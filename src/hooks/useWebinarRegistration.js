import webinarConfig from '../config/webinar'
import useCountdown from './useCountdown'

export default function useWebinarRegistration() {
  const { registrationDeadline, registrationStatus, webinarEndAt, eventStatus, paymentEnabled, paymentUrl } = webinarConfig
  const deadline = useCountdown(registrationDeadline)
  const end = useCountdown(webinarEndAt)
  const status = eventStatus === 'cancelled' ? 'cancelled' : end === 0 ? 'ended' : eventStatus
  const closed = registrationStatus === 'closed' || deadline === 0 || status === 'cancelled' || status === 'ended'

  const canReserve = registrationStatus === 'open' && !closed && paymentEnabled && Boolean(paymentUrl)

  return { eventStatus: status, closed, canReserve }
}
