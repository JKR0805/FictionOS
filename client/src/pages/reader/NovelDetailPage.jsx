import { Link, useParams, useNavigate } from 'react-router-dom'
import { useNovel, useChapters, useToggleFollow } from '@/hooks/useNovels'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatusBadge } from '@/components/ui/Badge'
import { ErrorState } from '@/components/ui/States'
import { NovelCover } from '@/components/shared/NovelCover'
import { formatCount, formatRelativeDate } from '@/lib/utils'
import { BookOpen, Users, Eye, Check } from 'lucide-react'

export default function NovelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: novel, isLoading, error } = useNovel(id)
  const { data: chapters } = useChapters(id)
  const toggleFollow = useToggleFollow()

  const publishedChapters = chapters?.filter(c => c.status === 'published') || []
  const firstChapter = publishedChapters.length > 0 ? publishedChapters[0] : null

  if (error) return <div className="container section"><ErrorState title="Novel not found" description="This novel doesn't exist or may have been removed." /></div>

  return (
    <section className="section">
      <div className="container grid-main">
        {/* Main column */}
        <div className="stack-lg">
          {isLoading ? (
            <div className="stack" style={{ gap: 'var(--space-4)' }}>
              <Skeleton style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
              <Skeleton style={{ height: '24px', width: '60%' }} />
              <Skeleton style={{ height: '80px' }} />
            </div>
          ) : (
            <>
              {/* Novel header */}
              <div className="card card-pad">
                <div className="row" style={{ gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                  <NovelCover
                    title={novel.title}
                    novelId={novel.id}
                    coverUrl={novel.coverUrl}
                    style={{ width: '180px', flexShrink: 0, boxShadow: 'var(--elev-raised)' }}
                  />
                  <div className="stack" style={{ flex: 1 }}>
                    <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{novel.title}</h1>
                      <StatusBadge status={novel.status} />
                    </div>
                    <p className="meta">by {novel.authorName}</p>
                    <p style={{ lineHeight: 1.6, maxWidth: '600px' }}>{novel.synopsis}</p>
                    <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
                      {novel.genre?.map((g) => (
                        <span key={g} className="badge badge-muted">{g}</span>
                      ))}
                      <div className="row meta body-sm" style={{ gap: 'var(--space-3)', marginLeft: 'var(--space-2)' }}>
                        <span className="row" style={{ gap: '4px', alignItems: 'center' }}><Eye size={14} /> {formatCount(novel.totalViews)}</span>
                        <span className="row" style={{ gap: '4px', alignItems: 'center' }}><BookOpen size={14} /> {formatCount(novel.totalReads)}</span>
                        <span className="row" style={{ gap: '4px', alignItems: 'center' }}><Users size={14} /> {formatCount(novel.followersCount)}</span>
                      </div>
                    </div>
                    <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
                      <button
                        className="btn btn-primary"
                        disabled={!firstChapter}
                        onClick={() => {
                          if (novel.lastReadChapterId) {
                            navigate(`/reader/chapter/${novel.lastReadChapterId}?novel=${id}`)
                          } else if (firstChapter) {
                            navigate(`/reader/chapter/${firstChapter.id}?novel=${id}`)
                          }
                        }}
                      >
                        {novel.lastReadChapterId ? 'Continue Reading' : firstChapter ? 'Start Reading' : 'No Chapters Yet'}
                      </button>
                      <button
                        className={novel.isFollowing ? "btn btn-ghost" : "btn"}
                        disabled={toggleFollow.isPending}
                        onClick={() => toggleFollow.mutate(id)}
                      >
                        {toggleFollow.isPending ? 'Updating...' : novel.isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>



              {/* Chapter list */}
              <div className="stack">
                <h2>Chapters</h2>
                <div className="chapter-list">
                  {publishedChapters.map((ch) => {
                    const isRead = novel.lastReadChapter && ch.number <= novel.lastReadChapter;
                    return (
                      <Link
                        key={ch.id}
                        to={`/reader/chapter/${ch.id}?novel=${id}`}
                        className="chapter-item row-between"
                        style={{ 
                          textDecoration: 'none', 
                          color: isRead ? 'var(--muted)' : 'inherit',
                          opacity: isRead ? 0.7 : 1
                        }}
                      >
                        <div className="row" style={{ gap: 'var(--space-3)' }}>
                          {isRead && <Check size={16} color="var(--success)" />}
                          <div>
                            <span className="body-sm" style={{ fontWeight: 500 }}>
                              Chapter {ch.number}: {ch.title}
                            </span>
                            {ch.publishedAt && (
                              <p className="meta" style={{ marginTop: 'var(--space-1)' }}>
                                {formatRelativeDate(ch.publishedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="badge badge-muted">{ch.wordCount?.toLocaleString()} words</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Aside */}
        <aside className="stack-lg">
          {!isLoading && novel && (
            <>
              <div className="card card-pad stack">
                <h3>About the Author</h3>
                <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-pill)', background: 'var(--border)', flexShrink: 0 }} />
                  <div>
                    <p className="body-sm" style={{ fontWeight: 500 }}>{novel.authorName}</p>
                    <p className="meta">{formatCount(novel.followersCount)} followers</p>
                  </div>
                </div>
                <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                  Follow Author
                </button>
              </div>

              <div className="card card-pad stack">
                <h3>Details</h3>
                <div className="stack" style={{ gap: 'var(--space-2)' }}>
                  <div className="row-between">
                    <span className="body-sm meta">Status</span>
                    <StatusBadge status={novel.status} />
                  </div>
                  <div className="row-between">
                    <span className="body-sm meta">Chapters</span>
                    <span className="body-sm" style={{ fontWeight: 500 }}>{novel.chapterCount}</span>
                  </div>
                  <div className="row-between">
                    <span className="body-sm meta">Genre</span>
                    <span className="body-sm" style={{ fontWeight: 500 }}>{novel.genre?.[0]}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}
