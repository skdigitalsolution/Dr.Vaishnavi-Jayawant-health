import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function AgendaModule({ module, entrance }) {
  const { moduleNumber, title, headline, description, learningPoints, icon: Icon, image, imageAlt, imagePosition } = module

  return (
    <motion.article
      className="agenda-module animated-border"
      data-image-position={imagePosition}
      {...entrance(0, { x: imagePosition === 'left' ? -14 : 14 })}
    >
      <div className="agenda-module-image">
        <img
          src={image}
          alt={imageAlt}
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="agenda-module-copy">
        <span className="agenda-module-number" aria-hidden="true">{moduleNumber}</span>
        <p className="agenda-label agenda-module-label">
          <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
          Module {moduleNumber}
        </p>
        <h3>{title}</h3>
        <p className="agenda-module-headline">{headline}</p>
        <p className="agenda-module-description">{description}</p>
        <ul className="agenda-checklist">
          {learningPoints.map((point, index) => (
            <motion.li key={point} {...entrance(index * 0.06, { y: 5 })}>
              <Check size={18} strokeWidth={2} aria-hidden="true" />
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
