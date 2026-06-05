import { Link, useParams, useNavigate } from 'react-router-dom'
import { useNovel, useChapters, useToggleFollow } from '@/hooks/useNovels'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatusBadge } from '@/components/ui/Badge'
import { ErrorState } from '@/components/ui/States'
import { NovelCover } from '@/components/shared/NovelCover'
import { formatCount, formatRelativeDate } from '@/lib/utils'
import { BookOpen, Users, Eye, Check, Activity, ShieldCheck } from 'lucide-react'

export default function NovelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: novel, isLoading, error } = useNovel(id)
  const { data: chapters } = useChapters(id)
  const toggleFollow = useToggleFollow()

  const publishedChapters = chapters?.filter(c => c.status === 'published') || []
  const firstChapter = publishedChapters.length > 0 ? publishedChapters[0] : null

  if (error) return <div className="container section"><ErrorState title="Error: Novel Not Found" description="This novel does not exist or has been removed." /></div>

  return (
    <section className="section flush-top bg-cinematic" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Very faint background SVG to maintain ecosystem feel */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="500" cy="0" r="400" fill="var(--indigo-pulse)" opacity="0.05" />
      </svg>
      
      <div className="container grid-main" style={{ position: 'relative', zIndex: 10 }}>
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
              <div className="glass-panel glow-border" style={{ padding: 'var(--space-6)' }}>
                <div className="row" style={{ gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                  <NovelCover
                    title={novel.title}
                    novelId={novel.id}
                    coverUrl={novel.coverUrl}
                    style={{ width: '200px', flexShrink: 0, boxShadow: 'var(--shadow-glow)' }}
                  />
                  <div className="stack" style={{ flex: 1 }}>
                    <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                      <h1 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, color: 'var(--fg-2)', lineHeight: 1.1 }}>{novel.title}</h1>
                      <StatusBadge status={novel.status} />
                    </div>
                    <p className="meta glow-text-indigo" style={{ fontSize: 'var(--text-lg)' }}>by {novel.authorName}</p>
                    
                    <p style={{ lineHeight: 1.6, maxWidth: '650px', marginTop: 'var(--space-2)', color: 'var(--fg)' }}>{novel.synopsis}</p>
                    
                    <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                      {novel.genre?.map((g) => (
                        <span key={g} className="badge" style={{ background: 'rgba(93, 63, 211, 0.2)', color: 'var(--fg-2)', border: '1px solid var(--indigo-pulse)', boxShadow: '0 0 8px rgba(93, 63, 211, 0.3)' }}>{g}</span>
                      ))}
                      <div className="row meta body-sm" style={{ gap: 'var(--space-4)', marginLeft: 'var(--space-2)' }}>
                        <span className="row glow-text-amber" style={{ gap: '6px', alignItems: 'center' }}><Eye size={16} /> {formatCount(novel.totalViews)} <span className="meta" style={{fontSize: '10px'}}>Views</span></span>
                        <span className="row glow-text-amber" style={{ gap: '6px', alignItems: 'center' }}><BookOpen size={16} /> {formatCount(novel.totalReads)} <span className="meta" style={{fontSize: '10px'}}>Reads</span></span>
                        <span className="row glow-text-amber" style={{ gap: '6px', alignItems: 'center' }}><Users size={16} /> {formatCount(novel.followersCount)} <span className="meta" style={{fontSize: '10px'}}>Followers</span></span>
                      </div>
                    </div>

                    <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                      <button
                        className="btn glass-panel glow-border"
                        style={{ background: 'var(--indigo-pulse)', color: '#fff', border: 'none', padding: 'var(--space-2) var(--space-6)', fontSize: 'var(--text-base)', boxShadow: 'var(--shadow-glow)' }}
                        disabled={!firstChapter}
                        onClick={() => {
                          if (novel.lastReadChapterId) {
                            navigate(`/reader/chapter/${novel.lastReadChapterId}?novel=${id}`)
                          } else if (firstChapter) {
                            navigate(`/reader/chapter/${firstChapter.id}?novel=${id}`)
                          }
                        }}
                      >
                        {novel.lastReadChapterId ? 'Resume Reading' : firstChapter ? 'Start Reading' : 'No Chapters Yet'}
                      </button>
                      <button
                        className="btn glass-panel"
                        style={{ padding: 'var(--space-2) var(--space-6)', color: 'var(--fg-2)', border: '1px solid var(--border-soft)' }}
                        disabled={toggleFollow.isPending}
                        onClick={() => toggleFollow.mutate(id)}
                      >
                        {toggleFollow.isPending ? 'Saving...' : novel.isFollowing ? 'Remove from Library' : 'Add to Library'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter list */}
              <div className="stack" style={{ marginTop: 'var(--space-4)' }}>
                <h2 className="glow-text-indigo">Chapters</h2>
                <div className="glass-panel" style={{ padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
                  {publishedChapters.map((ch, idx) => {
                    const isRead = novel.lastReadChapter && ch.number <= novel.lastReadChapter;
                    const isNext = novel.lastReadChapter ? ch.number === novel.lastReadChapter + 1 : idx === 0;
                    
                    return (
                      <Link
                        key={ch.id}
                        to={`/reader/chapter/${ch.id}?novel=${id}`}
                        className="row-between interactive-node"
                        style={{ 
                          textDecoration: 'none', 
                          padding: 'var(--space-3) var(--space-4)',
                          borderBottom: idx !== publishedChapters.length - 1 ? '1px solid var(--border-soft)' : 'none',
                          color: isRead ? 'var(--muted)' : 'var(--fg)',
                          background: isNext ? 'rgba(255, 198, 92, 0.05)' : 'transparent',
                          transition: 'background 0.3s ease'
                        }}
                      >
                        <div className="row" style={{ gap: 'var(--space-4)' }}>
                          <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                            {isRead ? (
                               <ShieldCheck size={18} color="var(--success)" style={{ filter: 'drop-shadow(0 0 5px var(--success))' }} />
                            ) : isNext ? (
                               <Activity size={18} color="var(--amber-glow)" style={{ filter: 'drop-shadow(0 0 5px var(--amber-glow))' }} />
                            ) : (
                               <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--border)' }}></div>
                            )}
                          </div>
                          <div>
                            <span style={{ fontWeight: isNext ? 600 : 400, color: isNext ? 'var(--amber-glow)' : 'inherit', fontFamily: 'var(--font-reading)', fontSize: 'var(--text-lg)' }}>
                              Chapter {ch.number}: {ch.title}
                            </span>
                            {ch.publishedAt && (
                              <p className="meta" style={{ marginTop: 'var(--space-1)', fontSize: '11px' }}>
                                Published: {formatRelativeDate(ch.publishedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid var(--border-soft)' }}>
                          {ch.wordCount?.toLocaleString()} words
                        </span>
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
              <div className="glass-panel stack" style={{ padding: 'var(--space-4)' }}>
                <h3 className="glow-text-amber" style={{ fontSize: 'var(--text-lg)' }}>Author Details</h3>
                <div className="row" style={{ gap: 'var(--space-3)', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface-warm)', border: '2px solid var(--amber-glow)', boxShadow: '0 0 10px rgba(255, 198, 92, 0.2)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--fg-2)', margin: 0 }}>{novel.authorName}</p>
                    <p className="meta" style={{ margin: 0, marginTop: '2px' }}>{formatCount(novel.followersCount)} followers</p>
                  </div>
                </div>
                <button className="btn glass-panel glow-border" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-3)', padding: 'var(--space-2)' }}>
                  View Author Profile
                </button>
              </div>

              <div className="glass-panel stack" style={{ padding: 'var(--space-4)' }}>
                <h3 className="glow-text-indigo" style={{ fontSize: 'var(--text-lg)' }}>Novel Details</h3>
                <div className="stack" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-2)' }}>
                    <span className="meta">Status</span>
                    <StatusBadge status={novel.status} />
                  </div>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-2)' }}>
                    <span className="meta">Total Chapters</span>
                    <span style={{ fontWeight: 600, color: 'var(--fg-2)' }}>{novel.chapterCount} Chapters</span>
                  </div>
                  <div className="row-between">
                    <span className="meta">Primary Genre</span>
                    <span style={{ fontWeight: 600, color: 'var(--fg-2)' }}>{novel.genre?.[0]}</span>
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
