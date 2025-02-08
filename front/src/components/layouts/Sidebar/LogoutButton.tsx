import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate({ to: '/login' })
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-auto mb-6 p-3 rounded-lg bg-slate-700/50 text-white hover:bg-slate-700 transition-colors"
    >
      <LogOut size={20} />
    </button>
  )
} 