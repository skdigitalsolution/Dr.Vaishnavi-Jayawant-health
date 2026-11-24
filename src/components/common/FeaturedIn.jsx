export default function FeaturedIn({ entries }) {
  const verifiedLogos = entries.filter(({ verified, name, logo }) => verified && name && logo)
  if (!verifiedLogos.length) return null

  return (
    <div className="trust-recognition">
      <h2 className="trust-stats-label" id="trust-recognition-title">Professional Recognition</h2>
      <ul>
        {verifiedLogos.map(({ name, logo }) => (
          <li key={logo}><img src={logo} alt={name} loading="lazy" decoding="async" /></li>
        ))}
      </ul>
    </div>
  )
}
