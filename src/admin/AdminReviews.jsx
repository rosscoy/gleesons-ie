import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Plus, Trash2, Edit2, X, Star } from 'lucide-react'
import AdminLayout from './AdminLayout'

const EMPTY = { author: '', text: '', rating: 5, source: 'Google', date: '', published: false }
const SOURCES = ['Google', 'TripAdvisor', 'Direct']

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState(null)
  const [saving, setSaving]   = useState(false)

  async function load() {
    setLoading(true)
    const snap = await getDocs(collection(db, 'reviews'))
    setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function update(field, val) { setForm((f) => ({ ...f, [field]: val })) }

  async function handleSave() {
    if (!form.author || !form.text) return
    setSaving(true)
    try {
      const data = { ...form }
      delete data.id
      if (form.id) {
        await updateDoc(doc(db, 'reviews', form.id), data)
      } else {
        await addDoc(collection(db, 'reviews'), { ...data, createdAt: serverTimestamp() })
      }
      setForm(null)
      load()
    } catch (e) {
      alert('Error: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this review?')) return
    await deleteDoc(doc(db, 'reviews', id))
    load()
  }

  async function togglePublished(r) {
    await updateDoc(doc(db, 'reviews', r.id), { published: !r.published })
    load()
  }

  const inputCls = 'w-full px-3 py-2 text-sm bg-cream border border-border rounded-lg outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest'

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Reviews</h1>
          <button onClick={() => setForm(EMPTY)} className="flex items-center gap-2 px-4 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors">
            <Plus size={15} /> Add review
          </button>
        </div>

        {form && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg font-semibold text-ink">{form.id ? 'Edit review' : 'Add review'}</h2>
                <button onClick={() => setForm(null)} className="text-muted hover:text-ink"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Author *</label>
                  <input value={form.author} onChange={(e) => update('author', e.target.value)} placeholder="Guest name" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Review *</label>
                  <textarea rows={4} value={form.text} onChange={(e) => update('text', e.target.value)} placeholder="Review text…" className={`${inputCls} resize-none`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">Rating</label>
                    <select value={form.rating} onChange={(e) => update('rating', Number(e.target.value))} className={inputCls}>
                      {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">Source</label>
                    <select value={form.source} onChange={(e) => update('source', e.target.value)} className={inputCls}>
                      {SOURCES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Date displayed</label>
                  <input value={form.date} onChange={(e) => update('date', e.target.value)} placeholder="e.g. April 2025" className={inputCls} />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} className="accent-forest" />
                  Published
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setForm(null)} className="px-4 py-2.5 border border-border text-muted text-sm rounded-xl hover:border-ink">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" /></div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center text-muted text-sm">No reviews yet.</div>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-surface border border-border rounded-2xl px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-ink text-sm">{r.author}</p>
                    <span className="text-xs text-muted">{r.date}</span>
                    <span className="text-xs text-muted">· {r.source}</span>
                  </div>
                  <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < r.rating ? 'fill-gold text-gold' : 'text-border'} />)}</div>
                  <p className="text-xs text-muted line-clamp-2 italic">"{r.text}"</p>
                </div>
                <button onClick={() => togglePublished(r)} className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${r.published ? 'bg-green-50 text-green-700' : 'bg-tagbg text-muted'}`}>
                  {r.published ? 'Live' : 'Draft'}
                </button>
                <button onClick={() => setForm({ ...r })} className="text-muted hover:text-forest"><Edit2 size={15} /></button>
                <button onClick={() => handleDelete(r.id)} className="text-muted hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
