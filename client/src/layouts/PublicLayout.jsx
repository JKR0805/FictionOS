import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { Menu, X } from 'lucide-react'

export function PublicLayout() {
  const { user } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="shell">
      <header className="topnav">
        <div className="container topnav-inner">
          <Link className="brand" to="/" onClick={closeMobile}>
            <span className="brand-mark">FO</span>
            <span>FictionOS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navlinks" aria-label="Primary navigation">
            <a href="/reader/discover">Discover</a>
            <a href="/#for-readers">For Readers</a>
            <a href="/#for-authors">For Authors</a>
          </nav>

          {/* Desktop CTAs */}
          <div className="nav-cta desktop-only">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <UserDropdown />
              </div>
            ) : (
              <>
                <Link to="/login" className="body-sm" style={{ fontWeight: 500, color: 'var(--fg)' }}>
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="btn glow-border"
                  style={{ background: 'var(--indigo-pulse)', color: '#fff', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-pill)', border: 'none' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile: if logged in show dropdown, else show hamburger */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {user && <UserDropdown />}
            <button
              className="mobile-menu-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <nav className={`mobile-nav-drawer${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
          <a href="/reader/discover" onClick={closeMobile}>Discover</a>
          <a href="/#for-readers" onClick={closeMobile}>For Readers</a>
          <a href="/#for-authors" onClick={closeMobile}>For Authors</a>

          {!user && (
            <>
              <div className="nav-divider" />
              <div className="nav-cta-mobile">
                <Link
                  to="/login"
                  className="btn"
                  style={{ justifyContent: 'center', color: 'var(--fg)' }}
                  onClick={closeMobile}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="btn"
                  style={{ justifyContent: 'center', background: 'var(--indigo-pulse)', color: '#fff', border: 'none' }}
                  onClick={closeMobile}
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="pagefoot">
        <div className="container footer-grid">
          <div className="footer-brand stack" style={{ gap: 'var(--space-2)' }}>
            <Link className="brand" to="/" style={{ marginBottom: 'var(--space-1)' }}>
              <span className="brand-mark">FO</span>
              <span>FictionOS</span>
            </Link>
            <span className="body-sm" style={{ maxWidth: '300px', lineHeight: 1.6 }}>A modern platform for reading and publishing serial fiction.</span>
          </div>
          <div className="stack" style={{ gap: 'var(--space-2)', alignContent: 'start' }}>
            <span className="body-sm" style={{ fontWeight: 600, color: 'var(--fg-2)', marginBottom: 'var(--space-1)' }}>Platform</span>
            <Link to="/reader/discover" className="body-sm" style={{ textDecoration: 'none' }}>Discover</Link>
            <a href="/#features" className="body-sm" style={{ textDecoration: 'none' }}>Features</a>
            <a href="/#for-readers" className="body-sm" style={{ textDecoration: 'none' }}>For Readers</a>
            <a href="/#for-authors" className="body-sm" style={{ textDecoration: 'none' }}>For Authors</a>
          </div>
          <div className="stack" style={{ gap: 'var(--space-2)', alignContent: 'start' }}>
            <span className="body-sm" style={{ fontWeight: 600, color: 'var(--fg-2)', marginBottom: 'var(--space-1)' }}>Account</span>
            <Link to="/login" className="body-sm" style={{ textDecoration: 'none' }}>Log In</Link>
            <Link to="/signup" className="body-sm" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
