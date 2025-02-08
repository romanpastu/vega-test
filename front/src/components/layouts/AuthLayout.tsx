import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar/Sidebar'
import { AnimatedTransition } from '@/components/animations/AnimatedTransition'

function AuthLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-800 to-slate-900">
      <Sidebar />
      <AnimatedTransition className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto dark:bg-slate-800 bg-white">
          <Outlet />
        </main>
      </AnimatedTransition>
    </div>
  )
}


export default AuthLayout 