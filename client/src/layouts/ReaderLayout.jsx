import { Outlet, Link, NavLink } from 'react-router-dom'
import { UserDropdown } from '@/components/shared/UserDropdown'

export function ReaderLayout() {
  return (
    <div className="shell">
      <header className="topnav">
        <div className="container topnav-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">FO</span>
            <span>FictionOS</span>
          </Link>
          <nav className="navlinks">
            <NavLink to="/reader" end>Library</NavLink>
            <NavLink to="/reader/discover">Discover</NavLink>
          </nav>
          <UserDropdown />
        </div>
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
