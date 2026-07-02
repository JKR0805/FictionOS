import { Link } from 'react-router-dom'
import { useNovels, useFollowing } from '@/hooks/useNovels'
import { NovelCard } from '@/components/shared/NovelCard'
import { NovelCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { Link as LinkIcon, Compass, Bookmark, Clock } from 'lucide-react'
import { NovelCover } from '@/components/shared/NovelCover'

export default function ReaderHomePage() {
  const { data: novels } = useNovels()
  const { data: following, isLoading: followingLoading } = useFollowing()

  const recommendedNovels = novels && novels.length > 2 ? novels.slice(2, 4) : novels || []

  return (
    <section className="section flush-top bg-cinematic" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Ecosystem Visual Backdrop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M-100,600 C300,500 500,700 1200,400" stroke="url(#glowLineAmber)" strokeWidth="1" />
         <circle cx="200" cy="500" r="100" fill="var(--amber-glow)" opacity="0.05" />
      </svg>

      <div className="container stack-lg" style={{ position: 'relative', zIndex: 10, paddingTop: 'var(--space-4)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <p className="eyebrow glow-text-amber">Reader Dashboard</p>
          <div className="row" style={{ alignItems: 'baseline', gap: 'var(--space-4)' }}>
            <h1 style={{ fontFamily: 'var(--font-reading)', margin: 0, color: 'var(--fg-2)', lineHeight: 1.1 }}>Personal Library</h1>
            <span className="meta">{following?.length || 0} Saved Novels</span>
          </div>
        </div>

        <div className="grid-main" style={{ gap: 'var(--space-8)' }}>
          {/* Main column */}
          <div className="stack-lg" style={{ minWidth: 0 }}>

            {/* Following Library */}
            <div className="stack">
              <h3 className="glow-text-indigo">Continue Reading</h3>
              {followingLoading ? (
                <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                  {[0, 1, 2].map((i) => <NovelCardSkeleton key={i} />)}
                </div>
              ) : following?.length > 0 ? (
                <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                  {following.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
                   <EmptyState
                     icon={<Compass size={32} color="var(--amber-glow)" />}
                     title="Your library is empty"
                     description="Add stories to populate your library."
                     action={<Link to="/reader/discover" className="btn glow-border" style={{ color: 'var(--amber-glow)' }}>Discover Novels</Link>}
                   />
                </div>
              )}
            </div>
          </div>

        {/* Aside — appears below main content on mobile */}
        <aside className="stack-lg" style={{ position: 'sticky', top: '80px' }}>
          {/* Recommended Reads */}
          <div className="glass-panel stack" style={{ padding: 'var(--space-4)' }}>
            <div className="row-between" style={{ alignItems: 'baseline', borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-2)' }}>
              <h3 className="glow-text-amber" style={{ fontSize: 'var(--text-lg)' }}>Recommended Novels</h3>
            </div>
            <p className="meta" style={{ fontSize: '11px', marginTop: 'var(--space-1)' }}>Based on your reading history</p>
            
            <div className="stack" style={{ marginTop: 'var(--space-4)', gap: 'var(--space-4)' }}>
              {recommendedNovels.map((novel) => (
                <Link key={novel.id} to={`/reader/novel/${novel.id}`} className="interactive-node" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <article className="row" style={{ gap: 'var(--space-3)' }}>
                    <NovelCover title={novel.title} novelId={novel.id} coverUrl={novel.coverUrl} width="48px" height="64px" style={{ fontSize: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontFamily: 'var(--font-reading)', fontSize: 'var(--text-lg)', color: 'var(--fg-2)', margin: 0, lineHeight: 1.2 }}>{novel.title}</h4>
                      <p className="meta" style={{ marginTop: '4px', fontSize: '11px' }}>Trending in {novel.genre?.[0]}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            <Link to="/reader/discover" className="btn glass-panel" style={{ width: '100%', textAlign: 'center', marginTop: 'var(--space-4)', border: '1px solid var(--border-soft)', color: 'var(--fg-2)' }}>
              View all recommendations
            </Link>
          </div>
        </aside>
      </div>

      </div>
    </section>
  )
}
