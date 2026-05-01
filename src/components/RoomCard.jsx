import { Link } from 'react-router-dom'
import { ArrowRight, Users, Maximize2 } from 'lucide-react'

export default function RoomCard({ room }) {
  return (
    <Link
      to={`/sleep/${room.slug}`}
      className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-forest/10 relative overflow-hidden">
        {room.image ? (
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest/20 to-forest/5">
            <span className="text-sm text-muted">Photo coming soon</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-ink mb-1">{room.name}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{room.shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <Maximize2 size={13} />
            {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {room.guests} guests
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest group-hover:text-gold transition-colors">
          View room
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
