export default function Container({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}
