import React from 'react';
import { NovelCover } from '@/components/shared/NovelCover';
import { DISCOVER_GENRES } from '@/data/mockData';

export function StarMapConstellation({ className }) {
  // Mock books for the visual constellation
  const books = [
    { id: '1', title: 'The Obsidian Spire', coverUrl: '' },
    { id: '2', title: 'Neon Gods', coverUrl: '' },
    { id: '3', title: 'Aethels Fall', coverUrl: '' },
    { id: '4', title: 'The Quiet Index', coverUrl: '' },
    { id: '5', title: 'Voidwalker', coverUrl: '' },
    { id: '6', title: 'Crimson Threads', coverUrl: '' },
    { id: '7', title: 'Echoes of Time', coverUrl: '' },
    { id: '8', title: 'The Last Archivist', coverUrl: '' },
    { id: '9', title: 'Fractured Lore', coverUrl: '' },
    { id: '10', title: 'Stitch in the Dark', coverUrl: '' }
  ];

  // Manual coordinates for a constellation layout
  const positions = [
    { x: 10, y: 30, scale: 0.9, genre: 'Sci-Fi' },
    { x: 25, y: 15, scale: 1.1, genre: 'Fantasy' },
    { x: 35, y: 45, scale: 0.8, genre: 'Sci-Fi' },
    { x: 50, y: 25, scale: 1.2, genre: 'Fantasy' }, // Center Hub
    { x: 65, y: 55, scale: 0.9, genre: 'Mystery' },
    { x: 75, y: 20, scale: 1, genre: 'Fantasy' },
    { x: 85, y: 45, scale: 0.8, genre: 'Sci-Fi' },
    { x: 20, y: 70, scale: 1, genre: 'Mystery' },
    { x: 45, y: 80, scale: 0.9, genre: 'Fantasy' },
    { x: 80, y: 75, scale: 1.1, genre: 'Mystery' }
  ];

  return (
    <div className={className || ''} style={{ position: 'relative', width: '100%', height: '600px' }}>
      {/* SVG connecting lines between the "stars" (books) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
         <defs>
            <filter id="glow-line">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
         </defs>
         {/* Draw abstract connecting paths between books */}
         <path 
           d="M 10 30 L 25 15 L 50 25 L 75 20 L 85 45" 
           stroke="var(--amber-glow)" 
           strokeWidth="0.5" 
           fill="none" 
           opacity="0.5"
           filter="url(#glow-line)"
         />
         <path 
           d="M 10 30 L 35 45 L 50 25 L 65 55 L 80 75" 
           stroke="var(--ethereal-violet)" 
           strokeWidth="0.5" 
           fill="none" 
           opacity="0.4"
           filter="url(#glow-line)"
         />
         <path 
           d="M 20 70 L 45 80 L 65 55" 
           stroke="var(--indigo-pulse)" 
           strokeWidth="0.5" 
           fill="none" 
           opacity="0.6"
           filter="url(#glow-line)"
         />
      </svg>

      {/* Novel Covers as Nodes */}
      {books.map((book, i) => {
        const pos = positions[i] || positions[0];
        return (
          <div 
            key={book.id} 
            className="interactive-node" 
            style={{ 
              position: 'absolute',
              left: `${pos.x}%`, 
              top: `${pos.y}%`, 
              transform: `translate(-50%, -50%) scale(${pos.scale})`,
              zIndex: 10
            }}
          >
            <div style={{ position: 'relative', width: '100px' }}>
              <NovelCover novel={book} />
              
              {/* Optional glowing halo behind the book */}
              <div 
                className="pointer-events-none" 
                style={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '4px',
                  boxShadow: `0 8px 25px rgba(0,0,0,0.9), ${pos.genre === 'Sci-Fi' ? '0 0 30px var(--indigo-pulse)' : pos.genre === 'Fantasy' ? '0 0 30px var(--amber-glow)' : '0 0 30px var(--ethereal-violet)'}`,
                  opacity: 0.8,
                  zIndex: -1
                }}
              />
            </div>
            
            {/* Hover Tooltip / Genre Label */}
            {pos.scale >= 1.1 && (
               <div className="glass-panel" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px', padding: '4px 12px', borderRadius: '9999px', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                 <span style={{ fontSize: '10px', color: 'var(--fg-2)', letterSpacing: '0.05em' }}>{pos.genre} Node</span>
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
