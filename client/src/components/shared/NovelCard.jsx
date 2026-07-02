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
      <article className="glass-panel glow-border interactive-node stack" style={{ padding: 'var(--space-3)', height: '100%', gap: 'var(--space-2)' }}>
        <NovelCover title={novel.title} novelId={novel.id} coverUrl={novel.coverUrl} />
        <div style={{ marginTop: 'var(--space-2)' }}>
          <h3 style={{ fontFamily: 'var(--font-reading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)', color: 'var(--fg-2)', lineHeight: 1.2 }}>
            {novel.title}
          </h3>
          <p className="body-sm meta" style={{ margin: 0, color: 'var(--accent)' }}>{novel.genre?.[0]}</p>
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          {showStats && (
            <div style={{ marginTop: 'var(--space-2)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <StatusBadge status={novel.status} />
              <span className="meta">{formatCount(novel.totalReads)} reads</span>
            </div>
          )}
          
          {!showStats && novel.lastReadChapter && novel.chapterCount && (
            <div style={{ marginTop: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="meta" style={{ fontSize: '11px', margin: 0 }}>Progress</span>
                <span className="meta" style={{ fontSize: '11px', margin: 0, color: 'var(--fg-2)' }}>
                  Ch {novel.lastReadChapter} / {novel.chapterCount}
                </span>
              </div>
              <div style={{ height: '4px', background: 'var(--border-soft)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', position: 'relative' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    background: 'var(--amber-glow)', 
                    width: `${Math.min(100, (novel.lastReadChapter / novel.chapterCount) * 100)}%`,
                    boxShadow: '0 0 10px var(--amber-glow)'
                  }} 
                />
              </div>
            </div>
          )}
        </div>
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
      className="glass-panel glow-border stack"
      style={{ textDecoration: 'none', color: 'inherit', padding: 'var(--space-4)', display: 'block' }}
    >
      <div className="row" style={{ gap: 'var(--space-4)' }}>
        <NovelCover
          title={novel.title}
          novelId={novel.id}
          coverUrl={novel.coverUrl}
          width="72px"
          height="96px"
          style={{ flexShrink: 0, fontSize: '10px' }}
        />
        <div className="stack" style={{ gap: 'var(--space-2)', flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-reading)', fontSize: 'var(--text-2xl)', color: 'var(--fg-2)' }}>{novel.title}</h3>
          <StatusBadge status={novel.status} />
        </div>
      </div>
      <div
        className="row-between"
        style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-soft)' }}
      >
        <span className="meta body-sm">
          Latest: <span style={{ color: 'var(--fg-2)' }}>Ch {novel.latestChapter?.number}</span> ({novel.latestChapter?.publishedAt?.slice(0, 10) || '—'})
        </span>
        <span className="meta body-sm"><span style={{ color: 'var(--accent)' }}>{formatCount(novel.totalViews ?? 0)}</span> Nodes</span>
      </div>
    </Link>
  )
}
