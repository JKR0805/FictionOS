import { cn } from '@/lib/utils'

export function Field({ label, htmlFor, children, className, error }) {
  return (
    <div className={cn('field', className)}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {error && (
        <p style={{ color: 'var(--danger)', fontSize: 'var(--text-xs)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function Input({ className, ...props }) {
  return <input className={className} {...props} />
}

export function Textarea({ className, ...props }) {
  return <textarea className={className} {...props} />
}

export function Select({ children, className, ...props }) {
  return (
    <select className={className} {...props}>
      {children}
    </select>
  )
}
