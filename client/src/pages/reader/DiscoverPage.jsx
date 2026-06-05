import { useState } from 'react'
import { useNovels } from '@/hooks/useNovels'
import { NovelCard } from '@/components/shared/NovelCard'
import { NovelCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { DISCOVER_GENRES } from '@/data/mockData'
import { Search, SlidersHorizontal, Activity } from 'lucide-react'

// Optional SVG background for the discovery space
const DiscoveryBackdrop = () => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    viewBox="0 0 1000 1000" 
    preserveAspectRatio="xMidYMid slice"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M-200,500 C300,400 400,600 1200,300" stroke="var(--indigo-pulse)" strokeWidth="1" />
    <path d="M-100,200 C200,300 400,100 1000,500" stroke="var(--amber-glow)" strokeWidth="1" />
    <circle cx="200" cy="450" r="100" fill="var(--indigo-pulse)" opacity="0.05" />
    <circle cx="800" cy="350" r="150" fill="var(--amber-glow)" opacity="0.05" />
  </svg>
)

export default function DiscoverPage() {
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const { data: novels, isLoading } = useNovels({ genre: activeGenre, search })

  return (
    <section className="section flush-top bg-cinematic" style={{ position: 'relative', minHeight: '100vh' }}>
      <DiscoveryBackdrop />
      <div className="container stack" style={{ position: 'relative', zIndex: 10, paddingTop: 'var(--space-4)'  }}>
        {/* Header */}
        <div>
          <p className="eyebrow glow-text-indigo">Discover</p>
          <h1 style={{ fontFamily: 'var(--font-reading)', margin: 0, color: 'var(--fg-2)', lineHeight: 1.1 }}>Find Novels</h1>
          <p className="lead" style={{ marginTop: 'var(--space-2)', color: 'var(--fg-2)' }}>
            Search the library. Find your next serial obsession.
          </p>
        </div>

        {/* System Query (Search + Filter) */}
        <div className="glass-panel glow-border" style={{ padding: 'var(--space-4)' }}>
          <div className="row" style={{ gap: 'var(--space-3)' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--indigo-pulse)', pointerEvents: 'none' }}
              />
              <input
                type="search"
                placeholder="Search novels, authors, genres…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  border: '1px solid var(--border-soft)',
                  borderRadius: 'var(--radius-sm)',
                  paddingLeft: '3rem',
                  paddingRight: 'var(--space-4)',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'var(--fg-2)',
                  fontSize: 'var(--text-base)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--indigo-pulse)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-soft)'}
              />
            </div>
            <button
              className="btn glass-panel"
              style={{ minHeight: '48px', padding: '0 var(--space-4)', color: 'var(--fg-2)' }}
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={18} style={{ marginRight: '8px' }} />
              Parameters
            </button>
          </div>

          {/* Advanced filters (collapsible) */}
          {showFilters && (
            <div className="grid-2" style={{ gap: 'var(--space-6)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-soft)' }}>
              <div className="field stack" style={{ gap: 'var(--space-2)' }}>
                <label className="meta">Status</label>
                <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-soft)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', color: 'var(--fg-2)' }}>
                  <option value="">Any</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="hiatus">Hiatus</option>
                </select>
              </div>
              <div className="field stack" style={{ gap: 'var(--space-2)' }}>
                <label className="meta">Sort By</label>
                <select style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-soft)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', color: 'var(--fg-2)' }}>
                  <option>Most Popular</option>
                  <option>Recently Updated</option>
                  <option>Newest Arrivals</option>
                  <option>Most Followed</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Genre Clusters */}
        <div style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {DISCOVER_GENRES.map((genre) => {
             const isActive = activeGenre === genre;
             return (
              <button
                key={genre}
                className={`btn interactive-node ${isActive ? 'glow-border' : ''}`}
                style={{
                  background: isActive ? 'rgba(93, 63, 211, 0.2)' : 'rgba(31, 40, 51, 0.4)',
                  border: isActive ? '1px solid var(--indigo-pulse)' : '1px solid var(--border-soft)',
                  color: isActive ? 'var(--fg-2)' : 'var(--muted)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-pill)',
                  backdropFilter: 'blur(4px)',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none'
                }}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveGenre(genre)}
              >
                {isActive && <Activity size={12} style={{ marginRight: '6px', display: 'inline-block', color: 'var(--amber-glow)' }} />}
                {genre}
              </button>
            )
          })}
        </div>

        {/* Results grid */}
        {isLoading ? (
          <div className="grid-cards">
            {[...Array(8)].map((_, i) => <NovelCardSkeleton key={i} />)}
          </div>
        ) : novels?.length === 0 ? (
          <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
              <EmptyState
                icon={<Search size={32} color="var(--amber-glow)" />}
                title="No novels found"
                description={`The search for "${search || activeGenre}" returned no results. Adjust your parameters.`}
                action={
                  <button className="btn glow-border" onClick={() => { setSearch(''); setActiveGenre('All') }}>
                    Reset Search
                  </button>
                }
              />
          </div>
        ) : (
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-6)' }}>
            {novels?.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        )}

        {/* Recently Updated Shelf (Bottom) */}
        {!isLoading && novels?.length > 0 && (
          <div className="stack" style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-soft)' }}>
            <h2 className="glow-text-amber" style={{ fontSize: 'var(--text-2xl)' }}>Popular Novels</h2>
            <div className="shelf" style={{ gridAutoColumns: '180px', gap: 'var(--space-6)' }}>
              {novels.slice(0, 4).map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
