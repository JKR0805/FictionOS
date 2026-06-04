import { Link } from 'react-router-dom'
import { MOCK_STATS } from '@/data/mockData'
import { formatCount } from '@/lib/utils'
import { BookOpen, Ban, Wrench } from 'lucide-react'

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="section"
        style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}
      >
        <div
          className="container"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <div className="hero-copy" style={{ alignItems: 'center' }}>
            <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
              A modern platform for reading and publishing serial fiction.
            </h1>
            <p className="lead" style={{ marginTop: 'var(--space-4)', maxWidth: '650px' }}>
              Experience a calm, immersive reading environment. Manage your stories with a professional,
              structured publishing workspace. One platform, two dedicated experiences.
            </p>
            <div className="hero-actions" style={{ marginTop: 'var(--space-6)', justifyContent: 'center', gap: 'var(--space-4)' }}>
              <Link className="btn btn-primary" to="/reader" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-base)' }}>
                Read Stories
              </Link>
              <Link className="btn" to="/author" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-base)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                Publish Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey flow */}
      <section className="section" style={{ background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container grid-2" style={{ gap: 'var(--space-8)' }}>
          <div className="stack card card-pad">
            <h3 className="eyebrow" style={{ color: 'var(--accent)' }}>Reader Journey</h3>
            <div className="row" style={{ alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              {['Discover', 'Read', 'Follow', 'Build Library'].map((step, i, arr) => (
                <span key={step} style={{ display: 'contents' }}>
                  <span className="body-sm" style={{ fontWeight: 500 }}>{step}</span>
                  {i < arr.length - 1 && <span className="meta">→</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="stack card card-pad">
            <h3 className="eyebrow" style={{ color: 'var(--accent)' }}>Author Journey</h3>
            <div className="row" style={{ alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              {['Create', 'Publish', 'Analyze', 'Grow Audience'].map((step, i, arr) => (
                <span key={step} style={{ display: 'contents' }}>
                  <span className="body-sm" style={{ fontWeight: 500 }}>{step}</span>
                  {i < arr.length - 1 && <span className="meta">→</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Readers */}
      <section id="for-readers" className="section">
        <div className="container stack-lg">
          <div className="row-between" style={{ alignItems: 'flex-end' }}>
            <div>
              <p className="eyebrow">For Readers</p>
              <h2>Immersive reading, personalized library.</h2>
            </div>
            <p className="lead" style={{ maxWidth: '500px', textAlign: 'right' }}>
              A clean reading experience with powerful discovery, progress tracking, and organized shelves.
            </p>
          </div>
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
            {/* UI Preview */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-2) var(--space-3)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: '10px', height: '10px', borderRadius: 'var(--radius-pill)', background: 'var(--border)' }} />)}
                </div>
                <span className="meta" style={{ fontSize: '11px' }}>Reader Dashboard</span>
              </div>
              <div className="stack card-pad">
                <h4 style={{ fontSize: 'var(--text-sm)' }}>Continue Reading</h4>
                <div className="card card-pad row" style={{ gap: 'var(--space-3)', padding: 'var(--space-3)' }}>
                  <div className="cover" style={{ width: '48px', height: '64px', fontSize: '10px', flexShrink: 0 }}>The Glass Archive</div>
                  <div className="stack" style={{ flex: 1, gap: 'var(--space-1)', justifyContent: 'center' }}>
                    <span className="body-sm" style={{ fontWeight: 500 }}>The Glass Archive</span>
                    <span className="meta" style={{ fontSize: '11px' }}>Chapter 23: A Window in the Stacks</span>
                    <div style={{ height: '4px', background: 'var(--border)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', marginTop: 'var(--space-2)' }}>
                      <div style={{ width: '42%', height: '100%', background: 'var(--accent)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Features */}
            <div className="stack-lg">
              {[
                { title: 'Clean Reading Experience', desc: 'Customizable typography, themes, and distraction-free layouts designed for deep immersion.' },
                { title: 'Progress & Bookmarks', desc: 'Automatically sync your reading progress across devices and save your favorite passages.' },
                { title: 'Organized Shelves', desc: 'Sort your ongoing reads, favorites, and completed stories into manageable libraries.' },
                { title: 'Smart Discovery', desc: 'Find new serials with powerful filters, momentum-based trending, and personalized recommendations.' },
              ].map((f) => (
                <div key={f.title} className="stack" style={{ gap: 'var(--space-1)' }}>
                  <div className="row" style={{ alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: 'var(--radius-pill)', background: 'var(--accent)', flexShrink: 0 }} />
                    <h3>{f.title}</h3>
                  </div>
                  <p className="body-sm meta" style={{ paddingLeft: 'var(--space-4)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Authors */}
      <section id="for-authors" className="section" style={{ background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container stack-lg">
          <div className="row-between" style={{ alignItems: 'flex-end' }}>
            <div style={{ maxWidth: '500px' }}>
              <p className="eyebrow">For Authors</p>
              <h2>A professional operating system for fiction.</h2>
            </div>
            <p className="lead" style={{ maxWidth: '500px', textAlign: 'right' }}>
              Build structured story worlds, manage your release pipeline, and analyze reader engagement.
            </p>
          </div>
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
            <div className="stack-lg">
              {[
                { title: 'Novel Workspace', desc: 'A dedicated command center for each project. Manage drafts, published chapters, and settings in one place.' },
                { title: 'Version History', desc: 'Track chapter revisions securely. Maintain a clear timeline of changes and updates to your manuscript.' },
                { title: 'Deep Analytics', desc: 'Understand your audience. Track views, read completion rates, and follower growth to build your momentum.' },
                { title: 'Long-form Serial Tools', desc: 'Designed specifically for serial publishing with tools to handle hundreds of chapters elegantly.' },
              ].map((f) => (
                <div key={f.title} className="stack" style={{ gap: 'var(--space-1)' }}>
                  <div className="row" style={{ alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: 'var(--radius-pill)', background: 'var(--accent)', flexShrink: 0 }} />
                    <h3>{f.title}</h3>
                  </div>
                  <p className="body-sm meta" style={{ paddingLeft: 'var(--space-4)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
            {/* UI Preview */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-2) var(--space-3)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: '10px', height: '10px', borderRadius: 'var(--radius-pill)', background: 'var(--border)' }} />)}
                </div>
                <span className="meta" style={{ fontSize: '11px' }}>Author Workspace • The Glass Archive</span>
              </div>
              <div className="row" style={{ flex: 1, alignItems: 'stretch' }}>
                <div style={{ width: '140px', borderRight: '1px solid var(--border)', padding: 'var(--space-3)' }} className="stack">
                  {['Overview', 'Chapters', 'History', 'Settings'].map((item) => (
                    <span key={item} className="body-sm meta" style={{ padding: 'var(--space-1) var(--space-2)' }}>{item}</span>
                  ))}
                </div>
                <div className="stack card-pad" style={{ flex: 1, padding: 'var(--space-3)' }}>
                  <h4 style={{ fontSize: 'var(--text-sm)' }}>Analytics</h4>
                  <div className="grid-2" style={{ gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                    <div className="card card-pad stack" style={{ padding: 'var(--space-2)' }}>
                      <span className="meta" style={{ fontSize: '10px' }}>Total Reads</span>
                      <span className="body-sm" style={{ fontWeight: 500, fontSize: 'var(--text-lg)' }}>42.5k</span>
                    </div>
                    <div className="card card-pad stack" style={{ padding: 'var(--space-2)' }}>
                      <span className="meta" style={{ fontSize: '10px' }}>Followers</span>
                      <span className="body-sm" style={{ fontWeight: 500, fontSize: 'var(--text-lg)' }}>1,240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="features" className="section">
        <div className="container stack-lg" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p className="eyebrow">Philosophy</p>
          <h2>Why FictionOS is different.</h2>
          <p className="lead" style={{ marginTop: 'var(--space-2)' }}>
            We reject the cluttered interfaces of traditional web novel sites. FictionOS treats stories as structured data,
            prioritizing reading comfort and professional author tooling over chaotic discovery feeds.
          </p>
          <div className="grid-3" style={{ textAlign: 'left', marginTop: 'var(--space-6)' }}>
            {[
              { icon: <BookOpen size={16} />, title: 'Structured Stories', desc: 'Stories are more than walls of text. We provide a disciplined schema for long-form fiction, ensuring chapters, metadata, and progress remain organized.' },
              { icon: <Ban size={16} />, title: 'No Dark Patterns', desc: 'No predatory monetization timers, chaotic banners, or aggressive popups. Just pure reading and precise writing.' },
              { icon: <Wrench size={16} />, title: 'Professional Tooling', desc: 'We give authors tools inspired by top-tier software development to manage the complexity of massive, evolving narratives.' },
            ].map((f) => (
              <div key={f.title} className="card card-pad stack" style={{ padding: 'var(--space-4)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'color-mix(in oklab, var(--fg), transparent 95%)', display: 'grid', placeItems: 'center', marginBottom: 'var(--space-2)' }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p className="body-sm meta" style={{ marginTop: 'var(--space-1)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future AI */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container stack-lg">
          <div className="row-between" style={{ alignItems: 'flex-end' }}>
            <div>
              <p className="eyebrow">Future Capabilities</p>
              <h2>The story intelligence layer.</h2>
            </div>
            <p className="lead" style={{ maxWidth: '500px', textAlign: 'right' }}>
              Upcoming extensions for the Author Workspace to help manage narrative complexity and continuity.
            </p>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--space-4)' }}>
            {[
              { title: 'Character Intelligence', hint: 'Extracts traits & arcs' },
              { title: 'Relationship Graph', hint: 'Visualizes character links' },
              { title: 'Story Codex & Timeline', hint: 'Tracks lore chronologically' },
            ].map((f) => (
              <div key={f.title} className="card stack" style={{ padding: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{f.title}</h4>
                <div style={{ height: '80px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', display: 'grid', placeItems: 'center', background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)' }}>
                  <span className="meta" style={{ fontSize: '11px' }}>{f.hint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {[
              { value: `${formatCount(MOCK_STATS.platformNovels)}+`, label: 'Novels Published' },
              { value: formatCount(MOCK_STATS.chaptersRead), label: 'Chapters Read' },
              { value: formatCount(MOCK_STATS.activeReaders), label: 'Active Readers' },
              { value: formatCount(MOCK_STATS.activeAuthors), label: 'Active Authors' },
            ].map((s) => (
              <div key={s.label} className="stack" style={{ gap: 'var(--space-1)' }}>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 500 }}>{s.value}</div>
                <span className="body-sm meta">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'color-mix(in oklab, var(--bg), var(--fg) 2%)', borderTop: '1px solid var(--border)' }}>
        <div className="container stack-lg" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          <h2>Ready to enter the platform?</h2>
          <p className="body-sm meta" style={{ marginBottom: 'var(--space-4)' }}>
            Join a growing community of serious readers and dedicated serial fiction authors.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 'var(--space-4)' }}>
            <Link className="btn btn-primary" to="/reader" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-base)' }}>
              Start Reading
            </Link>
            <Link className="btn" to="/author" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-base)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              Start Publishing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
