
import { Link, Outlet } from '@tanstack/react-router'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

function AuthLayout() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex-none bg-background border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <nav className="flex gap-4">
            <Link to="/route1">
              <Button>Go to Route 1</Button>
            </Link>
            <Link to="/route2">
              <Button>Go to Route 2</Button>
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout 