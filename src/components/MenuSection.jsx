const DIETARY_COLOURS = {
  V:  'bg-green-50 text-green-700',
  VG: 'bg-emerald-50 text-emerald-700',
  GF: 'bg-amber-50 text-amber-700',
}

function MenuItem({ item }) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-ink text-sm">{item.name}</span>
          {item.dietary?.map((d) => (
            <span key={d} className={`text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide ${DIETARY_COLOURS[d] || 'bg-tagbg text-muted'}`}>
              {d}
            </span>
          ))}
          {item.featured && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide bg-gold/10 text-gold">
              Chef's pick
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted mt-0.5 leading-relaxed">{item.description}</p>
        )}
      </div>
      {item.price && (
        <span className="text-sm font-semibold text-forest shrink-0">{item.price}</span>
      )}
    </div>
  )
}

export default function MenuSection({ section }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="font-serif text-xl font-semibold text-ink mb-1">{section.title}</h3>
      {section.subtitle && <p className="text-sm text-muted mb-3">{section.subtitle}</p>}
      <div className="bg-surface border border-border rounded-2xl px-5">
        {section.items?.map((item, i) => (
          <MenuItem key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
