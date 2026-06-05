import React from 'react';

export function CharacterRelationshipGraph({ className }) {
  const nodes = [
    { id: 'c1', label: 'Elera', x: 200, y: 150, color: 'var(--amber-glow)', scale: 1.2 },
    { id: 'c2', label: 'Aethel', x: 100, y: 80, color: 'var(--danger)', scale: 1 },
    { id: 'c3', label: 'Kael', x: 300, y: 100, color: 'var(--indigo-pulse)', scale: 0.9 },
    { id: 'c4', label: 'Vara', x: 150, y: 220, color: 'var(--success)', scale: 0.8 },
    { id: 'c5', label: 'The King', x: 280, y: 220, color: 'var(--ethereal-violet)', scale: 1.1 },
  ];

  const links = [
    { source: 'c1', target: 'c2', type: 'enemy' },
    { source: 'c1', target: 'c3', type: 'ally' },
    { source: 'c1', target: 'c4', type: 'ally' },
    { source: 'c1', target: 'c5', type: 'neutral' },
    { source: 'c2', target: 'c5', type: 'neutral' },
  ];

  return (
    <div className={`relative w-full h-full ${className || ''}`} style={{ minHeight: '300px' }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="crn-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="crn-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Draw Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source);
          const target = nodes.find(n => n.id === link.target);
          if (!source || !target) return null;
          
          let strokeColor = 'var(--muted)';
          if (link.type === 'enemy') strokeColor = 'var(--danger)';
          if (link.type === 'ally') strokeColor = 'var(--success)';

          // Curved path
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2 - 20; // curve upwards slightly

          return (
            <path
              key={i}
              d={`M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              opacity="0.6"
              filter="url(#crn-glow)"
              strokeDasharray={link.type === 'neutral' ? "4,4" : "none"}
            />
          );
        })}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <g key={node.id} className="interactive-node" style={{ pointerEvents: 'auto' }} filter="url(#crn-shadow)">
            <circle cx={node.x} cy={node.y} r={16 * node.scale} fill="var(--bg)" stroke={node.color} strokeWidth="2" filter="url(#crn-glow)" />
            <circle cx={node.x} cy={node.y} r={8 * node.scale} fill="none" stroke={node.color} strokeWidth="1" opacity="0.5" />
            <circle cx={node.x} cy={node.y} r={4 * node.scale} fill={node.color} />
            
            <rect 
              x={node.x - 30} 
              y={node.y + 16 * node.scale + 6} 
              width="60" 
              height="18" 
              rx="9" 
              fill="rgba(11, 16, 35, 0.8)" 
              stroke="rgba(255,255,255,0.05)"
            />
            <text 
              x={node.x} 
              y={node.y + 16 * node.scale + 19} 
              textAnchor="middle" 
              fill="var(--fg-2)" 
              fontSize="10"
              fontFamily="var(--font-body)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
