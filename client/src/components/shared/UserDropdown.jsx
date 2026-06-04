import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { signOut } from '@/services/auth'
import { getInitials } from '@/lib/utils'

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Account'
  const initials = getInitials(displayName)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          cursor: 'pointer',
          border: 0,
          background: 'transparent',
          padding: 0,
        }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--accent)',
            color: 'var(--accent-on)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
          }}
        >
          {initials}
        </div>
        <span className="body-sm" style={{ fontWeight: 500 }}>
          {displayName}
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--space-2))',
            right: 0,
            width: '220px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--elev-raised)',
            padding: 'var(--space-1)',
            zIndex: 50,
          }}
          role="menu"
        >
          <div style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-1)' }}>
            <p className="body-sm" style={{ fontWeight: 500 }}>{displayName}</p>
            <p className="body-sm meta">{user?.email}</p>
          </div>

          <DropdownLink to="/profile" onClick={() => setOpen(false)}>Profile</DropdownLink>
          <Divider />
          <DropdownLink to="/reader" onClick={() => setOpen(false)}>Reader Mode</DropdownLink>
          <DropdownLink to="/author" onClick={() => setOpen(false)}>Author Mode</DropdownLink>
          <Divider />
          <DropdownLink to="/settings" onClick={() => setOpen(false)}>Settings</DropdownLink>
          <Divider />
          <button
            className="btn btn-ghost"
            onClick={handleSignOut}
            style={{ width: '100%', justifyContent: 'flex-start', padding: 'var(--space-1) var(--space-2)', color: 'var(--danger)' }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

function DropdownLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      className="btn btn-ghost"
      onClick={onClick}
      style={{ width: '100%', justifyContent: 'flex-start', padding: 'var(--space-1) var(--space-2)' }}
      role="menuitem"
    >
      {children}
    </Link>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-1) 0' }} />
}
