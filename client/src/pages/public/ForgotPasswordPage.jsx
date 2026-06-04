import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordReset } from '@/services/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 'var(--space-6) var(--space-4)' }}>
      <div className="card card-pad stack-lg" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="brand-mark" style={{ margin: '0 auto var(--space-4) auto', width: '40px', height: '40px', fontSize: 'var(--text-base)' }}>FO</div>
          <h1 style={{ fontSize: 'var(--text-xl)' }}>Reset password</h1>
          <p className="body-sm meta">Enter your email and we'll send a reset link.</p>
        </div>

        {sent ? (
          <div className="empty-state" style={{ borderStyle: 'solid', borderColor: 'color-mix(in oklab, var(--success), transparent 70%)', background: 'color-mix(in oklab, var(--success), transparent 95%)' }}>
            <h3 style={{ color: 'var(--success)' }}>Check your inbox</h3>
            <p>A password reset link has been sent to <strong>{email}</strong>.</p>
            <Link to="/login" className="btn">Back to Login</Link>
          </div>
        ) : (
          <form className="stack" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            {error && <p style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link to="/login" className="body-sm meta" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Back to login
          </Link>
        </div>
      </div>
    </main>
  )
}
