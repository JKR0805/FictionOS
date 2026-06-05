import { useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useChapter, useChapters, useMarkAsRead } from '@/hooks/useNovels'
import { useReaderStore } from '@/stores/readerStore'
import { useThemeStore } from '@/stores/themeStore'
import { Skeleton } from '@/components/ui/Skeleton'
import { Settings, BookOpen, Link as LinkIcon, Disc } from 'lucide-react'

const THEMES = [
  { key: 'light', label: 'Daylight', bg: '#ffffff', fg: '#111827', border: '#e5e7eb' },
  { key: 'dark', label: 'Obsidian', bg: '#050816', fg: '#e2e8f0', border: 'rgba(255,255,255,0.1)' },
  { key: 'sepia', label: 'Parchment', bg: '#1A1614', fg: '#D4C4B7', border: 'rgba(232,220,203,0.1)' },
  { key: 'midnight', label: 'Deep Space', bg: '#030508', fg: '#8A99A8', border: 'rgba(176,196,222,0.05)' },
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
      <div className="container reader-layout" style={{ paddingTop: 'var(--space-8)' }}>
        <aside className="reader-rail"><Skeleton style={{ height: '200px' }} /></aside>
        <article className="reader-article"><Skeleton style={{ height: '60vh' }} /></article>
        <aside className="reader-rail"><Skeleton style={{ height: '300px' }} /></aside>
      </div>
    )
  }

  return (
    <main style={{ position: 'relative' }}>
      {/* Subtle reading ambient light */}
      <div className="absolute inset-0 pointer-events-none" style={{ 
        background: theme === 'dark' || theme === 'midnight' ? 'radial-gradient(ellipse at top, rgba(255, 198, 92, 0.05) 0%, transparent 60%)' : 'none',
        zIndex: 0
      }} />

      <div className="container reader-layout" style={{ position: 'relative', zIndex: 10, paddingTop: 'var(--space-4)' }}>
        {/* Left rail — chapter outline */}
        <aside className="reader-rail" aria-label="Chapter navigation">
          <div className="glass-panel stack" style={{ padding: 'var(--space-4)', position: 'sticky', top: '100px' }}>
            <span className="meta glow-text-indigo">Current Chapter</span>
            <h3 style={{ fontFamily: 'var(--font-reading)', fontSize: 'var(--text-xl)', color: 'var(--fg-2)' }}>Chapter {chapter?.number}</h3>
            
            <div style={{ marginTop: 'var(--space-2)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                 <span className="meta" style={{ fontSize: '11px' }}>Progress</span>
                 <span className="meta" style={{ fontSize: '11px', color: 'var(--fg-2)' }}>42%</span>
               </div>
               <div style={{ height: '4px', background: 'var(--border-soft)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', position: 'relative' }}>
                 <div style={{ height: '100%', background: 'var(--amber-glow)', width: '42%', boxShadow: '0 0 10px var(--amber-glow)' }} />
               </div>
            </div>

            <h4 style={{ marginTop: 'var(--space-4)', color: 'var(--fg-2)' }}>Narrative Outline</h4>
            <div className="stack" style={{ gap: 'var(--space-2)' }}>
              {['Opening sequence', 'The Spire', 'Conclusion'].map((s, i) => (
                <span key={s} className="meta interactive-node" style={{ 
                  color: i === 0 ? 'var(--amber-glow)' : 'var(--muted)',
                  borderLeft: i === 0 ? '2px solid var(--amber-glow)' : '2px solid transparent',
                  paddingLeft: 'var(--space-2)',
                  cursor: 'pointer'
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Article */}
        <article
          className="reader-article"
          data-reader-article
          data-size={fontSize}
          aria-label="Chapter content"
        >
          <div className="chapter-title" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="eyebrow glow-text-amber" style={{ marginBottom: 'var(--space-4)' }}>
              <Disc size={14} style={{ display: 'inline', marginRight: '8px', animation: 'spin 4s linear infinite' }} />
              Currently Reading
            </p>
            <h1 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--fg-2)', lineHeight: 1.1 }}>
              {chapter?.title || 'The Quiet Index'}
            </h1>
            <p className="meta" style={{ marginTop: 'var(--space-4)' }}>
              Chapter {chapter?.number} • {chapter?.wordCount?.toLocaleString() || '2,450'} words
            </p>
          </div>

          <div>
            {chapter?.content ? (
              <div 
                className="chapter-content tiptap"
                dangerouslySetInnerHTML={{ __html: chapter.content }} 
              />
            ) : (
              <>
                <p style={{ marginBottom: '1.5em' }}>The spire pulsed with a quiet, ethereal violet light. She approached the console, her fingers hovering over the glass surface. The narrative threads of the world were woven directly into the machine's core.</p>
                <p style={{ marginBottom: '1.5em' }}>"It's a complete ecosystem," he whispered, watching the star map reflect in her eyes. "Every story connected."</p>
                <p style={{ marginBottom: '1.5em' }}>She nodded slowly, the amber glow illuminating her face. "And we are just the archivists, ensuring the signal never fades."</p>
              </>
            )}
          </div>

          <div className="row-between" style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-soft)' }}>
            <button 
              className="btn glass-panel" 
              style={{ color: 'var(--fg-2)' }}
              onClick={() => prevChapter && navigate(`/reader/chapter/${prevChapter.id}?novel=${novelId}`)}
              disabled={!prevChapter}
            >
              ← Previous Chapter
            </button>
            <button 
              className="btn glass-panel glow-border" 
              style={{ color: 'var(--amber-glow)', borderColor: 'rgba(255,198,92,0.3)' }}
              onClick={() => nextChapter && navigate(`/reader/chapter/${nextChapter.id}?novel=${novelId}`)}
              disabled={!nextChapter}
            >
              Next Chapter →
            </button>
          </div>
        </article>

        {/* Right rail — display controls */}
        <aside className="reader-rail reader-controls" aria-label="Display settings">
          <div style={{ position: 'sticky', top: '100px' }} className="stack-lg">
            
            <div className="glass-panel stack" style={{ padding: 'var(--space-4)', gap: 'var(--space-5)' }}>
              <div className="row-between">
                <h3 className="glow-text-indigo" style={{ fontSize: 'var(--text-lg)' }}>Display Parameters</h3>
                <Settings size={16} color="var(--muted)" />
              </div>

              <div className="stack" style={{ gap: 'var(--space-2)' }}>
                <label className="meta">Text Scale</label>
                <div className="row" style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {[
                    { key: 'small', label: 'Aa', size: '14px' },
                    { key: 'base', label: 'Aa', size: '18px' },
                    { key: 'large', label: 'Aa', size: '22px' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      className={`btn interactive-node ${fontSize === s.key ? 'glow-border' : ''}`}
                      type="button"
                      aria-selected={fontSize === s.key}
                      onClick={() => setFontSize(s.key)}
                      style={{ 
                        flex: 1, 
                        fontSize: s.size, 
                        fontFamily: 'var(--font-reading)',
                        background: fontSize === s.key ? 'rgba(93,63,211,0.2)' : 'transparent',
                        color: fontSize === s.key ? 'var(--fg-2)' : 'var(--muted)',
                        border: fontSize === s.key ? '1px solid var(--indigo-pulse)' : '1px solid var(--border-soft)'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="stack" style={{ gap: 'var(--space-2)' }}>
                <label className="meta">Environment</label>
                <div className="grid-2" style={{ gap: 'var(--space-2)' }}>
                  {THEMES.map((t) => (
                    <button
                      key={t.key}
                      className={`btn interactive-node ${theme === t.key ? 'glow-border' : ''}`}
                      type="button"
                      aria-pressed={theme === t.key}
                      onClick={() => setTheme(t.key)}
                      style={{
                        background: t.bg,
                        color: t.fg,
                        borderColor: theme === t.key ? t.fg : t.border,
                        fontSize: 'var(--text-xs)',
                        padding: 'var(--space-2)',
                        boxShadow: theme === t.key ? 'var(--shadow-glow)' : 'none',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Intelligence Context */}
            <div className="glass-panel stack" style={{ padding: 'var(--space-4)' }}>
              <div className="row" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <LinkIcon size={14} color="var(--amber-glow)" />
                <h3 className="glow-text-amber" style={{ fontSize: 'var(--text-lg)' }}>Characters & Lore</h3>
              </div>
              <p className="meta" style={{ fontSize: '11px', marginBottom: 'var(--space-2)' }}>Mentioned in this chapter:</p>
              <div className="stack" style={{ gap: 'var(--space-2)' }}>
                {[
                  { name: 'Mira Vale', type: 'Character' },
                  { name: 'Index room', type: 'Location' },
                  { name: 'Ledger 17', type: 'Artifact' },
                ].map((item) => (
                  <div key={item.name} className="row-between" style={{ padding: 'var(--space-2)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-2)' }}>{item.name}</span>
                    <span className="meta" style={{ fontSize: '10px' }}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </aside>
      </div>
    </main>
  )
}
