export default function ComparisonCard({ approach }) {
  const { id, heading, icon: Icon, points } = approach

  return (
    <article className="comparison-card" data-approach={id}>
      <h4>{heading}</h4>
      <ul>
        {points.map((point) => (
          <li key={point}><Icon size={21} strokeWidth={1.7} aria-hidden="true" />{point}</li>
        ))}
      </ul>
    </article>
  )
}
