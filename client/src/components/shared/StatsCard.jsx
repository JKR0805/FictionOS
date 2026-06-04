import { formatCount } from '@/lib/utils'
import { cn } from '@/lib/utils'

/**
 * StatsCard — the metric display card from analytics sections
 */
export function StatsCard({ label, value, trend, className }) {
  return (
    <div className={cn('card card-pad stack', className)}>
      <strong style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-display)' }}>
        {typeof value === 'number' ? formatCount(value) : value}
      </strong>
      <span className="body-sm meta">{label}</span>
      {trend && (
        <span style={{ fontSize: 'var(--text-xs)', color: trend.startsWith('+') ? 'var(--success)' : 'var(--muted)' }}>
          {trend}
        </span>
      )}
    </div>
  )
}

/**
 * MetricBar — the progress-track style metric used in reading page
 */
export function MetricBar({ label, value, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="stack" style={{ gap: 'var(--space-1)' }}>
      {label && <span className="meta" style={{ fontSize: '11px' }}>{label}</span>}
      <div className="progress-track">
        <div className="progress-fill" style={{ '--progress': `${pct}%` }} />
      </div>
    </div>
  )
}
