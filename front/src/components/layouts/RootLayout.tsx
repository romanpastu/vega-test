import { Outlet } from '@tanstack/react-router'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Suspense } from 'react'

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default RootLayout 