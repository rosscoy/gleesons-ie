import { useState } from 'react'
import { Send } from 'lucide-react'

const FORMSPREE_URL = 'https://formspree.io/f/REPLACE_WITH_GLEESONS_ID'

export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="font-serif text-xl text-green-800 mb-2">Message sent!</p>
        <p className="text-sm text-green-700">We'll be in touch as soon as possible.</p>
      </div>
    )
  }

  const inputCls = 'w-full px-4 py-3 text-sm bg-surface border border-border rounded-xl outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition placeholder:text-muted/60'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">Name *</label>
          <input required type="text" placeholder="Your name" value={form.name} onChange={update('name')} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">Email *</label>
          <input required type="email" placeholder="your@email.com" value={form.email} onChange={update('email')} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-ink mb-1.5">Phone <span className="text-muted font-normal">(optional)</span></label>
        <input type="tel" placeholder="+353 ..." value={form.phone} onChange={update('phone')} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-ink mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          value={form.message}
          onChange={update('message')}
          className={`${inputCls} resize-none`}
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong — please try again or call us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex items-center gap-2 px-6 py-3 bg-forest text-surface text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-60"
      >
        <Send size={15} />
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
