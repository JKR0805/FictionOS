export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state" role="status" aria-label={title}>
      {icon && (
        <div aria-hidden="true" style={{ color: 'var(--muted)' }}>
          {icon}
        </div>
      )}
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function ErrorState({ title = 'Something went wrong', description, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <h3>{title}</h3>
      {description && <p style={{ color: 'var(--danger)' }}>{description}</p>}
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
