import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useNovel, useUpdateNovelDetails } from '@/hooks/useNovels'
import { NovelCover } from '@/components/shared/NovelCover'

export default function NovelSettingsPage() {
  const { novelId } = useParams()
  const { data: novel } = useNovel(novelId)
  const updateNovel = useUpdateNovelDetails()

  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [status, setStatus] = useState('ongoing')
  const [coverUrl, setCoverUrl] = useState('')
  
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (novel) {
      setTitle(novel.title || '')
      setSynopsis(novel.synopsis || '')
      setStatus(novel.status || 'ongoing')
      setCoverUrl(novel.coverUrl || '')
    }
  }, [novel])

  const validateAndProcessImage = (file) => {
    setError(null)
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or WEBP.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File is too large. Maximum size is 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        
        // Check max dimensions
        if (width > 800 || height > 1200) {
          setError(`Image is too large (${width}x${height}). Maximum dimensions are 800x1200.`)
          return
        }

        // Check aspect ratio (allow slight floating point inaccuracies)
        const ratio = width / height
        const targetRatio = 2 / 3
        if (Math.abs(ratio - targetRatio) > 0.05) {
          setError(`Image aspect ratio is invalid. Must be exactly 2:3.`)
          return
        }

        setCoverUrl(dataUrl)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  function handleSave(e) {
    e.preventDefault()
    setError(null)

    updateNovel.mutate(
      { novelId, data: { title, synopsis, status, coverUrl } },
      {
        onSuccess: () => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        },
        onError: (err) => {
          setError(err.message || 'Failed to save changes.')
        }
      }
    )
  }

  return (
    <div className="stack-lg">
      <h2 style={{ marginTop: 'var(--space-4)' }}>Settings</h2>

      {error && (
        <div className="card card-pad" style={{ background: 'color-mix(in oklab, var(--danger), transparent 90%)', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          {error}
        </div>
      )}

      <div className="card card-pad stack-lg" style={{ maxWidth: '800px', marginTop: 'var(--space-4)' }}>
        <form className="stack-lg" onSubmit={handleSave}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="stack" style={{ width: 'clamp(140px, 20vw, 180px)', flexShrink: 0 }}>
              <label>Book Cover</label>
              <NovelCover title={title} novelId={novelId} coverUrl={coverUrl} style={{ width: '100%', height: 'auto', aspectRatio: '2/3', borderRadius: 'var(--radius-md)', overflow: 'hidden' }} />
              
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/png, image/jpeg, image/webp" 
                style={{ display: 'none' }} 
                onChange={(e) => validateAndProcessImage(e.target.files[0])} 
              />
              <button 
                type="button" 
                className="btn btn-ghost" 
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </button>
            </div>

            <div className="stack" style={{ flex: 1, minWidth: '240px' }}>

              <div className="field">
                <label htmlFor="coverUrl">Or paste a Cover URL</label>
                <input 
                  id="coverUrl" 
                  type="url" 
                  value={coverUrl} 
                  onChange={(e) => setCoverUrl(e.target.value)} 
                  placeholder="https://example.com/cover.jpg" 
                />
                <span className="body-sm meta">Must be 2:3 aspect ratio, max 800x1200. Uploaded files are preferred.</span>
              </div>

              <div className="field" style={{ marginTop: 'var(--space-4)' }}>
                <label htmlFor="title">Novel Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea id="synopsis" rows={6} value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="status">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="hiatus">Hiatus</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>
            <button type="submit" className="btn btn-primary" disabled={updateNovel.isPending}>
              {saved ? '✓ Saved' : (updateNovel.isPending ? 'Saving...' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>

      <div className="card card-pad stack-lg" style={{ maxWidth: '800px', borderColor: 'var(--danger)', marginTop: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--danger)', margin: 0 }}>Danger Zone</h3>
        <p className="body-sm" style={{ marginTop: 'var(--space-2)' }}>
          Deleting this novel will permanently remove all chapters, analytics, and associated data. This action cannot be undone.
        </p>
        <button className="btn" style={{ color: 'var(--danger)', borderColor: 'var(--danger)', width: 'fit-content', marginTop: 'var(--space-2)' }}>
          Delete Novel
        </button>
      </div>
    </div>
  )
}
