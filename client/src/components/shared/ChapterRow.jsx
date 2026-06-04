import { StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatRelativeDate } from '@/lib/utils'

/**
 * ChapterRow — one row in the chapter management table (author workspace)
 */
export function ChapterRow({ chapter, onEdit, onPublish, onUnpublish, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
      <td style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', width: '40px' }}>
        {chapter.number}
      </td>
      <td style={{ padding: 'var(--space-2) var(--space-3)', fontWeight: 500, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={chapter.title}>
        {chapter.title}
      </td>
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <StatusBadge status={chapter.status} />
      </td>
      <td style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
        {chapter.publishedAt ? formatRelativeDate(chapter.publishedAt) : '—'}
      </td>
      <td style={{ padding: 'var(--space-2) var(--space-3)', textAlign: 'right' }}>
        <div className="row" style={{ gap: 'var(--space-1)', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
          <Button variant="ghost" style={{ padding: '0 var(--space-1)', minWidth: '32px' }} disabled={isFirst} onClick={() => onMoveUp?.(chapter)}>↑</Button>
          <Button variant="ghost" style={{ padding: '0 var(--space-1)', minWidth: '32px' }} disabled={isLast} onClick={() => onMoveDown?.(chapter)}>↓</Button>
          <Button
            variant="ghost"
            style={{ padding: 'var(--space-1) var(--space-2)', minHeight: '32px', whiteSpace: 'nowrap' }}
            onClick={() => onEdit?.(chapter)}
          >
            Edit
          </Button>
          {chapter.status === 'draft' ? (
            <Button
              variant="ghost"
              style={{ padding: 'var(--space-1) var(--space-2)', minHeight: '32px', whiteSpace: 'nowrap' }}
              onClick={() => onPublish?.(chapter)}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="ghost"
              style={{ padding: 'var(--space-1) var(--space-2)', minHeight: '32px', whiteSpace: 'nowrap' }}
              onClick={() => onUnpublish?.(chapter)}
            >
              Unpublish
            </Button>
          )}
          <Button
            variant="ghost"
            style={{ padding: 'var(--space-1) var(--space-2)', minHeight: '32px', color: 'var(--danger)', whiteSpace: 'nowrap' }}
            onClick={() => onDelete?.(chapter)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
}


