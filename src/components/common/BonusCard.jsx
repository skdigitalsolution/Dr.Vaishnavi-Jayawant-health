import { motion } from 'framer-motion'
import { Check, FileText } from 'lucide-react'

export default function BonusCard({ bonus, entrance, reducedMotion }) {
  const { bonusNumber, category, title, subtitle, description, highlights, pages, image } = bonus

  return (
    <article className="bonus-card animated-border">
      <p className="bonus-badge">Bonus #{bonusNumber} · {category}</p>
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
            alt={title + ' original book cover'}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
      <div className="bonus-card-copy">
        <h3>{title}</h3>
        <p className="bonus-subtitle">{subtitle}</p>
        <p>{description}</p>
        <ul className="bonus-highlights">
          {highlights.map((highlight, index) => (
            <motion.li key={highlight} {...entrance(index * 0.04, 4)}>
              <Check size={17} strokeWidth={2} aria-hidden="true" />{highlight}
            </motion.li>
          ))}
        </ul>
        <div className="bonus-card-footer">
          <p className="bonus-format"><FileText size={17} aria-hidden="true" />Digital PDF eBook · {pages} pages</p>
          <p className="bonus-format">Revised Edition 2026</p>
          <p className="bonus-included">Complimentary with paid registration.</p>
        </div>
      </div>
    </article>
  )
}
