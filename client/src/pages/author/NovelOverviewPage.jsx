import { useParams } from 'react-router-dom'
import { useNovel } from '@/hooks/useNovels'
import { StatusBadge } from '@/components/ui/Badge'
import { StatsCard } from '@/components/shared/StatsCard'
import { NovelCover } from '@/components/shared/NovelCover'
import { MOCK_VERSION_HISTORY } from '@/data/mockData'
import { formatRelativeDate } from '@/lib/utils'

export default function NovelOverviewPage() {
  const { novelId } = useParams()
  const { data: novel, isLoading } = useNovel(novelId)

  if (isLoading) return <div className="meta">Loading…</div>
  if (!novel) return null

  return (
    <div className="stack-lg">
      <div className="row-between">
        <div>
          <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>{novel.title}</h1>
            <StatusBadge status={novel.status} />
          </div>
          <p className="meta" style={{ marginTop: 'var(--space-2)' }}>Manage manuscript, tracking, and settings.</p>
        </div>
      </div>

      {/* Novel summary */}
      <div className="card card-pad" style={{ marginTop: 'var(--space-4)' }}>
        <div className="row" style={{ gap: 'var(--space-4)', alignItems: 'flex-start' }}>
          <NovelCover title={novel.title} novelId={novel.id} coverUrl={novel.coverUrl} style={{ width: '80px', flexShrink: 0, fontSize: '12px' }} />
          <div>
            <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{novel.title}</h3>
              <StatusBadge status={novel.status} />
            </div>
            <p className="body-sm" style={{ lineHeight: 1.6, maxWidth: '600px' }}>{novel.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Performance metrics */}
      <div className="stack" style={{ marginTop: 'var(--space-4)' }}>
        <p className="eyebrow">Performance Metrics</p>
        <div className="grid-4">
          <StatsCard label="Total Views" value={novel.totalViews} />
          <StatsCard label="Total Reads" value={novel.totalReads} />
          <StatsCard label="Followers" value={novel.followersCount} />
          <StatsCard label="Completion Rate" value={`${novel.completionRate}%`} />
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 'var(--space-4)' }}>
        {/* Growth & Trends */}
        <div className="stack">
          <p className="eyebrow">Growth &amp; Trends</p>
          <div className="card card-pad stack" style={{ height: '100%' }}>
            {[
              { label: 'Reader Growth', value: '+12% (30d)', color: 'var(--success)' },
              { label: 'Engagement Trends', value: 'Stable', color: 'var(--success)' },
              { label: 'Chapter Performance', value: 'Ch 23 spiked +4%', color: 'var(--muted)' },
            ].map((item) => (
              <div key={item.label} className="row-between" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <span className="body-sm" style={{ fontWeight: 500 }}>{item.label}</span>
                <span className="body-sm meta" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="stack">
          <p className="eyebrow">Recent Activity</p>
          <div className="card card-pad stack" style={{ height: '100%' }}>
            {MOCK_VERSION_HISTORY.map((entry) => (
              <div key={entry.id} className="row" style={{ gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <p className="body-sm" style={{ margin: 0, fontWeight: 500 }}>{entry.commitMessage}</p>
                  <p className="meta" style={{ fontSize: '11px' }}>{formatRelativeDate(entry.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
