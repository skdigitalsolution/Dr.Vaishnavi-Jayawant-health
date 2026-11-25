export const premiumReveal = {
  duration: 0.56,
  ease: [0.22, 1, 0.36, 1],
}

export function responsiveReveal(reducedMotion, delay = 0, offset = {}, amount = 0.15) {
  if (reducedMotion) return {}

  const compact = window.matchMedia('(max-width: 1023px)').matches
  return {
    // Start at the visible style until the viewport observer triggers the animation.
    initial: compact ? false : { opacity: 0, ...offset },
    whileInView: compact ? { opacity: [0, 1], y: [16, 0] } : { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      ...premiumReveal,
      duration: compact ? 0.48 : premiumReveal.duration,
      delay: compact ? Math.min(delay, 0.16) : delay,
    },
  }
}
