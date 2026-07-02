import { Link } from 'react-router-dom'
import { LaptopFrame, PhoneFrame, TabletFrame } from '@/components/ui/DeviceFrames'
import { NarrativeCoreGraph } from '@/components/ui/NarrativeCoreGraph'
import { StarMapConstellation } from '@/components/ui/StarMapConstellation'
import { StoryIntelligenceGraph } from '@/components/ui/StoryIntelligenceGraph'
import { CommunityEcosystemGraph } from '@/components/ui/CommunityEcosystemGraph'
import { CharacterRelationshipGraph } from '@/components/ui/CharacterRelationshipGraph'

// Global continuous SVG pathway connecting the entire page
const GlobalNarrativeThread = () => (
  <svg 
    className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1440 4000" 
    preserveAspectRatio="xMidYMin slice"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="glowLine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--indigo-pulse)" stopOpacity="0.8" />
        <stop offset="30%" stopColor="var(--amber-glow)" stopOpacity="0.8" />
        <stop offset="60%" stopColor="var(--ethereal-violet)" stopOpacity="0.8" />
        <stop offset="85%" stopColor="var(--indigo-pulse)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="var(--ethereal-violet)" stopOpacity="0.8" />
      </linearGradient>
      <filter id="blurGlow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g className="stars">
      {Array.from({ length: 150 }).map((_, i) => {
        const x = (i * 137) % 1440;
        const y = (i * 937) % 4200;
        const r = (i % 3 === 0) ? 1.5 : 0.8;
        const opacity = (i % 5 === 0) ? 0.7 : 0.3;
        return <circle key={i} cx={x} cy={y} r={r} fill="#FFF" opacity={opacity} />
      })}
    </g>

    {/* Primary Narrative Thread Bundle */}
    <g filter="url(#blurGlow)">
      <path d="M -200 200 C 600 400, 1000 800, 1200 1200 S 200 1800, 400 2400 S 1400 3200, 800 4000" stroke="url(#glowLine)" strokeWidth="4" opacity="0.4" />
      <path d="M -200 200 C 600 400, 1000 800, 1200 1200 S 200 1800, 400 2400 S 1400 3200, 800 4000" stroke="url(#glowLine)" strokeWidth="2" opacity="0.35" transform="translate(-20, 15)" />
      <path d="M -200 200 C 600 400, 1000 800, 1200 1200 S 200 1800, 400 2400 S 1400 3200, 800 4000" stroke="url(#glowLine)" strokeWidth="1" opacity="0.25" transform="translate(30, 5)" />
      <path d="M -200 200 C 600 400, 1000 800, 1200 1200 S 200 1800, 400 2400 S 1400 3200, 800 4000" stroke="url(#glowLine)" strokeWidth="1.5" opacity="0.2" transform="translate(-35, -5)" />
    </g>

    {/* Secondary Woven Thread Bundle */}
    <g filter="url(#blurGlow)">
      <path d="M 1600 400 C 800 600, 200 1000, 400 1600 S 1400 2200, 1000 2800 S 0 3600, 600 4200" stroke="url(#glowLine)" strokeWidth="2" opacity="0.25" />
      <path d="M 1600 400 C 800 600, 200 1000, 400 1600 S 1400 2200, 1000 2800 S 0 3600, 600 4200" stroke="url(#glowLine)" strokeWidth="1" opacity="0.15" transform="translate(-12, 8)" />
      <path d="M 1600 400 C 800 600, 200 1000, 400 1600 S 1400 2200, 1000 2800 S 0 3600, 600 4200" stroke="url(#glowLine)" strokeWidth="1" opacity="0.2" transform="translate(18, -12)" />
    </g>
  </svg>
)

