import { cn } from '@/lib/utils'

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'badge',
        variant === 'success' && 'badge-success',
        variant === 'warn' && 'badge-warn',
        variant === 'muted' && 'badge-muted',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const variants = {
    ongoing: 'success',
    completed: 'muted',
    hiatus: 'warn',
    published: 'success',
    draft: 'muted',
    scheduled: 'warn',
  }
  return <Badge variant={variants[status] || 'muted'}>{status}</Badge>
}
