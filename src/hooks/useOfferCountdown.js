import { useCallback, useEffect, useState } from 'react'
import offer from '../config/offer'

const durationMs = offer.offerDurationSeconds * 1000

function parseExpiry(value, timestamp) {
  const expiry = Number(value)
  return Number.isSafeInteger(expiry) && expiry > 0 && expiry <= timestamp + durationMs
    ? expiry
    : null
}

export default function useOfferCountdown() {
  const [expiresAt, setExpiresAt] = useState(() =>
    offer.preview ? parseExpiry(localStorage.getItem(offer.expiryKey), Date.now()) : null)
  const [now, setNow] = useState(Date.now)

  const activate = useCallback(() => {
    if (!offer.preview) return
    const timestamp = Date.now()
    const stored = parseExpiry(localStorage.getItem(offer.expiryKey), timestamp)
    const expiry = stored ?? timestamp + durationMs
    if (stored === null) localStorage.setItem(offer.expiryKey, String(expiry))
    setExpiresAt(expiry)
    setNow(timestamp)
  }, [])

  const seconds = expiresAt === null ? null : Math.max(0, Math.ceil((expiresAt - now) / 1000))
  const running = seconds > 0

  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [running])

  useEffect(() => {
    if (!offer.preview) return
    function synchronize(event) {
      if (event.key !== offer.expiryKey || event.storageArea !== localStorage) return
      const timestamp = Date.now()
      setExpiresAt(parseExpiry(event.newValue, timestamp))
      setNow(timestamp)
    }

    window.addEventListener('storage', synchronize)
    return () => window.removeEventListener('storage', synchronize)
  }, [])

  return { seconds, expiresAt, activate }
}
