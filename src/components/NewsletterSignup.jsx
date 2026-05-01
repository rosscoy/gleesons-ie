import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function NewsletterSignup({ dark = false }) {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState('idle') // idle | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    // TODO: wire up Mailchimp or email platform once client provides details
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <p className={`text-sm ${dark ? 'text-cream/70' : 'text-muted'}`}>
        Thanks — you\'re on the list!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className={`flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-forest/40
          ${dark
            ? 'bg-white/10 border-white/20 text-cream placeholder:text-cream/30 focus:border-forest'
            : 'bg-surface border-border text-ink placeholder:text-muted focus:border-forest'
          }`}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className={`px-3 py-2 rounded-lg transition-colors
          ${dark
            ? 'bg-forest text-cream hover:bg-forest-dark'
            : 'bg-forest text-surface hover:bg-forest-dark'
          }`}
      >
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
