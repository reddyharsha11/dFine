export function Button({
  as: Comp = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  const variants = {
    primary: 'bg-accent text-white px-6 py-3 hover:bg-accent-hover shadow-teal-md hover:-translate-y-0.5',
    secondary:
      'border border-white/40 text-white bg-white/5 px-6 py-3 hover:bg-white/10 backdrop-blur-sm',
    dark: 'bg-surface-dark text-white px-6 py-3 hover:bg-surface-dark2 shadow-teal-md',
    outline: 'border border-primary/30 text-primary bg-white px-6 py-3 hover:border-primary hover:shadow-teal-sm',
    ghost: 'text-primary px-4 py-2 hover:bg-primary-pale rounded-xl',
  }
  return (
    <Comp className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </Comp>
  )
}
