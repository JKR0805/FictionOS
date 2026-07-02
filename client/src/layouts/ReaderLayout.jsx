import { useState } from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { Menu, X } from 'lucide-react'

export function ReaderLayout() {
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

          {/* Desktop nav links */}
          <nav className="navlinks" aria-label="Reader navigation">
            <NavLink to="/reader" end>Library</NavLink>
            <NavLink to="/reader/discover">Discover</NavLink>
          </nav>

          {/* Desktop user dropdown */}
          <div className="desktop-only">
            <UserDropdown />
          </div>

          {/* Mobile: user + hamburger */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <UserDropdown />
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

        {/* Mobile nav drawer */}
        <nav className={`mobile-nav-drawer${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile reader navigation">
          <NavLink to="/reader" end onClick={closeMobile}>Library</NavLink>
          <NavLink to="/reader/discover" onClick={closeMobile}>Discover</NavLink>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="pagefoot">
        <div className="container footer-row">
          <span>FictionOS</span>
          <span className="meta">Reader Dashboard</span>
        </div>
      </footer>
    </div>
  )
}
