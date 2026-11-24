export default function ProblemCard({ problem }) {
  const { title, description, icon: Icon, image, imageAlt } = problem

  return (
    <article className="problem-card">
      <div className="problem-card-image">
        <img
          src={image}
          alt={imageAlt}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="problem-card-content">
        <h3><Icon aria-hidden="true" size={22} strokeWidth={1.7} />{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}
