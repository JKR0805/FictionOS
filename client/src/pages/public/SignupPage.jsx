import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpWithEmail } from '@/services/auth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await signUpWithEmail(email, password)
      navigate('/verify-email')
    } catch (err) {
      setError(err.message || 'Failed to create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 'var(--space-6) var(--space-4)' }}>
      <div className="card card-pad stack-lg" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="brand-mark" style={{ margin: '0 auto var(--space-4) auto', width: '40px', height: '40px', fontSize: 'var(--text-base)' }}>FO</div>
          <h1 style={{ fontSize: 'var(--text-xl)' }}>Create your account</h1>
          <p className="body-sm meta">Join FictionOS — free to read and publish.</p>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="At least 8 characters" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" placeholder="••••••••" required value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p className="body-sm meta">
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--fg)', fontWeight: 500 }}>Log in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
