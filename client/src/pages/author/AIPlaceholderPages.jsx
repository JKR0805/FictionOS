import { Users, Share2, Clock, BookOpen, CheckCircle } from 'lucide-react'

/** Reusable AI placeholder wrapper */
function AIPlaceholder({ title, description, icon, buttonLabel, previewSlots }) {
  return (
    <div className="stack-lg">
      <div style={{ marginTop: 'var(--space-4)' }}>
        <h2>{title}</h2>
        <p className="body-sm meta" style={{ marginTop: 'var(--space-1)' }}>{description}</p>
      </div>

      <div className="empty-state" style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ color: 'var(--muted)' }}>{icon}</div>
        <div>
          <h3>Not enough data</h3>
          <p>{title} will appear as chapters are analyzed.</p>
        </div>
        <button className="btn btn-ghost" disabled>{buttonLabel}</button>
      </div>

      {previewSlots}
    </div>
  )
}

function DashedPreview({ title, height = '80px' }) {
  return (
    <div className="card card-pad stack" style={{ opacity: 0.4, pointerEvents: 'none', borderStyle: 'dashed' }}>
      <h3 style={{ fontSize: 'var(--text-base)' }}>{title}</h3>
      <div style={{ height, width: '100%', background: 'var(--muted)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-2)' }} />
    </div>
  )
}

export function CharacterIntelligencePage() {
  return (
    <AIPlaceholder
      title="Character Intelligence"
      description="Story character management and analysis."
      icon={<Users size={24} />}
      buttonLabel="Analyze Chapters"
      previewSlots={
        <>
          <div className="grid-2" style={{ marginTop: 'var(--space-4)' }}>
            <DashedPreview title="Character Cards & List" />
            <DashedPreview title="Mention Statistics" />
          </div>
          <DashedPreview title="Future AI Insights Panel" />
        </>
      }
    />
  )
}

export function RelationshipGraphPage() {
  return (
    <AIPlaceholder
      title="Relationship Graph"
      description="Visualize character relationships."
      icon={<Share2 size={24} />}
      buttonLabel="Generate Graph"
      previewSlots={
        <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-4)', alignItems: 'flex-start' }}>
          <DashedPreview title="Graph Canvas" height="120px" />
          <div className="stack" style={{ width: '200px', gap: 'var(--space-4)', flexShrink: 0 }}>
            <DashedPreview title="Relationship Filters" height="40px" />
            <DashedPreview title="Character Selection" height="40px" />
          </div>
        </div>
      }
    />
  )
}

export function TimelinePage() {
  return (
    <AIPlaceholder
      title="Timeline"
      description="Chronological story exploration."
      icon={<Clock size={24} />}
      buttonLabel="Extract Timeline"
      previewSlots={
        <div className="row" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-4)', alignItems: 'flex-start' }}>
          <div className="stack" style={{ width: '200px', gap: 'var(--space-4)', flexShrink: 0 }}>
            <DashedPreview title="Event Filters" height="32px" />
            <DashedPreview title="Involvement" height="32px" />
          </div>
          <DashedPreview title="Event Timeline" height="160px" />
        </div>
      }
    />
  )
}

export function CodexPage() {
  return (
    <AIPlaceholder
      title="Story Codex"
      description="Central story knowledge base."
      icon={<BookOpen size={24} />}
      buttonLabel="Generate Codex"
      previewSlots={
        <div className="grid-4" style={{ marginTop: 'var(--space-4)' }}>
          {['Characters', 'Locations', 'Organizations', 'Artifacts & Lore'].map((label) => (
            <div key={label} className="card card-pad stack" style={{ opacity: 0.4, pointerEvents: 'none', borderStyle: 'dashed', alignItems: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-base)' }}>{label}</h3>
            </div>
          ))}
        </div>
      }
    />
  )
}

export function ConsistencyPage() {
  return (
    <AIPlaceholder
      title="Consistency Checker"
      description="Detect contradictions and continuity issues."
      icon={<CheckCircle size={24} />}
      buttonLabel="Run Check"
      previewSlots={
        <>
          <div className="grid-2" style={{ marginTop: 'var(--space-4)' }}>
            <DashedPreview title="Resolution Status" />
            <DashedPreview title="Review Queue" />
          </div>
          <DashedPreview title="Potential Issues Table" height="120px" />
        </>
      }
    />
  )
}
