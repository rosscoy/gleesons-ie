import { Link } from 'react-router-dom'
import { UtensilsCrossed, CalendarDays, Star, Image, BedDouble, Settings, ArrowRight } from 'lucide-react'
import AdminLayout from './AdminLayout'

const tiles = [
  { to: '/admin/menus',    label: 'Menus',    desc: 'Edit restaurant, Food Corner and bar menus',    icon: <UtensilsCrossed size={22} className="text-gold" /> },
  { to: '/admin/events',   label: 'Events',   desc: 'Add and manage upcoming events',                icon: <CalendarDays size={22} className="text-gold" /> },
  { to: '/admin/reviews',  label: 'Reviews',  desc: 'Manage guest testimonials',                     icon: <Star size={22} className="text-gold" /> },
  { to: '/admin/gallery',  label: 'Gallery',  desc: 'Upload and organise gallery images',            icon: <Image size={22} className="text-gold" /> },
  { to: '/admin/rooms',    label: 'Rooms',    desc: 'Update room descriptions and amenities',        icon: <BedDouble size={22} className="text-gold" /> },
  { to: '/admin/settings', label: 'Settings', desc: 'Contact details, social links, hero content',  icon: <Settings size={22} className="text-gold" /> },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-semibold text-ink">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Welcome back. What would you like to update today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <Link
              key={tile.to}
              to={tile.to}
              className="group bg-surface border border-border rounded-2xl p-6 hover:shadow-md hover:border-forest/30 transition-all"
            >
              <div className="mb-3">{tile.icon}</div>
              <h2 className="font-medium text-ink mb-1">{tile.label}</h2>
              <p className="text-sm text-muted mb-4 leading-snug">{tile.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-forest group-hover:text-gold transition-colors">
                Manage <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
