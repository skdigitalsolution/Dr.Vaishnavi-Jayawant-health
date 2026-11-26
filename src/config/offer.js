import { showSitePreview } from './sitePreview'
const previewId = 'webinar-ebook-preview-v1'

export function hasBlockingModal() {
  return Boolean(document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]:not([hidden]), [data-checkout-active="true"]'))
}

export function hasBlockingOfferOverlay() {
  return Boolean(document.fullscreenElement) || hasBlockingModal()
}

const offer = {
  preview: showSitePreview,
  shownKey: `${previewId}:shown`,
  popupDelayMs: 3000,
}

export default offer
