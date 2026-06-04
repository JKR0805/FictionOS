import { Outlet, Link } from 'react-router-dom'
import { UserDropdown } from '@/components/shared/UserDropdown'

/**
 * AuthorLayout — used only for /author (dashboard).
 * The sidebar does NOT appear here. It only appears in NovelWorkspaceLayout.
 */
export function AuthorLayout() {
  return (
    <div className="shell">
      <header className="topnav">
        <div className="container topnav-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">FO</span>
            <span>FictionOS</span>
          </Link>
          <div style={{ flex: 1 }} />
          <UserDropdown />
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
