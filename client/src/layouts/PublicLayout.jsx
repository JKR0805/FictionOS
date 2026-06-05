import { Outlet, Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { UserDropdown } from '@/components/shared/UserDropdown'

export function PublicLayout() {
  const { user } = useAuthStore()

  return (
    <div className="shell">
      <header className="topnav">
        <div className="container topnav-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">FO</span>
            <span>FictionOS</span>
          </Link>
          <nav className="navlinks">
            <a href="/reader/discover">Discover</a>
            <a href="/#for-readers">For Readers</a>
            <a href="/#for-authors">For Authors</a>
          </nav>
          <div className="nav-cta">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <UserDropdown />
              </div>
            ) : (
              <>
                <Link to="/login" className="body-sm" style={{ fontWeight: 500, color: 'var(--fg)' }}>
                  Log In
                </Link>
                <Link to="/signup" className="btn glow-border" style={{ background: 'var(--indigo-pulse)', color: '#fff', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-pill)', border: 'none' }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="pagefoot">
        <div className="container footer-row">
          <div className="stack" style={{ gap: 'var(--space-2)' }}>
            <Link className="brand" to="/" style={{ marginBottom: 'var(--space-1)' }}>
              <span className="brand-mark">FO</span>
              <span>FictionOS</span>
            </Link>
            <span className="meta body-sm">A modern platform for reading and publishing serial fiction.</span>
          </div>
          <div className="row" style={{ gap: 'var(--space-12)' }}>
            <div className="stack" style={{ gap: 'var(--space-3)' }}>
              <span className="body-sm" style={{ fontWeight: 600, color: 'var(--fg-2)' }}>Platform</span>
              <Link to="/reader/discover" className="meta body-sm" style={{ textDecoration: 'none' }}>Discover</Link>
              <a href="/#features" className="meta body-sm" style={{ textDecoration: 'none' }}>Features</a>
              <a href="/#for-readers" className="meta body-sm" style={{ textDecoration: 'none' }}>For Readers</a>
              <a href="/#for-authors" className="meta body-sm" style={{ textDecoration: 'none' }}>For Authors</a>
            </div>
            <div className="stack" style={{ gap: 'var(--space-3)' }}>
              <span className="body-sm" style={{ fontWeight: 600, color: 'var(--fg-2)' }}>Account</span>
              <Link to="/login" className="meta body-sm" style={{ textDecoration: 'none' }}>Log In</Link>
              <Link to="/signup" className="meta body-sm" style={{ textDecoration: 'none' }}>Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
