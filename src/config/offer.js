import { showSitePreview } from './sitePreview'
const previewId = 'webinar-ebook-preview-v1'

export function hasBlockingOfferOverlay() {
  return Boolean(document.fullscreenElement ||
    document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]:not([hidden]), [data-checkout-active="true"]'))
}

const offer = {
  preview: showSitePreview,
  expiryKey: `${previewId}:expires-at`,
  shownKey: `${previewId}:shown`,
  popupDelayMs: 3000,
  offerDurationSeconds: 300,
  startCountdownOnPopupOpen: true,
}

export default offer
