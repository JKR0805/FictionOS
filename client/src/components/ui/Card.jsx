import { cn } from '@/lib/utils'

export function Card({ children, className, interactive, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn('card', interactive && 'interactive-card', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardPad({ children, className, ...props }) {
  return (
    <div className={cn('card card-pad', className)} {...props}>
      {children}
    </div>
  )
}

export function PanelHead({ children, className, ...props }) {
  return (
    <div className={cn('panel-head', className)} {...props}>
      {children}
    </div>
  )
}

export function PanelBody({ children, className, ...props }) {
  return (
    <div className={cn('panel-body', className)} {...props}>
      {children}
    </div>
  )
}
