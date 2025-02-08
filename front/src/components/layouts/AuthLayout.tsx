import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar/Sidebar'

function AuthLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout 