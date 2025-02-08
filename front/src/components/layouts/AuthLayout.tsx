import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar/Sidebar'
import { AnimatedTransition } from '@/components/animations/AnimatedTransition'

function AuthLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <AnimatedTransition className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto bg-background">
          <Outlet />
        </main>
      </AnimatedTransition>
    </div>
  )
}

export default AuthLayout 