import { Calendar, Clock, ExternalLink } from 'lucide-react'

function formatDate(ts) {
  const d = ts?.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function EventCard({ event }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/9] bg-forest/10">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest/20 to-forest/5">
            <span className="text-sm text-muted">Photo coming soon</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-ink mb-2">{event.title}</h3>

        <div className="flex flex-wrap gap-3 text-xs text-muted mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-gold" />
            {formatDate(event.date)}
          </span>
          {event.time && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-gold" />
              {event.time}
            </span>
          )}
        </div>

        {event.description && (
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{event.description}</p>
        )}

        {event.ticketUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-gold transition-colors"
          >
            Get tickets <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  )
}
