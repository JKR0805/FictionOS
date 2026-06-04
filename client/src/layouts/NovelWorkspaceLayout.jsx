import { Outlet, Link, NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { useUiStore } from '@/stores/uiStore'
import { useNovel } from '@/hooks/useNovels'
import { Menu } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview & Analytics', path: 'overview' },
  { label: 'Chapters', path: 'chapters' },
  { label: 'Version History', path: 'version-history' },
]

const AI_ITEMS = [
  { label: 'Character Intelligence', path: 'character-intelligence' },
  { label: 'Relationship Graph', path: 'relationship-graph' },
  { label: 'Timeline', path: 'timeline' },
  { label: 'Story Codex', path: 'codex' },
  { label: 'Consistency Checker', path: 'consistency' },
]

export function NovelWorkspaceLayout() {
  const { novelId } = useParams()
  const { sidebarOpen, toggleSidebar, closeSidebar } = useUiStore()
  const { data: novel } = useNovel(novelId)

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar()
  }, [novelId, closeSidebar])

  // Close on Escape
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') closeSidebar()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeSidebar])

  return (
    <div className="shell">
      <header className="topnav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container topnav-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              className="btn btn-ghost btn-icon mobile-nav-toggle"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <Link className="brand" to="/">
              <span className="brand-mark">FO</span>
              <span>FictionOS</span>
            </Link>
          </div>
          <div style={{ flex: 1 }} />
          <UserDropdown />
        </div>
      </header>

      <main className="dashboard-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay is-open"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`app-sidebar${sidebarOpen ? ' is-open' : ''}`}
          aria-label="Novel workspace navigation"
        >
          <p className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>
            <Link to="/author" style={{ color: 'inherit', textDecoration: 'none' }}>
              ← My Works
            </Link>
          </p>

          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`/author/novel/${novelId}/${item.path}`}
              className={({ isActive }) => `side-link${isActive ? ' is-active' : ''}`}
              onClick={() => closeSidebar()}
            >
              <span>{item.label}</span>
              {item.path === 'chapters' && novel && (
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
                  {novel.chapterCount}
                </span>
              )}
            </NavLink>
          ))}

          <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-2) 0' }} />
          <p className="eyebrow" style={{ marginBottom: 0 }}>Story Intelligence</p>

          {AI_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`/author/novel/${novelId}/${item.path}`}
              className={({ isActive }) => `side-link${isActive ? ' is-active' : ''}`}
              onClick={() => closeSidebar()}
            >
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-2) 0' }} />
          <NavLink
            to={`/author/novel/${novelId}/settings`}
            className={({ isActive }) => `side-link${isActive ? ' is-active' : ''}`}
            onClick={() => closeSidebar()}
          >
            <span>Settings</span>
          </NavLink>
        </aside>

        {/* Main content */}
        <section className="app-main">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
