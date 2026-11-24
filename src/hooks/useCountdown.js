import { useEffect, useState } from 'react'
import { parseWebinarInstant } from '../utils/webinarTime'

const subscribers = new Set()
let tickId

function scheduleTick() {
  tickId = window.setTimeout(() => {
    const now = Date.now()
    subscribers.forEach((update) => update(now))
    if (subscribers.size) scheduleTick()
  }, 1000 - (Date.now() % 1000))
}

function subscribe(update) {
  subscribers.add(update)
  if (subscribers.size === 1) scheduleTick()

  return () => {
    subscribers.delete(update)
    if (!subscribers.size) window.clearTimeout(tickId)
  }
}

function secondsUntil(timestamp, now = Date.now()) {
  return timestamp === null ? null : Math.max(0, Math.ceil((timestamp - now) / 1000))
}

export default function useCountdown(instant) {
  const timestamp = parseWebinarInstant(instant)
  const [sample, setSample] = useState(() => ({ timestamp, seconds: secondsUntil(timestamp) }))

  useEffect(() => {
    if (timestamp === null) return

    function update(now) {
      const seconds = secondsUntil(timestamp, now)
      setSample({ timestamp, seconds })
      if (seconds === 0) unsubscribe()
    }

    const unsubscribe = subscribe(update)
    update(Date.now())
    return unsubscribe
  }, [timestamp])

  return sample.timestamp === timestamp ? sample.seconds : secondsUntil(timestamp)
}
