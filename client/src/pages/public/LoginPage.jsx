import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmail } from '@/services/auth'
import { useAuthStore } from '@/stores/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  // Ensure we fallback to '/reader' exactly as requested
  const from = location.state?.from?.pathname || '/reader'
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      navigate('/reader', { replace: true })
    }
  }, [user, navigate])
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmail(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 'var(--space-6) var(--space-4)' }}>
      <div className="card card-pad stack-lg" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="brand-mark" style={{ margin: '0 auto var(--space-4) auto', width: '40px', height: '40px', fontSize: 'var(--text-base)' }}>FO</div>
          <h1 style={{ fontSize: 'var(--text-xl)' }}>Welcome back</h1>
          <p className="body-sm meta">Log in to your account to continue</p>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <div className="row-between">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="body-sm meta" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}
          >
            {loading ? 'Signing in…' : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p className="body-sm meta">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--fg)', fontWeight: 500 }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
