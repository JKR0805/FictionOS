import { cn, coverGradient } from '@/lib/utils'

/**
 * NovelCover — the 3:4 aspect-ratio placeholder matching .cover from prototype
 */
export function NovelCover({ title, novelId, coverUrl, width, height, className, style }) {
  const color = coverGradient(novelId ? novelId.charCodeAt(novelId.length - 1) : 0)

  if (coverUrl) {
    return (
      <div
        className={cn('cover', className)}
        style={{
          width,
          height,
          background: 'var(--surface)',
          padding: 0,
          overflow: 'hidden',
          ...style,
        }}
        aria-label={`Cover of ${title}`}
      >
        <img 
          src={coverUrl} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
      </div>
    )
  }

  return (
    <div
      className={cn('cover', className)}
      style={{
        width,
        height,
        background: color,
        ...style,
      }}
      aria-label={`Cover of ${title}`}
    >
      <span style={{ opacity: 0.7, fontSize: 'inherit' }}>
        {title?.substring(0, 12)}
      </span>
    </div>
  )
}
