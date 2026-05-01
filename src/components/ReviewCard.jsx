import { Star } from 'lucide-react'

const sourceBadge = {
  Google:      'bg-blue-50 text-blue-700',
  TripAdvisor: 'bg-green-50 text-green-700',
  Direct:      'bg-tagbg text-forest',
}

export default function ReviewCard({ review }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < review.rating ? 'fill-gold text-gold' : 'text-border'}
          />
        ))}
      </div>

      <p className="text-sm text-ink leading-relaxed flex-1 mb-4 italic">"{review.text}"</p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-ink">{review.author}</p>
          {review.date && <p className="text-xs text-muted">{review.date}</p>}
        </div>
        {review.source && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${sourceBadge[review.source] || sourceBadge.Direct}`}>
            {review.source}
          </span>
        )}
      </div>
    </div>
  )
}
