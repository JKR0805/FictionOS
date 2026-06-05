import React from 'react';

export function CommunityEcosystemGraph({ className }) {
  const nodes = [
    { id: 'n1', label: 'Anya Senma', sub: 'Author', x: 250, y: 150, avatar: 'https://i.pravatar.cc/150?u=anya', type: 'author' },
    { id: 'n2', label: 'Leo Chen', sub: 'Top Reader', x: 750, y: 100, avatar: 'https://i.pravatar.cc/150?u=leo', type: 'reader' },
    { id: 'n3', label: 'The Obsidian Spire', sub: 'Story Hub', x: 500, y: 220, avatar: null, type: 'story' },
    { id: 'n4', label: 'Sci-Fi Guild', sub: 'Community', x: 600, y: 350, avatar: null, type: 'community' },
    { id: 'n5', label: 'Marcus V.', sub: 'Editor', x: 300, y: 320, avatar: 'https://i.pravatar.cc/150?u=marcus', type: 'editor' },
  ];

  const links = [
    { source: 'n1', target: 'n3', curve: 'up' },
    { source: 'n2', target: 'n3', curve: 'down' },
    { source: 'n3', target: 'n4', curve: 'down' },
    { source: 'n5', target: 'n3', curve: 'up' },
    { source: 'n1', target: 'n5', curve: 'straight', dashed: true },
    { source: 'n2', target: 'n4', curve: 'straight' },
  ];

  return (
    <div className={className || ''} style={{ position: 'relative', width: '100%', height: '400px' }}>
      <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-community">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Draw Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          if (!source || !target) return null;
          
          let d = '';
          if (link.curve === 'straight') {
            d = `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
          } else {
            const dy = link.curve === 'up' ? -100 : 100;
            d = `M ${source.x} ${source.y} Q ${(source.x + target.x) / 2} ${Math.min(source.y, target.y) + dy}, ${target.x} ${target.y}`;
          }

          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--indigo-pulse)"
              strokeWidth="2"
              strokeDasharray={link.dashed ? "6,6" : "none"}
              opacity="0.4"
              filter="url(#glow-community)"
            />
          );
        })}

        {/* Floating particle dots on paths */}
        <circle cx="375" cy="185" r="3" fill="var(--amber-glow)" filter="url(#glow-community)" />
        <circle cx="625" cy="160" r="3" fill="var(--ethereal-violet)" filter="url(#glow-community)" />
        <circle cx="550" cy="285" r="3" fill="var(--indigo-pulse)" filter="url(#glow-community)" />

      </svg>

      {/* Nodes (HTML for rich content like avatars and badges) */}
      {nodes.map(node => (
        <div 
          key={node.id} 
          className="interactive-node"
          style={{ 
            position: 'absolute',
            left: `${(node.x / 1000) * 100}%`, 
            top: `${(node.y / 450) * 100}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        >
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '9999px', background: 'rgba(7, 11, 29, 0.95)', border: '1px solid rgba(91, 110, 255, 0.2)', boxShadow: '0 8px 25px rgba(0,0,0,0.95)' }}>
            {node.avatar ? (
              <img src={node.avatar} alt={node.label} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid', borderColor: node.type === 'author' ? 'var(--amber-glow)' : 'var(--indigo-pulse)' }} />
            ) : (
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', borderColor: 'var(--ethereal-violet)', background: 'var(--surface)' }}>
                <span style={{ fontSize: '12px' }}>✦</span>
              </div>
            )}
            <div style={{ paddingRight: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-2)', lineHeight: 1.2 }}>{node.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{node.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
