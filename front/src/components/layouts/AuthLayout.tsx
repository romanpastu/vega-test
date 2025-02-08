import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar/Sidebar'
import { AnimatedTransition } from '@/components/animations/AnimatedTransition'

function AuthLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      <Sidebar />
      <AnimatedTransition className="flex-1">
        <main className="h-full overflow-auto">
          <Outlet />
        </main>
      </AnimatedTransition>
    </div>
  )
}

export default AuthLayout 