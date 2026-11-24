import { motion } from 'framer-motion'

export default function AudienceQualificationCard({ qualification, entrance }) {
  const { id, title, icon: Icon, points } = qualification

  return (
    <motion.article className="audience-qualification" data-tone={id} {...entrance(0, { x: id === 'positive' ? -14 : 14 })}>
      <h3><Icon size={34} strokeWidth={1.65} aria-hidden="true" />{title}</h3>
      <ul>
        {points.map((point, index) => (
          <motion.li key={point} {...entrance(index * 0.045, { y: 4 })}>
            <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}
