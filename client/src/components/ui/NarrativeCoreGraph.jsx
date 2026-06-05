import React from 'react';

export function NarrativeCoreGraph({ className }) {
  const nodes = [
    { id: 'worlds', label: 'Worlds', x: 400, y: 80, color: 'var(--ethereal-violet)' },
    { id: 'themes', label: 'Themes', x: 650, y: 150, color: 'var(--amber-glow)' },
    { id: 'readers', label: 'Readers', x: 720, y: 350, color: 'var(--indigo-pulse)' },
    { id: 'authors', label: 'Authors', x: 550, y: 520, color: 'var(--ethereal-violet)' },
    { id: 'relationships', label: 'Relationships', x: 250, y: 520, color: 'var(--amber-glow)' },
    { id: 'events', label: 'Events', x: 80, y: 350, color: 'var(--indigo-pulse)' },
    { id: 'characters', label: 'Characters', x: 150, y: 150, color: 'var(--ethereal-violet)' },
    { id: 'lore', label: 'Lore', x: 500, y: 220, color: 'var(--amber-glow)', small: true },
    { id: 'magic', label: 'Magic', x: 280, y: 200, color: 'var(--indigo-pulse)', small: true },
    { id: 'arcs', label: 'Arcs', x: 600, y: 400, color: 'var(--ethereal-violet)', small: true },
    { id: 'pacing', label: 'Pacing', x: 200, y: 400, color: 'var(--amber-glow)', small: true },
  ];

  // Random background stars
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    cx: Math.random() * 800,
    cy: Math.random() * 600,
    r: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  const cx = 400;
  const cy = 300;

  return (
    <div className={className || ''} style={{ position: 'relative', width: '100%', height: '100%', minHeight: '600px' }}>
      <svg 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-core">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow-path">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="bg-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.9" />
          </filter>
          <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--amber-glow)" />
            <stop offset="100%" stopColor="var(--ethereal-violet)" />
          </linearGradient>
        </defs>

        {/* Background stars */}
        {stars.map((star, i) => (
          <circle key={`star-${i}`} cx={star.cx} cy={star.cy} r={star.r} fill="#fff" opacity={star.opacity} />
        ))}

        {/* Draw curved paths from center to each node */}
        {nodes.map((node, i) => {
          // Calculate control points for smooth sweeping curves
          const dx = node.x - cx;
          const dy = node.y - cy;
          // Offset control points to make curves dynamic rather than straight lines
          const cp1x = cx + dx * 0.2 + (dy * 0.3 * (i % 2 === 0 ? 1 : -1));
          const cp1y = cy + dy * 0.2 - (dx * 0.3 * (i % 2 === 0 ? 1 : -1));
          
          const cp2x = cx + dx * 0.8;
          const cp2y = cy + dy * 0.8;

          return (
            <path
              key={`path-${node.id}`}
              d={`M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${node.x} ${node.y}`}
              fill="none"
              stroke={node.color}
              strokeWidth={node.small ? "1" : "2"}
              opacity={node.small ? "0.3" : "0.5"}
              filter="url(#glow-path)"
              className="narrative-path"
            />
          );
        })}

        {/* Central Narrative Core */}
        <circle cx={cx} cy={cy} r="32" fill="url(#core-grad)" opacity="0.1" filter="url(#glow-core)" />
        <circle cx={cx} cy={cy} r="24" fill="url(#core-grad)" opacity="0.3" filter="url(#glow-core)" />
        <circle cx={cx} cy={cy} r="16" fill="var(--bg)" stroke="url(#core-grad)" strokeWidth="4" />
        <circle cx={cx} cy={cy} r="6" fill="#fff" filter="url(#glow-core)" />

        {/* Nodes and Labels */}
        {nodes.map(node => (
          <g key={`node-${node.id}`} className="interactive-node" style={{ pointerEvents: 'auto' }} filter="url(#bg-shadow)">
            {/* Outer glow ring */}
            <circle cx={node.x} cy={node.y} r={node.small ? "12" : "20"} fill="transparent" stroke={node.color} strokeWidth="1" opacity={node.small ? "0.1" : "0.3"} filter="url(#glow-path)" />
            {/* Inner node */}
            <circle cx={node.x} cy={node.y} r={node.small ? "4" : "6"} fill="var(--bg)" stroke={node.color} strokeWidth={node.small ? "2" : "3"} />
            <circle cx={node.x} cy={node.y} r={node.small ? "1" : "2"} fill="#fff" />
            
            {/* Glassmorphism label background */}
            <rect 
              x={node.small ? node.x - 30 : node.x - 50} 
              y={node.small ? node.y + 10 : node.y + 15} 
              width={node.small ? "60" : "100"} 
              height={node.small ? "20" : "28"} 
              rx={node.small ? "10" : "14"} 
              fill="rgba(11, 16, 35, 0.7)" 
              stroke="rgba(255,255,255,0.1)"
            />
            {/* Label Text */}
            <text 
              x={node.x} 
              y={node.small ? node.y + 24 : node.y + 34} 
              textAnchor="middle" 
              fill="var(--fg-2)" 
              fontSize={node.small ? "10" : "12"}
              fontFamily="var(--font-body)"
              fontWeight={node.small ? "400" : "500"}
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
