import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useAuthorNovels, useCreateNovel } from '@/hooks/useNovels'
import { NovelListCard } from '@/components/shared/NovelCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { Plus, Server } from 'lucide-react'

export default function AuthorDashboardPage() {
  const { user } = useAuthStore()
  const userId = user?.id || 'user-1'
  const { data: novels, isLoading } = useAuthorNovels(userId)
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()
  
  const createNovel = useCreateNovel()

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const novelData = {
      title: form.title.value,
      synopsis: form.synopsis.value,
      genre: [form.genre.value],
      tags: [],
      authorId: userId,
      authorName: user?.displayName || 'Elena Rostova',
      totalViews: 0,
      totalReads: 0,
      followersCount: 0,
      completionRate: 0,
    }

    createNovel.mutate(novelData, {
      onSuccess: (newNovel) => {
        setShowCreate(false)
        navigate(`/author/novel/${newNovel.id}/overview`)
      }
    })
  }

  return (
    <section className="section flush-top bg-cinematic" style={{ minHeight: 'calc(100vh - 64px)', position: 'relative' }}>
      <div className="container stack-lg" style={{ position: 'relative', zIndex: 10, paddingTop: 'var(--space-4)' }}>
        
        <div className="row-between" style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-4)' }}>
          <div>
            <p className="eyebrow glow-text-indigo">Mission Control</p>
            <h1 style={{ fontFamily: 'var(--font-reading)', margin: 0, color: 'var(--fg-2)', lineHeight: 1.1 }}>Author Workspace</h1>
            <p className="lead" style={{ marginTop: 'var(--space-2)', color: 'var(--fg)' }}>
              Select a narrative system to initialize its dedicated environment.
            </p>
          </div>
          <button className="btn glass-panel glow-border" style={{ background: 'rgba(93, 63, 211, 0.2)', color: 'var(--fg-2)', border: '1px solid var(--indigo-pulse)' }} onClick={() => setShowCreate(true)}>
            <Plus size={16} style={{ marginRight: '6px' }} />
            Initialize New Project
          </button>
        </div>

        {isLoading ? (
          <div className="grid-3" style={{ marginTop: 'var(--space-6)' }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        ) : novels?.length === 0 ? (
          <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
             <EmptyState
               icon={<Server size={32} color="var(--indigo-pulse)" />}
               title="No active systems detected"
               description="Initialize your first narrative project to begin."
               action={
                 <button className="btn glow-border" style={{ color: 'var(--fg-2)', background: 'var(--surface)' }} onClick={() => setShowCreate(true)}>
                   Initialize System
                 </button>
               }
             />
          </div>
        ) : (
          <div className="grid-3" style={{ marginTop: 'var(--space-6)', gap: 'var(--space-6)' }}>
            {novels?.map((novel) => (
              <NovelListCard key={novel.id} novel={novel} />
            ))}
          </div>
        )}

        {/* Create Novel Modal (Console Overlay) */}
        {showCreate && (
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              display: 'grid', placeItems: 'center',
              zIndex: 100, padding: 'var(--space-4)',
            }}
            onClick={() => setShowCreate(false)}
          >
            <div
              className="glass-panel glow-border stack-lg"
              style={{ width: '100%', maxWidth: '540px', padding: 'var(--space-6)', border: '1px solid var(--indigo-pulse)', boxShadow: '0 0 40px rgba(93, 63, 211, 0.3)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="row-between" style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-3)' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-reading)', color: 'var(--fg-2)', fontSize: 'var(--text-2xl)' }}>Initialize Narrative Core</h2>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowCreate(false)} aria-label="Close" style={{ color: 'var(--muted)' }}>✕</button>
              </div>
              <form className="stack" onSubmit={handleCreateSubmit} style={{ gap: 'var(--space-4)' }}>
                <div className="field stack" style={{ gap: '8px' }}>
                  <label htmlFor="title" className="meta glow-text-indigo">Project Designation (Title)</label>
                  <input id="title" name="title" type="text" placeholder="Enter title..." required disabled={createNovel.isPending} 
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-soft)', padding: 'var(--space-3)', color: 'var(--fg-2)', borderRadius: 'var(--radius-sm)', outline: 'none' }} 
                  />
                </div>
                <div className="field stack" style={{ gap: '8px' }}>
                  <label htmlFor="synopsis" className="meta glow-text-indigo">System Synopsis</label>
                  <textarea id="synopsis" name="synopsis" rows={4} placeholder="Define narrative parameters..." disabled={createNovel.isPending} 
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-soft)', padding: 'var(--space-3)', color: 'var(--fg-2)', borderRadius: 'var(--radius-sm)', outline: 'none', resize: 'vertical' }} 
                  />
                </div>
                <div className="field stack" style={{ gap: '8px' }}>
                  <label htmlFor="genre" className="meta glow-text-indigo">Primary Classification (Genre)</label>
                  <select id="genre" name="genre" disabled={createNovel.isPending}
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-soft)', padding: 'var(--space-3)', color: 'var(--fg-2)', borderRadius: 'var(--radius-sm)', outline: 'none' }} 
                  >
                    <option>Mystery</option>
                    <option>Fantasy</option>
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                    <option>Horror</option>
                    <option>Literary Fiction</option>
                  </select>
                </div>
                <div className="row" style={{ justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                  <button type="button" className="btn glass-panel" style={{ color: 'var(--muted)' }} onClick={() => setShowCreate(false)} disabled={createNovel.isPending}>Cancel</button>
                  <button type="submit" className="btn glass-panel glow-border" style={{ color: 'var(--amber-glow)', borderColor: 'rgba(255, 198, 92, 0.3)' }} disabled={createNovel.isPending}>
                    {createNovel.isPending ? 'Creating...' : 'Create Novel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