export default function LandingPage() {
  return (
    <div className="bg-cinematic" style={{ position: 'relative', overflow: 'hidden' }}>
      <GlobalNarrativeThread />
      
      {/* 1. Hero Section */}
      <section className="section flush-top" style={{ position: 'relative', minHeight: '85vh', paddingTop: 'var(--space-12)' }}>
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          {/* Hero — responsive two-col on large, single-col on mobile */}
          <div className="landing-hero-grid">
            <div className="hero-copy">
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                <strong style={{ fontWeight: 800 }}>FictionOS</strong>
                <br />
                <span style={{ color: 'var(--fg-2)', opacity: 0.9, fontSize: '0.6em', fontWeight: 400 }}>The Operating System for Stories</span>
              </h1>
              <p className="lead" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', lineHeight: 1.6 }}>
                A high fidelity cinematic platform for serial fiction — connecting readers, authors, and their stories across narrative threads.
              </p>
              <div className="hero-actions">
                <Link className="btn glow-border" to="/reader" style={{ background: 'var(--amber-glow)', color: '#000', padding: 'var(--space-3) var(--space-6)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', borderRadius: 'var(--radius-pill)', border: 'none', boxShadow: '0 0 15px rgba(246, 185, 74, 0.4)', fontWeight: 600 }}>
                  Read Stories
                </Link>
                <Link className="btn glow-border" to="/author" style={{ background: 'transparent', padding: 'var(--space-3) var(--space-6)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--indigo-pulse)', border: '1px solid var(--indigo-pulse)', borderRadius: 'var(--radius-pill)', boxShadow: '0 0 15px rgba(91, 110, 255, 0.2)', fontWeight: 600 }}>
                  Publish Stories
                </Link>
              </div>
            </div>

            {/* Hero graph — hidden on mobile via .landing-hero-graph CSS rule */}
            <div className="landing-hero-graph">
              <NarrativeCoreGraph />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Navigate the Universe (Discovery Showcase) */}
      <section id="features" className="section" style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '600px', textAlign: 'left', marginLeft: '5%' }}>
            <h2 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>Navigate the Universe</h2>
            <p className="lead" style={{ margin: 'var(--space-4) 0 0', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.6 }}>
              A constellation of story covers grouped into genre clusters, <br className="desktop-only"/> where narrative threads form a star map.
            </p>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'hidden' }}>
            <StarMapConstellation />
          </div>
        </div>
      </section>

      {/* 3. The Night Mode Reader */}
      <section id="for-readers" className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div>
            <p className="eyebrow glow-text-amber" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontSize: '0.85rem' }}>Reader Experience:</p>
            <h2 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>The Night Mode Reader</h2>
            <p className="lead" style={{ margin: 'var(--space-4) auto 0', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.6, maxWidth: '600px' }}>
              A beautiful, distraction-free reading experience optimised for every device — phone, tablet, or desktop.
            </p>
          </div>

          {/* Device showcase — stacks on mobile */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', gap: 'var(--space-6)', flexWrap: 'wrap', marginTop: 'var(--space-8)' }}>
            {/* Phone frame — always visible */}
            <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
              <PhoneFrame>
                 <div style={{ padding: 'var(--space-6)', background: 'var(--bg)', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p className="eyebrow glow-text-amber" style={{ fontSize: '10px', textAlign: 'center' }}>The Spire</p>
                    <h1 style={{ fontFamily: 'var(--font-reading)', fontSize: '24px', textAlign: 'center', marginBottom: 'var(--space-4)' }}>Chapter 12</h1>
                    <p style={{ fontFamily: 'var(--font-reading)', fontSize: '14px', lineHeight: 1.6, color: 'var(--fg)' }}>
                      The spire pulsed with a quiet, ethereal violet light. She approached the console, her fingers hovering over the glass surface. The narrative threads of the world were woven directly into the machine's core.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)', height: '2px', background: 'var(--border-soft)', position: 'relative' }}>
                       <div style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', background: 'var(--amber-glow)', boxShadow: '0 0 5px var(--amber-glow)' }}></div>
                    </div>
                 </div>
              </PhoneFrame>
            </div>

            {/* Laptop frame — hidden on mobile */}
            <div className="landing-laptop-frame" style={{ position: 'relative', zIndex: 1, flex: 1, maxWidth: '800px', minWidth: '320px' }}>
              <LaptopFrame>
                 <div style={{ padding: 'var(--space-8)', background: 'var(--bg)', minHeight: '100%', display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                       <p className="eyebrow glow-text-amber" style={{ fontSize: '12px' }}>The Quiet Index</p>
                       <h1 style={{ fontFamily: 'var(--font-reading)', fontSize: '36px', marginBottom: 'var(--space-6)' }}>Chapter 12: The Obsidian Spire</h1>
                       <p style={{ fontFamily: 'var(--font-reading)', fontSize: '18px', lineHeight: 1.8, color: 'var(--fg)', marginBottom: 'var(--space-4)' }}>
                         "It's a complete ecosystem," he whispered, watching the star map reflect in her eyes. "Every story connected."
                       </p>
                       <p style={{ fontFamily: 'var(--font-reading)', fontSize: '18px', lineHeight: 1.8, color: 'var(--fg)' }}>
                         She nodded slowly, the amber glow illuminating her face. "And we are just the archivists, ensuring the signal never fades."
                       </p>
                    </div>
                    <div style={{ width: '200px', flexShrink: 0 }} className="glass-panel stack">
                       <div style={{ padding: 'var(--space-4)' }}>
                          <h4 className="meta">Characters & Lore</h4>
                          <div className="meta" style={{ marginTop: 'var(--space-2)' }}>• Mira Vale</div>
                          <div className="meta" style={{ marginTop: '8px' }}>• Obsidian Spire</div>
                       </div>
                    </div>
                 </div>
              </LaptopFrame>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Story Intelligence Layer */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>Story Intelligence Layer</h2>
            <p className="lead" style={{ margin: 'var(--space-4) auto 0', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.6, maxWidth: '600px' }}>
              Visualizing lore consistency, relationship evolution and character dependencies across narrative threads.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
             <StoryIntelligenceGraph />
          </div>
        </div>
      </section>

      {/* 5. Author Workspace: Mission Control */}
      <section id="for-authors" className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10,  textAlign: 'center' }}>
          <div>
            <p className="eyebrow glow-text-indigo" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontSize: '0.85rem' }}>Author Workspace:</p>
            <h2 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>Mission Control</h2>
            <p className="lead" style={{ margin: 'var(--space-4) auto 0', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.6, maxWidth: '600px' }}>
              High fidelity command center and narrative dashboard tailored for Stories & Systems.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-6)', overflowX: 'hidden' }}>
            <TabletFrame>
               <div style={{ height: '100%', display: 'flex', background: 'var(--bg)' }}>
                 {/* Sidebar — hidden on very small frames */}
                 <div className="landing-tablet-sidebar" style={{ width: '200px', borderRight: '1px solid var(--border-soft)', padding: 'var(--space-4)', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }}>
                    <div className="row" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                       <div style={{ width: '24px', height: '24px', background: 'var(--indigo-pulse)', borderRadius: '4px', flexShrink: 0 }}></div>
                       <span style={{ fontWeight: 600, color: 'var(--fg-2)' }}>FictionOS</span>
                    </div>
                    <div className="stack" style={{ gap: 'var(--space-2)' }}>
                       {['Dashboard', 'Manuscript', 'Characters', 'Worldbuilding', 'Analytics'].map((item, i) => (
                         <div key={item} className="meta" style={{ padding: 'var(--space-2)', background: i === 2 ? 'rgba(91,110,255,0.1)' : 'transparent', borderLeft: i === 2 ? '2px solid var(--indigo-pulse)' : '2px solid transparent', color: i === 2 ? 'var(--fg-2)' : 'var(--muted)', cursor: 'pointer' }}>
                           {item}
                         </div>
                       ))}
                    </div>
                 </div>
                 {/* Main Content */}
                 <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <div className="row-between" style={{ marginBottom: 'var(--space-6)' }}>
                       <h3 style={{ margin: 0, color: 'var(--fg-2)', fontSize: 'var(--text-xl)', fontFamily: 'var(--font-reading)', letterSpacing: '0' }}>Character Dashboard</h3>
                       <button className="btn glow-border" style={{ background: 'var(--indigo-pulse)', color: '#fff', borderRadius: 'var(--radius-sm)' }}>Add Character</button>
                    </div>
                    
                    <div className="tablet-content-grid" style={{ flex: 1 }}>
                       <div className="glass-panel" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-lg)' }}>
                          <span className="meta" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 20 }}>Character Relationship Network</span>
                          <CharacterRelationshipGraph />
                       </div>
                       <div className="stack" style={{ gap: 'var(--space-4)' }}>
                          <div className="glass-panel" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                             <span className="meta">World Transcripts</span>
                             <div style={{ height: '80px', marginTop: 'var(--space-2)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)' }}></div>
                          </div>
                          <div className="glass-panel" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
                             <span className="meta">Plot Arcs</span>
                             <div style={{ height: '80px', marginTop: 'var(--space-2)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)' }}></div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </TabletFrame>
          </div>
        </div>
      </section>

      {/* 6. The Community Ecosystem */}
      <section className="section" style={{ position: 'relative' }}>
         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>The Community</h2>
            <p className="lead" style={{ margin: 'var(--space-4) auto 0', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--muted)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.6, maxWidth: '600px' }}>
              Shared visualizations where active readers, collaborators and reader communities collaborate and grow the stories.
            </p>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'hidden' }}>
               <CommunityEcosystemGraph />
            </div>
         </div>
      </section>

    </div>
  )
}
