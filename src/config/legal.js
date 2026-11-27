export const refundPolicyText = 'The webinar registration fee is non-refundable. However, if you are unable to attend the scheduled webinar, you may attend the next available session. Our team will notify you about the upcoming webinar schedule.'
export const refundPolicySummary = 'Non-refundable registration. Missed the webinar? Attend the next available session.'

export const refundPolicyNotice = {
  id: 'refund',
  title: 'Refunds & Missed Sessions',
  url: null,
  paragraphs: [refundPolicyText],
}

// Supply an approved HTTPS or root-relative page URL, or approved text paragraphs.
export const policies = [
  { id: 'privacy', title: 'Privacy Policy', isApproved: false, url: null, paragraphs: [] },
  { id: 'terms', title: 'Terms & Conditions', isApproved: false, url: null, paragraphs: [] },
  { id: 'refund', title: 'Refund & Cancellation Policy', isApproved: false, url: null, paragraphs: [] },
]

export function configuredPageUrl(url) {
  if (typeof url !== 'string' || /[\s\\]/.test(url)) return null
  if (url.startsWith('/') && !url.startsWith('//')) return url

  try {
    return new URL(url).protocol === 'https:' ? url : null
  } catch {
    return null
  }
}

export const approvedPolicies = policies.flatMap((policy) => {
  if (!policy.isApproved) return []

  const url = configuredPageUrl(policy.url)
  const paragraphs = policy.paragraphs.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim())
  return url || paragraphs.length ? [{ ...policy, url, paragraphs }] : []
})

export const registrationPoliciesReady = approvedPolicies.length === policies.length
