import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ANIMATION_CLASSES } from '@/constants/animations'

export type AnimatedTransitionProps = {
  children: ReactNode
  isExiting?: boolean
  className?: string
}

export function AnimatedTransition({ 
  children, 
  isExiting = false,
  className 
}: AnimatedTransitionProps) {
  return (
    <div
      className={cn(
        ANIMATION_CLASSES.DEFAULT_TRANSITION,
        'animate-in fade-in slide-in-from-bottom-4',
        isExiting && 'animate-out fade-out slide-out-to-top-4',
        className
      )}
    >
      {children}
    </div>
  )
} 