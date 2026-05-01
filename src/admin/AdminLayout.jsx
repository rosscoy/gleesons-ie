import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import {
  LayoutDashboard, UtensilsCrossed, CalendarDays, Star,
  Image, BedDouble, Settings, LogOut,
} from 'lucide-react'

const links = [
  { to: '/admin',          label: 'Dashboard',  icon: <LayoutDashboard size={18} />, end: true },
  { to: '/admin/menus',    label: 'Menus',      icon: <UtensilsCrossed size={18} /> },
  { to: '/admin/events',   label: 'Events',     icon: <CalendarDays size={18} /> },
  { to: '/admin/reviews',  label: 'Reviews',    icon: <Star size={18} /> },
  { to: '/admin/gallery',  label: 'Gallery',    icon: <Image size={18} /> },
  { to: '/admin/rooms',    label: 'Rooms',      icon: <BedDouble size={18} /> },
  { to: '/admin/settings', label: 'Settings',   icon: <Settings size={18} /> },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut(auth)
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-tagbg">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-ink flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="font-serif text-sm font-semibold text-cream">Gleesons</p>
          <p className="text-[10px] text-cream/40 uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-forest text-cream'
                    : 'text-cream/60 hover:bg-white/10 hover:text-cream'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-cream/60 hover:bg-white/10 hover:text-cream transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
