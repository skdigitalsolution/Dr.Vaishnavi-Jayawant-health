const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-[linear-gradient(110deg,#FF633F_0%,#FF8554_50%,#FFAD70_100%)] text-[#171717] shadow-[0_10px_30px_rgba(255,99,63,0.28)] hover:brightness-110 active:brightness-95',
  secondary:
    'border border-secondary-text/30 bg-secondary-bg/60 text-primary-text hover:border-secondary-orange/60 hover:bg-secondary-bg',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  type,
  ...props
}) {
  const componentProps = {
    className: `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`.trim(),
    ...props,
  }

  if (Component === 'button') {
    componentProps.type = type ?? 'button'
  }

  return <Component {...componentProps}>{children}</Component>
}
