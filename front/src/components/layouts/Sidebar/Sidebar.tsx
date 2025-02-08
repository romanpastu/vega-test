import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { LogoutButton } from './LogoutButton'

export function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center border-r border-slate-700">
      <Logo />
      <Navigation />
      <LogoutButton />
    </aside>
  )
} 