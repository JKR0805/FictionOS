import { EmptyState } from '@/components/ui/States'
import { GitCommit } from 'lucide-react'

export default function VersionHistoryPage() {
  return (
    <div className="stack-lg">
      <h2 style={{ marginTop: 'var(--space-4)' }}>Version History</h2>
      <EmptyState
        icon={<GitCommit size={32} />}
        title="Version Control Coming Soon"
        description="Soon you will be able to track changes, restore previous versions, and manage your novel's history."
        style={{ marginTop: 'var(--space-4)' }}
      />
    </div>
  )
}
