import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ANIMATION_DURATION, ANIMATION_CLASSES } from '@/constants/animations'

export function LogoutButton() {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  const handleLogout = async () => {
    setIsExiting(true)
    await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION.DEFAULT))
    localStorage.removeItem('jwt')
    navigate({ to: '/login' })
  }

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "mt-auto mb-6 p-3 rounded-lg text-destructive-foreground",
        ANIMATION_CLASSES.DEFAULT_TRANSITION,
        isExiting 
          ? "bg-destructive/50 opacity-50 scale-95" 
          : "bg-destructive hover:bg-destructive/90 hover:scale-105"
      )}
      disabled={isExiting}
    >
      <LogOut 
        size={20}
        className={cn(
          ANIMATION_CLASSES.DEFAULT_TRANSITION,
          isExiting 
            ? "opacity-0 -translate-x-2" 
            : "opacity-100 translate-x-0"
        )}
      />
    </button>
  )
} 