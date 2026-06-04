import { Link } from 'react-router-dom'
import { useNovels, useFollowing } from '@/hooks/useNovels'
import { NovelCard } from '@/components/shared/NovelCard'
import { NovelCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { Users } from 'lucide-react'
import { NovelCover } from '@/components/shared/NovelCover'

export default function ReaderHomePage() {
  const { data: novels } = useNovels()
  const { data: following, isLoading: followingLoading } = useFollowing()

  const recommendedNovels = novels && novels.length > 2 ? novels.slice(2, 4) : novels || []

  return (
    <section className="section">
      <div className="container" style={{ marginBottom: 'var(--space-8)' }}>
        <h1>Reader Home</h1>
      </div>
      <div className="container grid-main">
        {/* Main column */}
        <div className="stack-lg">

          {/* Following */}
          <div className="stack">
            <h3>Library</h3>
            {followingLoading ? (
              <div className="shelf">
                {[0, 1].map((i) => <NovelCardSkeleton key={i} />)}
              </div>
            ) : following?.length > 0 ? (
              <div className="shelf">
                {following.map((novel) => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Users size={24} />}
                title="Your library is empty"
                description="Follow novels to add them to your library."
                action={<Link to="/reader/discover" className="btn btn-ghost">Discover stories</Link>}
              />
            )}
          </div>
        </div>

        {/* Aside */}
        <aside className="stack-lg" style={{ position: 'sticky', top: '80px' }}>
          {/* Recommended Reads */}
          <div className="stack recommended-reads">
            <div className="row-between" style={{ alignItems: 'baseline' }}>
              <h3>Recommended Reads</h3>
            </div>
            <p className="body-sm meta" style={{ marginTop: 'calc(-1 * var(--space-2))' }}>Based on your library</p>
            <div className="chapter-list">
              {recommendedNovels.map((novel) => (
                <Link key={novel.id} to={`/reader/novel/${novel.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="chapter-item">
                    <NovelCover title={novel.title} novelId={novel.id} coverUrl={novel.coverUrl} width="40px" height="54px" style={{ fontSize: '8px' }} />
                    <div>
                      <h4>{novel.title}</h4>
                      <p className="meta">Trending in {novel.genre?.[0]}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <Link to="/reader/discover" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center', marginTop: 'var(--space-2)' }}>
              Browse all recommendations
            </Link>
          </div>

        </aside>
      </div>
    </section>
  )
}
