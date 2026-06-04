import { Link } from 'react-router-dom'
import { NovelCover } from './NovelCover'
import { StatusBadge } from '@/components/ui/Badge'
import { formatCount } from '@/lib/utils'

/**
 * NovelCard — grid card used on Discover and Author Dashboard
 */
export function NovelCard({ novel, href, showStats = false }) {
  const to = href || `/reader/novel/${novel.id}`

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="book-card interactive-card" style={{ padding: 'var(--space-2)', border: '1px solid transparent', borderRadius: 'var(--radius-lg)' }}>
        <NovelCover title={novel.title} novelId={novel.id} coverUrl={novel.coverUrl} />
        <h3 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-lg)', marginBottom: 0 }}>
          {novel.title}
        </h3>
        <p className="body-sm meta" style={{ margin: 0 }}>{novel.genre?.[0]}</p>
        {showStats && (
          <div style={{ marginTop: 'var(--space-1)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            <StatusBadge status={novel.status} />
            <span className="meta">{formatCount(novel.totalReads)} reads</span>
          </div>
        )}
        {!showStats && novel.lastReadChapter && novel.chapterCount && (
          <div style={{ marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span className="body-sm meta" style={{ fontSize: '11px', margin: 0 }}>Progress</span>
              <span className="body-sm meta" style={{ fontSize: '11px', margin: 0 }}>
                Ch {novel.lastReadChapter} / {novel.chapterCount}
              </span>
            </div>
            <div className="progress-track" style={{ height: '4px', background: 'var(--border)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
              <div 
                className="progress-fill" 
                style={{ 
                  height: '100%', 
                  background: 'var(--accent)', 
                  width: `${Math.min(100, (novel.lastReadChapter / novel.chapterCount) * 100)}%` 
                }} 
              />
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}

/**
 * NovelListCard — horizontal card used in author dashboard workspace selector
 */
export function NovelListCard({ novel, href }) {
  const to = href || `/author/novel/${novel.id}/overview`

  return (
    <Link
      to={to}
      className="card card-pad stack"
      style={{ textDecoration: 'none', color: 'inherit', borderWidth: '2px', borderColor: 'transparent' }}
    >
      <div className="row" style={{ gap: 'var(--space-4)' }}>
        <NovelCover
          title={novel.title}
          novelId={novel.id}
          coverUrl={novel.coverUrl}
          width="64px"
          height="86px"
          style={{ flexShrink: 0, fontSize: '10px' }}
        />
        <div className="stack" style={{ gap: 'var(--space-2)', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 1.2 }}>{novel.title}</h3>
          <StatusBadge status={novel.status} />
        </div>
      </div>
      <div
        className="row-between"
        style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)' }}
      >
        <span className="meta body-sm">
          Latest: Ch {novel.latestChapter?.number} ({novel.latestChapter?.publishedAt?.slice(0, 10) || '—'})
        </span>
        <span className="meta body-sm">{formatCount(novel.totalViews)} Readers</span>
      </div>
    </Link>
  )
}
