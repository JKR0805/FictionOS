import { useNavigate, useParams } from 'react-router-dom'
import { useChapters, useCreateChapter, usePublishChapter, useDeleteChapter, useReorderChapters } from '@/hooks/useNovels'
import { ChapterRow } from '@/components/shared/ChapterRow'
import { Skeleton } from '@/components/ui/Skeleton'

export default function NovelChaptersPage() {
  const { novelId } = useParams()
  const navigate = useNavigate()
  const { data: chapters, isLoading } = useChapters(novelId)
  
  const createChapter = useCreateChapter()
  const publishChapter = usePublishChapter()
  const deleteChapter = useDeleteChapter()
  const reorderChapters = useReorderChapters()

  const handleCreateDraft = () => {
    createChapter.mutate(
      { novelId, chapterData: { title: 'Draft Chapter', content: '' } },
      {
        onSuccess: (newChapter) => {
          navigate(`/author/novel/${novelId}/chapter/${newChapter.id}/edit`)
        },
      }
    )
  }

  const handleMove = (index, direction) => {
    if (!chapters) return
    const newChapters = [...chapters]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newChapters[index]
    newChapters[index] = newChapters[swapIndex]
    newChapters[swapIndex] = temp
    
    // Send new ordered IDs
    reorderChapters.mutate({ novelId, chapterIds: newChapters.map(c => c.id) })
  }

  return (
    <div className="stack-lg">
      <div className="row-between" style={{ marginTop: 'var(--space-4)' }}>
        <h2>Chapters</h2>
        <div className="row" style={{ gap: 'var(--space-2)' }}>
          <button className="btn btn-primary" onClick={handleCreateDraft} disabled={createChapter.isPending}>
            {createChapter.isPending ? 'Creating...' : 'Create Chapter'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <Skeleton style={{ height: '200px', marginTop: 'var(--space-4)' }} />
      ) : (
        <div className="card stack" style={{ padding: 0, overflow: 'hidden', marginTop: 'var(--space-4)' }}>
          <div className="table-wrap">
            <table className="table" style={{ width: '100%' }}>
              <thead style={{ background: 'var(--surface)' }}>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ width: '80px' }}>Order</th>
                  <th>Title</th>
                  <th style={{ width: '120px' }}>Status</th>
                  <th style={{ width: '120px' }}>Published</th>
                  <th style={{ width: '160px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chapters?.sort((a, b) => a.number - b.number).map((ch, i) => (
                  <ChapterRow
                    key={ch.id}
                    chapter={ch}
                    isFirst={i === 0}
                    isLast={i === chapters.length - 1}
                    onMoveUp={() => handleMove(i, 'up')}
                    onMoveDown={() => handleMove(i, 'down')}
                    onEdit={(c) => navigate(`/author/novel/${novelId}/chapter/${c.id}/edit`)}
                    onPublish={(c) => publishChapter.mutate({ chapterId: c.id, action: 'publish' })}
                    onUnpublish={(c) => publishChapter.mutate({ chapterId: c.id, action: 'unpublish' })}
                    onDelete={(c) => {
                      if (confirm('Are you sure you want to delete this chapter?')) {
                        deleteChapter.mutate(c.id)
                      }
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
