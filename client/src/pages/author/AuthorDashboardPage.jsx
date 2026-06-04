import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useAuthorNovels, useCreateNovel } from '@/hooks/useNovels'
import { NovelListCard } from '@/components/shared/NovelCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/States'
import { PenLine } from 'lucide-react'

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
    <section className="section" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="container stack-lg">
        <div className="row-between">
          <div>
            <h1>My Works</h1>
            <p className="lead" style={{ marginTop: 'var(--space-2)' }}>
              Select a novel to open its dedicated workspace.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            Create New Novel
          </button>
        </div>

        {isLoading ? (
          <div className="grid-3" style={{ marginTop: 'var(--space-4)' }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} style={{ height: '160px', borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        ) : novels?.length === 0 ? (
          <EmptyState
            icon={<PenLine size={24} />}
            title="No novels yet"
            description="Create your first novel to get started."
            action={
              <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                Create Novel
              </button>
            }
          />
        ) : (
          <div className="grid-3" style={{ marginTop: 'var(--space-4)' }}>
            {novels?.map((novel) => (
              <NovelListCard key={novel.id} novel={novel} />
            ))}
          </div>
        )}

        {/* Create Novel Modal (simple inline form for now) */}
        {showCreate && (
          <div
            style={{
              position: 'fixed', inset: 0,
              background: 'color-mix(in oklab, var(--fg), transparent 60%)',
              display: 'grid', placeItems: 'center',
              zIndex: 100, padding: 'var(--space-4)',
            }}
            onClick={() => setShowCreate(false)}
          >
            <div
              className="card card-pad stack-lg"
              style={{ width: '100%', maxWidth: '480px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="row-between">
                <h2 style={{ margin: 0 }}>Create New Novel</h2>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowCreate(false)} aria-label="Close">✕</button>
              </div>
              <form className="stack" onSubmit={handleCreateSubmit}>
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input id="title" name="title" type="text" placeholder="Novel title…" required disabled={createNovel.isPending} />
                </div>
                <div className="field">
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea id="synopsis" name="synopsis" rows={4} placeholder="A brief description of your story…" disabled={createNovel.isPending} />
                </div>
                <div className="field">
                  <label htmlFor="genre">Genre</label>
                  <select id="genre" name="genre" disabled={createNovel.isPending}>
                    <option>Mystery</option>
                    <option>Fantasy</option>
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                    <option>Horror</option>
                    <option>Literary Fiction</option>
                  </select>
                </div>
                <div className="row" style={{ justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowCreate(false)} disabled={createNovel.isPending}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={createNovel.isPending}>
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
