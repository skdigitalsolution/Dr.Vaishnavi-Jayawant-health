import { motion } from 'framer-motion'
import { Check, FileText } from 'lucide-react'

export default function BonusCard({ bonus, preview, entrance, reducedMotion, showReferenceValues }) {
  const { bonusNumber, title, description, highlights, resourceFormat, image, imageAlt, referenceValue, isPlaceholder } = bonus
  const showValue = !preview && showReferenceValues && referenceValue?.isVerified && referenceValue.displayPrice

  return (
    <article className="bonus-card animated-border">
      <div className="bonus-media">
        <motion.div
          className="bonus-image-float"
          initial={false}
          whileInView={reducedMotion ? undefined : { y: [0, -5, 0] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <img
            src={image}
            alt={imageAlt}
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <p className="bonus-badge">Bonus #{bonusNumber}</p>
        {isPlaceholder && <p className="bonus-mockup-label">Development mockup</p>}
      </div>
      <div className="bonus-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="bonus-highlights">
          {highlights.map((highlight, index) => (
            <motion.li key={highlight} {...entrance(index * 0.04, 4)}>
              <Check size={17} strokeWidth={2} aria-hidden="true" />{highlight}
            </motion.li>
          ))}
        </ul>
        <div className="bonus-card-footer">
          <p className="bonus-format"><FileText size={17} aria-hidden="true" />{resourceFormat}</p>
          {showValue && <p className="bonus-reference">Reference price <s>{referenceValue.displayPrice}</s></p>}
          <p className="bonus-included">{preview ? 'Proposed with registration' : 'Included With Registration'}</p>
        </div>
      </div>
    </article>
  )
}
