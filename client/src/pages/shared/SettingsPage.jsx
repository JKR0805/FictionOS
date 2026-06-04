import { useState } from 'react'
import { useThemeStore } from '@/stores/themeStore'

const THEMES = [
  { key: 'system', label: 'System default' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
]

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore()
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div className="stack-lg">
          <div>
            <p className="eyebrow">Account</p>
            <h1>Settings</h1>
          </div>

          {/* Profile section */}
          <div className="card card-pad stack-lg">
            <h3>Profile</h3>
            <form className="stack" onSubmit={handleSave}>
              <div className="field">
                <label htmlFor="displayName">Display name</label>
                <input id="displayName" type="text" defaultValue="John Doe" />
              </div>
              <div className="field">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" defaultValue="johndoe" />
              </div>
              <div className="field">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" rows={3} defaultValue="Serial fiction reader." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                {saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Appearance */}
          <div className="card card-pad stack-lg">
            <h3>Appearance</h3>
            <div className="field">
              <label>Theme</label>
              <div className="tabs" style={{ alignSelf: 'flex-start' }}>
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`tab${theme === t.key ? ' is-active' : ''}`}
                    aria-selected={theme === t.key}
                    onClick={() => setTheme(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card card-pad stack-lg">
            <h3>Notifications</h3>
            <div className="stack" style={{ gap: 'var(--space-3)' }}>
              {[
                'New chapter from followed novels',
                'Author announcements',
                'Reply notifications',
              ].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }} id={label} />
                  <label htmlFor={label} className="body-sm">{label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="card card-pad stack-lg" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ color: 'var(--danger)', margin: 0 }}>Danger Zone</h3>
            <p className="body-sm" style={{ marginTop: 'var(--space-2)' }}>
              Deleting your account will permanently remove all your data. This action cannot be undone.
            </p>
            <button className="btn" style={{ color: 'var(--danger)', borderColor: 'var(--danger)', width: 'fit-content' }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
