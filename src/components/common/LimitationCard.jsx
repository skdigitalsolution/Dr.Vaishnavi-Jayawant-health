export default function LimitationCard({ limitation }) {
  const { category, highlight, description, icon: Icon } = limitation

  return (
    <article className="limitation-card">
      <div className="limitation-category">
        <Icon size={24} strokeWidth={1.65} aria-hidden="true" />
        {category}
      </div>
      <h3>{highlight}</h3>
      <p>{description}</p>
    </article>
  )
}
