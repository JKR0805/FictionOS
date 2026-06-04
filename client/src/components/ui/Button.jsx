import { cn } from '@/lib/utils'

/**
 * Button component
 * @param {'default'|'primary'|'ghost'|'icon'} variant
 * @param {'sm'|'md'} size
 */
export function Button({
  children,
  variant = 'default',
  size,
  className,
  disabled,
  type = 'button',
  onClick,
  ...props
}) {
  const classes = cn(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'ghost' && 'btn-ghost',
    variant === 'icon' && 'btn-icon',
    size === 'sm' && 'btn-sm',
    className
  )

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
