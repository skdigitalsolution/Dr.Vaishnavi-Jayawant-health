export default function AudienceCategoryCard({ category }) {
  const { title, description, icon: Icon, image, imageAlt } = category

  return (
    <article className="audience-category">
      <div className="audience-category-image">
        <img
          src={image}
          alt={imageAlt}
          width={640}
          height={800}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="audience-category-copy">
        <h4><Icon size={22} strokeWidth={1.7} aria-hidden="true" />{title}</h4>
        <p>{description}</p>
      </div>
    </article>
  )
}
