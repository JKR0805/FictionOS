import React from 'react';

export function StoryIntelligenceGraph({ className }) {
  // A horizontal tree graph showing narrative branches and lore consistency
  const nodes = [
    { id: 'root', label: 'Lore Consistency', x: 400, y: 210, color: 'var(--ethereal-violet)', scale: 1.2 },
    
    // Left branches
    { id: 'l1', label: 'Worldbuilding', x: 200, y: 140, color: 'var(--indigo-pulse)', scale: 0.9 },
    { id: 'l2', label: 'Characters', x: 150, y: 210, color: 'var(--amber-glow)', scale: 0.9 },
    { id: 'l3', label: 'Magic System', x: 200, y: 280, color: 'var(--indigo-pulse)', scale: 0.9 },
    
    // Right branches (Character Evolution)
    { id: 'r1', label: 'Character Evolution', x: 600, y: 140, color: 'var(--amber-glow)', scale: 1.1 },
    { id: 'r1a', label: 'Aethel\'s Betrayal', x: 800, y: 110, color: 'var(--danger)', scale: 0.8 }, // Showing a conflict
    { id: 'r1b', label: 'Elera\'s Ascent', x: 820, y: 170, color: 'var(--success)', scale: 0.8 },
    
    { id: 'r2', label: 'Thematic Resonance', x: 650, y: 280, color: 'var(--ethereal-violet)', scale: 1 },
  ];

  const links = [
    { source: 'root', target: 'l1' },
    { source: 'root', target: 'l2' },
    { source: 'root', target: 'l3' },
    { source: 'root', target: 'r1' },
    { source: 'root', target: 'r2' },
    { source: 'r1', target: 'r1a', dashed: true },
    { source: 'r1', target: 'r1b' },
  ];

  return (
    <div className={`story-intelligence-graph ${className || ''}`} style={{ position: 'relative', width: '100%', height: '400px' }}>
      <svg 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1000 400" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-intel">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="bg-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Draw Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          if (!source || !target) return null;
          
          // Bezier curves for horizontal tree
          const cp1x = source.x + (target.x - source.x) / 2;
          const cp2x = source.x + (target.x - source.x) / 2;

          return (
            <path
              key={i}
              d={`M ${source.x} ${source.y} C ${cp1x} ${source.y}, ${cp2x} ${target.y}, ${target.x} ${target.y}`}
              fill="none"
              stroke={link.dashed ? 'var(--danger)' : 'var(--ethereal-violet)'}
              strokeWidth={link.dashed ? "1" : "2"}
              strokeDasharray={link.dashed ? "5,5" : "none"}
              opacity="0.6"
              filter="url(#glow-intel)"
            />
          );
        })}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <g key={node.id} className="interactive-node" style={{ pointerEvents: 'auto' }} filter="url(#bg-shadow)">
            <circle cx={node.x} cy={node.y} r={12 * node.scale} fill="var(--bg)" stroke={node.color} strokeWidth="3" filter="url(#glow-intel)" />
            <circle cx={node.x} cy={node.y} r={4 * node.scale} fill="#fff" />
            
            {/* Label Background */}
            <rect 
              x={node.x - 70} 
              y={node.y + 15} 
              width="140" 
              height="24" 
              rx="12" 
              fill="rgba(11, 16, 35, 0.8)" 
              stroke="rgba(255,255,255,0.05)"
            />
            {/* Label Text */}
            <text 
              x={node.x} 
              y={node.y + 31} 
              textAnchor="middle" 
              fill="var(--fg-2)" 
              fontSize="11"
              fontFamily="var(--font-body)"
              letterSpacing="0.02em"
            >
              {node.label}
            </text>

            {node.id === 'r1a' && (
              <text x={node.x} y={node.y - 15} textAnchor="middle" fill="var(--danger)" fontSize="10" fontWeight="600">
                Discrepancy Detected
              </text>
            )}
          </g>
        ))}
        
        {/* Timeline Axis below */}
        <line x1="200" y1="340" x2="800" y2="340" stroke="var(--border-soft)" strokeWidth="2" />
        <circle cx="300" cy="340" r="4" fill="var(--muted)" />
        <text x="300" y="355" fill="var(--muted)" fontSize="10" textAnchor="middle">Ch. 1</text>
        <circle cx="500" cy="340" r="4" fill="var(--muted)" />
        <text x="500" y="355" fill="var(--muted)" fontSize="10" textAnchor="middle">Ch. 6</text>
        <circle cx="700" cy="340" r="4" fill="var(--amber-glow)" filter="url(#glow-intel)" />
        <text x="700" y="355" fill="var(--amber-glow)" fontSize="10" textAnchor="middle">Ch. 12 (Current)</text>
      </svg>
    </div>
  );
}
