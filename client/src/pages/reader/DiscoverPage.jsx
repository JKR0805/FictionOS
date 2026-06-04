import { useState } from 'react'
import { useNovels } from '@/hooks/useNovels'
import { NovelCard } from '@/components/shared/NovelCard'
import { NovelCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { DISCOVER_GENRES } from '@/data/mockData'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function DiscoverPage() {
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const { data: novels, isLoading } = useNovels({ genre: activeGenre, search })

  return (
    <section className="section">
      <div className="container stack-lg">
        {/* Header */}
        <div>
          <h1>Discover</h1>
          <p className="lead" style={{ marginTop: 'var(--space-2)' }}>
            Find your next serial obsession.
          </p>
        </div>



        {/* Search + Filter bar */}
        <div className="row" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}
            />
            <input
              type="search"
              className="field"
              placeholder="Search novels, authors, genres…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                minHeight: '44px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                paddingLeft: '2.5rem',
                paddingRight: 'var(--space-3)',
                background: 'var(--surface)',
                color: 'var(--fg)',
                fontSize: 'var(--text-sm)',
              }}
            />
          </div>
          <button
            className="btn"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Genre chips */}
        <div
          className="tabs"
          role="tablist"
          aria-label="Genre filter"
          style={{ alignSelf: 'flex-start' }}
        >
          {DISCOVER_GENRES.map((genre) => (
            <button
              key={genre}
              className={`tab${activeGenre === genre ? ' is-active' : ''}`}
              role="tab"
              aria-selected={activeGenre === genre}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Advanced filters (collapsible) */}
        {showFilters && (
          <div className="card card-pad grid-2" style={{ gap: 'var(--space-6)' }}>
            <div className="field">
              <label>Status</label>
              <select>
                <option value="">Any</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="hiatus">Hiatus</option>
              </select>
            </div>
            <div className="field">
              <label>Sort by</label>
              <select>
                <option>Most Reads</option>
                <option>Recently Updated</option>
                <option>Newest</option>
                <option>Most Followed</option>
              </select>
            </div>
          </div>
        )}

        {/* Results grid */}
        {isLoading ? (
          <div className="grid-cards">
            {[...Array(8)].map((_, i) => <NovelCardSkeleton key={i} />)}
          </div>
        ) : novels?.length === 0 ? (
          <EmptyState
            icon={<Search size={24} />}
            title="No results found"
            description={`No novels match "${search || activeGenre}". Try a different search.`}
            action={
              <button className="btn btn-ghost" onClick={() => { setSearch(''); setActiveGenre('All') }}>
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="grid-cards">
            {novels?.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        )}

        {/* Recently Updated Shelf (Bottom) */}
        {!isLoading && novels?.length > 0 && (
          <div className="stack" style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
            <h2>Recently Updated</h2>
            <div className="shelf">
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
