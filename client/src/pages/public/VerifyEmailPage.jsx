import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <main style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 'var(--space-6) var(--space-4)' }}>
      <div className="card card-pad stack-lg" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-8) var(--space-6)', textAlign: 'center' }}>
        <div>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'color-mix(in oklab, var(--fg), transparent 95%)', display: 'grid', placeItems: 'center', margin: '0 auto var(--space-4)' }}>
            <Mail size={24} />
          </div>
          <h1 style={{ fontSize: 'var(--text-xl)' }}>Verify your email</h1>
          <p className="body-sm meta" style={{ marginTop: 'var(--space-2)' }}>
            We've sent a verification link to your email. Click the link to activate your account.
          </p>
        </div>
        <Link to="/login" className="btn btn-primary" style={{ justifyContent: 'center' }}>
          Go to Login
        </Link>
      </div>
    </main>
  )
}
