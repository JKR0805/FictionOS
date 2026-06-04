import { cn } from '@/lib/utils'

export function Skeleton({ className, style }) {
  return <div className={cn('skeleton', className)} style={style} aria-hidden="true" />
}

export function NovelCardSkeleton() {
  return (
    <div className="stack" style={{ gap: 'var(--space-3)' }}>
      <Skeleton style={{ aspectRatio: '3/4', minHeight: '220px', borderRadius: 'var(--radius-md)' }} />
      <Skeleton style={{ height: '20px', width: '80%' }} />
      <Skeleton style={{ height: '14px', width: '50%' }} />
    </div>
  )
}

export function ChapterRowSkeleton() {
  return (
    <div className="chapter-item">
      <div className="stack" style={{ gap: 'var(--space-1)' }}>
        <Skeleton style={{ height: '16px', width: '60%' }} />
        <Skeleton style={{ height: '12px', width: '30%' }} />
      </div>
      <Skeleton style={{ height: '28px', width: '80px', borderRadius: 'var(--radius-pill)' }} />
    </div>
  )
}
