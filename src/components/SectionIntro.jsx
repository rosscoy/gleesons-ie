export default function SectionIntro({ eyebrow, heading, body, centered = false }) {
  return (
    <div className={centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink leading-tight mb-4">
        {heading}
      </h2>
      {body && (
        <p className="text-muted leading-relaxed">{body}</p>
      )}
    </div>
  )
}
