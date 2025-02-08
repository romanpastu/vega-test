import { Outlet } from '@tanstack/react-router'
import { ThemeToggle } from '../ui/ThemeToggle'

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}

export default RootLayout 