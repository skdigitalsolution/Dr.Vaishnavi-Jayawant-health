import PriceDisplay from './PriceDisplay'

export default function RegistrationStepCard({ step }) {
  const { stepNumber, title, description, supportingLabel, icon: Icon } = step

  return (
    <article className="registration-step-card">
      <header className="registration-step-header">
        <span className="registration-step-icon">
          <Icon size={29} strokeWidth={1.65} aria-hidden="true" />
        </span>
        <span className="registration-step-number" aria-hidden="true">{stepNumber}</span>
      </header>
      <p className="registration-step-label">Step {stepNumber}</p>
      <h3>{title}</h3>
      <p className="registration-step-description">
        {step.showRegistrationPrice && <>Complete your <PriceDisplay /> </>}{description}
      </p>
      <p className="registration-step-support">{supportingLabel}</p>
    </article>
  )
}
