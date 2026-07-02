import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useNovels } from '@/hooks/useNovels'
import { NovelCard } from '@/components/shared/NovelCard'
import { formatCount, getInitials } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const { data: novels } = useNovels()
  const [activeTab, setActiveTab] = useState('reader')

  // Safely fallback if user isn't loaded
  if (!user) return null

  // Safely format username and display name
  const displayName = user.displayName || user.email?.split('@')[0] || 'User'
  const username = user.email?.split('@')[0] || 'user'
  const initials = getInitials(displayName)
  
  // Use user data if available, otherwise fallback to mock-like defaults
  const stats = {
    chaptersRead: user.chaptersRead || 142,
    streak: user.streakDays || 12,
    currentlyReading: user.currentlyReading || 3,
    readingTimeHours: user.readingTimeHours || 320,
    followers: 12500,
    totalViews: 420000,
    totalReads: 210000,
  }

  // Find novels this user has authored
  const authorNovels = novels?.filter(n => n.authorId === user.id) || []

  return (
    <div>
      <section className="section" data-od-id="profile-header">
        <div className="container stack-lg">
          <div className="profile-header" style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div
              style={{
                width: 'clamp(80px, 15vw, 112px)',
                height: 'clamp(80px, 15vw, 112px)',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--accent)',
                color: 'var(--accent-on)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 'clamp(var(--text-xl), 4vw, var(--text-2xl))',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-3xl))', marginBottom: 'var(--space-1)' }}>{displayName}</h1>
              <p className="body-sm meta" style={{ marginBottom: 'var(--space-3)' }}>
                @{username} • Joined Oct 2025
              </p>
              <p style={{ maxWidth: '700px', marginBottom: 'var(--space-4)' }}>
                {user.bio || 'Voracious reader of science fiction and fantasy. I leave detailed reviews for stories that keep me up past 3 AM. I also write suspenseful urban fantasy.'}
              </p>
              <div className="row" style={{ gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <a href="#" className="row" style={{ gap: 'var(--space-2)', color: 'var(--fg)', textDecoration: 'underline' }}><span className="meta">{username}.com</span></a>
                <a href="#" className="row" style={{ gap: 'var(--space-2)', color: 'var(--fg)', textDecoration: 'underline' }}><span className="meta">Twitter</span></a>
              </div>
            </div>
            <button className="btn edit-btn" style={{ flexShrink: 0 }}>Edit Profile</button>
          </div>
          
          {/* Tabs */}
          <div className="tabs" style={{ marginTop: 'var(--space-4)', width: 'fit-content', maxWidth: '100%' }}>
            <button
              className={`tab ${activeTab === 'reader' ? 'is-active' : ''}`}
              aria-selected={activeTab === 'reader'}
              onClick={() => setActiveTab('reader')}
            >
              Reader
            </button>
            <button
              className={`tab ${activeTab === 'author' ? 'is-active' : ''}`}
              aria-selected={activeTab === 'author'}
              onClick={() => setActiveTab('author')}
            >
              Author
            </button>
          </div>
        </div>
      </section>

      {/* READER TAB */}
      {activeTab === 'reader' && (
        <section id="tab-reader" className="section" style={{ paddingTop: 0 }}>
          <div className="container grid-main">
            <div className="stack-lg">
              <div className="grid-4">
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{stats.chaptersRead}</div>
                  <div className="body-sm meta">Chapters</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{stats.streak}</div>
                  <div className="body-sm meta">Day Streak</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{stats.currentlyReading}</div>
                  <div className="body-sm meta">Books</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{stats.readingTimeHours}h</div>
                  <div className="body-sm meta">Hours Read</div>
                </div>
              </div>

              <div className="stack">
                <div className="row-between">
                  <h2>Favorites Shelf</h2>
                  <a href="#" className="body-sm meta">View all</a>
                </div>
                <div className="shelf">
                  {novels?.slice(0, 3).map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </div>
              </div>

              <div className="stack" style={{ marginTop: 'var(--space-6)' }}>
                <div className="row-between">
                  <h2>Completed</h2>
                  <a href="#" className="body-sm meta">View all</a>
                </div>
                <div className="shelf">
                  {novels?.slice(3, 4).map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="stack-lg">
              <div className="card card-pad stack">
                <h3>Reader Activity</h3>
                <div className="chapter-list">
                  <div className="chapter-item" style={{ border: 'none', padding: 'var(--space-3) 0' }}>
                    <span className="body-sm">Finished reading Chapter 23 of <strong>The Glass Archive</strong></span>
                    <p className="meta" style={{ fontSize: '11px' }}>2 hours ago</p>
                  </div>
                  <div className="chapter-item" style={{ border: 'none', padding: 'var(--space-3) 0' }}>
                    <span className="body-sm">Reviewed <strong>Marrow City</strong> (5 stars)</span>
                    <p className="meta" style={{ fontSize: '11px' }}>Yesterday</p>
                  </div>
                </div>
              </div>

              <div className="card card-pad stack">
                <h3>Following</h3>
                <div className="chapter-list">
                  <div className="chapter-item" style={{ border: 'none', padding: 'var(--space-2) 0', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-pill)', background: 'var(--border)' }} />
                    <div>
                      <span className="body-sm" style={{ fontWeight: 500 }}>Elena Rostova</span>
                      <p className="meta" style={{ fontSize: '11px' }}>Author</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* AUTHOR TAB */}
      {activeTab === 'author' && (
        <section id="tab-author" className="section" style={{ paddingTop: 0 }}>
          <div className="container grid-main">
            <div className="stack-lg">
              <div className="grid-4">
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{formatCount(stats.followers)}</div>
                  <div className="body-sm meta">Followers</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{formatCount(stats.totalViews)}</div>
                  <div className="body-sm meta">Total Views</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{formatCount(stats.totalReads)}</div>
                  <div className="body-sm meta">Total Reads</div>
                </div>
                <div className="card card-pad stack" style={{ gap: 'var(--space-1)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 500 }}>{authorNovels.length}</div>
                  <div className="body-sm meta">Published Works</div>
                </div>
              </div>

              <div className="stack">
                <h2>Published Works</h2>
                <div className="shelf">
                  {authorNovels.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} showStats />
                  ))}
                  {authorNovels.length === 0 && (
                    <p className="meta body-sm">No published works yet.</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="stack-lg">
              <div className="card card-pad stack">
                <h3>Author Activity</h3>
                <div className="chapter-list">
                  <div className="chapter-item" style={{ border: 'none', padding: 'var(--space-3) 0' }}>
                    <span className="body-sm">Released Chapter 24 of <strong>The Glass Archive</strong></span>
                    <p className="meta" style={{ fontSize: '11px' }}>Today</p>
                  </div>
                  <div className="chapter-item" style={{ border: 'none', padding: 'var(--space-3) 0' }}>
                    <span className="body-sm">Reached <strong>10,000 Followers</strong> milestone!</span>
                    <p className="meta" style={{ fontSize: '11px' }}>Oct 12</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </div>
  )
}
