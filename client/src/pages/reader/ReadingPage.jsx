import { useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useChapter, useChapters, useMarkAsRead } from '@/hooks/useNovels'
import { useReaderStore } from '@/stores/readerStore'
import { useThemeStore } from '@/stores/themeStore'
import { Skeleton } from '@/components/ui/Skeleton'
import { Settings } from 'lucide-react'

const THEMES = [
  { key: 'light', label: 'Light', bg: '#ffffff', fg: '#111827', border: '#e5e7eb' },
  { key: 'dark', label: 'Dark', bg: '#0b0d10', fg: '#f3f4f6', border: '#272b33' },
  { key: 'sepia', label: 'Sepia', bg: '#fbf5e6', fg: '#433422', border: '#e0d0b6' },
  { key: 'midnight', label: 'Navy', bg: '#0a1626', fg: '#c5d0de', border: '#16263b' },
]

export default function ReadingPage() {
  const { id: chapterId } = useParams()
  const [searchParams] = useSearchParams()
  const novelId = searchParams.get('novel') || 'novel-1'

  const { data: chapter, isLoading } = useChapter(chapterId, novelId)
  const { data: allChapters } = useChapters(novelId)
  const markAsRead = useMarkAsRead()
  const { fontSize, setFontSize } = useReaderStore()
  const { theme, setTheme } = useThemeStore()
  const navigate = useNavigate()

  // Compute next/prev chapters
  const publishedChapters = allChapters?.filter(c => c.status === 'published') || []
  const currentIndex = publishedChapters.findIndex(c => c.id === chapterId)
  const prevChapter = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < publishedChapters.length - 1 ? publishedChapters[currentIndex + 1] : null

  useEffect(() => {
    if (chapterId && novelId) {
      markAsRead.mutate({ novelId, chapterId })
    }
  }, [chapterId, novelId])

  if (isLoading) {
    return (
      <div className="container reader-layout">
        <aside className="reader-rail"><Skeleton style={{ height: '200px' }} /></aside>
        <article className="reader-article"><Skeleton style={{ height: '400px' }} /></article>
        <aside className="reader-rail"><Skeleton style={{ height: '300px' }} /></aside>
      </div>
    )
  }

  return (
    <main>
      <div className="container reader-layout">
        {/* Left rail — chapter outline */}
        <aside className="reader-rail" aria-label="Chapter navigation">
          <div className="card card-pad stack">
            <span className="meta">The Glass Archive</span>
            <h3>Chapter {chapter?.number}</h3>
            <div className="progress-track" aria-label="Reading progress">
              <div className="progress-fill" style={{ '--progress': '42%' }} />
            </div>
            <p className="body-sm">Continue from the quiet index scene.</p>
          </div>
          <div className="card card-pad stack">
            <h4>Chapter outline</h4>
            {['Opening ledger', 'South stack', 'Witness note'].map((s, i) => (
              <span key={s} className={`side-link${i === 0 ? ' is-active' : ''}`}>{s}</span>
            ))}
          </div>
        </aside>

        {/* Article */}
        <article
          className="reader-article"
          data-reader-article
          data-size={fontSize}
          aria-label="Chapter content"
        >
          <p className="eyebrow">The Glass Archive</p>
          <div className="chapter-title">
            <h1>{chapter?.title || 'The Quiet Index'}</h1>
            <p className="lead" style={{ marginTop: 'var(--space-3)' }}>
              Chapter {chapter?.number} of a weekly civic mystery serial.
            </p>
          </div>
          {chapter?.content ? (
            <div 
              className="chapter-content tiptap"
              dangerouslySetInnerHTML={{ __html: chapter.content }} 
              style={{ marginTop: 'var(--space-6)' }}
            />
          ) : (
            <p>The archive opened at eight, but the index room had already been unlocked…</p>
          )}

          <div className="row-between" style={{ marginTop: 'var(--space-8)' }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => prevChapter && navigate(`/reader/chapter/${prevChapter.id}?novel=${novelId}`)}
              disabled={!prevChapter}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => nextChapter && navigate(`/reader/chapter/${nextChapter.id}?novel=${novelId}`)}
              disabled={!nextChapter}
            >
              Next →
            </button>
          </div>
        </article>

        {/* Right rail — display controls */}
        <aside className="reader-rail reader-controls" aria-label="Display settings">
          <div className="card card-pad stack" style={{ gap: 'var(--space-5)' }}>
            <div className="row-between">
              <h3>Display</h3>
              <button className="btn btn-ghost btn-icon" aria-label="More settings">
                <Settings size={18} />
              </button>
            </div>

            <div className="stack" style={{ gap: 'var(--space-2)' }}>
              <label className="meta">Text Size</label>
              <div className="tabs" aria-label="Text size" style={{ display: 'flex' }}>
                {[
                  { key: 'small', label: 'Aa', fontSize: '13px' },
                  { key: 'base', label: 'Aa', fontSize: '15px' },
                  { key: 'large', label: 'Aa', fontSize: '18px' },
                ].map((s) => (
                  <button
                    key={s.key}
                    className={`tab${fontSize === s.key ? ' is-active' : ''}`}
                    type="button"
                    aria-selected={fontSize === s.key}
                    onClick={() => setFontSize(s.key)}
                    style={{ flex: 1, fontSize: s.fontSize }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="stack" style={{ gap: 'var(--space-2)' }}>
              <label className="meta">Theme</label>
              <div className="grid-2" style={{ gap: 'var(--space-2)' }}>
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    className="btn"
                    type="button"
                    aria-pressed={theme === t.key}
                    onClick={() => setTheme(t.key)}
                    style={{
                      background: t.bg,
                      color: t.fg,
                      borderColor: theme === t.key ? t.fg : t.border,
                      fontWeight: 500,
                      boxShadow: theme === t.key ? 'var(--focus-ring)' : 'none',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card card-pad stack">
            <span className="badge badge-muted">Context</span>
            <h3>Codex beside the chapter</h3>
            <div className="chapter-list">
              {[
                { name: 'Mira Vale', type: 'Character' },
                { name: 'Index room', type: 'Place' },
                { name: 'Ledger 17', type: 'Object' },
              ].map((item) => (
                <div key={item.name} className="chapter-item">
                  <span>{item.name}</span>
                  <span className="meta">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
