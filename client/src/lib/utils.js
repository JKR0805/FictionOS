import { clsx } from 'clsx'

/** Merge class names */
export function cn(...inputs) {
  return clsx(inputs)
}

/** Format large numbers */
export function formatCount(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
  return String(num)
}

/** Format date as relative string */
export function formatRelativeDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Get user initials from display name */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map(s => s[0])
    .join('')
    .toUpperCase()
}

/** Generate a placeholder gradient background for covers */
export function coverGradient(seed) {
  const hue = (seed * 137.508) % 360
  return `hsl(${hue}, 30%, 45%)`
}
