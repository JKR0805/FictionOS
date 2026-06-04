import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--bg)',
        }}
      >
        <div className="stack" style={{ alignItems: 'center', gap: 'var(--space-3)' }}>
          <div
            className="brand-mark"
            style={{ width: '40px', height: '40px', fontSize: 'var(--text-base)', opacity: 0.6 }}
          >
            FO
          </div>
          <p className="meta">Loading…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
