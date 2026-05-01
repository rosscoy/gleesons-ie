import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react'
import AdminLayout from './AdminLayout'

const EMPTY = { title: '', date: '', time: '', description: '', imageUrl: '', ticketUrl: '', published: false }

function formatDate(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminEvents() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState(null) // null = closed, {} = new, {id,...} = editing
  const [saving, setSaving]   = useState(false)

  async function load() {
    setLoading(true)
    const snap = await getDocs(query(collection(db, 'events'), orderBy('date')))
    setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function update(field, val) { setForm((f) => ({ ...f, [field]: val })) }

  async function handleSave() {
    if (!form.title || !form.date) return
    setSaving(true)
    try {
      const data = {
        ...form,
        date: Timestamp.fromDate(new Date(form.date)),
        updatedAt: serverTimestamp(),
      }
      delete data.id
      if (form.id) {
        await updateDoc(doc(db, 'events', form.id), data)
      } else {
        await addDoc(collection(db, 'events'), { ...data, createdAt: serverTimestamp() })
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
    if (!window.confirm('Delete this event?')) return
    await deleteDoc(doc(db, 'events', id))
    load()
  }

  async function togglePublished(event) {
    await updateDoc(doc(db, 'events', event.id), { published: !event.published })
    load()
  }

  const inputCls = 'w-full px-3 py-2 text-sm bg-cream border border-border rounded-lg outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest'

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Events</h1>
          <button
            onClick={() => setForm(EMPTY)}
            className="flex items-center gap-2 px-4 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors"
          >
            <Plus size={15} /> New event
          </button>
        </div>

        {/* Event form modal */}
        {form && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg font-semibold text-ink">{form.id ? 'Edit event' : 'New event'}</h2>
                <button onClick={() => setForm(null)} className="text-muted hover:text-ink"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Title *</label>
                  <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Event name" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">Date *</label>
                    <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">Time</label>
                    <input type="text" value={form.time} onChange={(e) => update('time', e.target.value)} placeholder="7:30pm" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Event details…" className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Image URL</label>
                  <input value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} placeholder="https://…" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">Ticket link (optional)</label>
                  <input value={form.ticketUrl} onChange={(e) => update('ticketUrl', e.target.value)} placeholder="https://…" className={inputCls} />
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
                <button onClick={() => setForm(null)} className="px-4 py-2.5 border border-border text-muted text-sm rounded-xl hover:border-ink">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="py-20 text-center text-muted text-sm">No events yet. Add one above.</div>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="bg-surface border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink text-sm truncate">{ev.title}</p>
                  <p className="text-xs text-muted">{formatDate(ev.date)}{ev.time ? ` · ${ev.time}` : ''}</p>
                </div>
                <button
                  onClick={() => togglePublished(ev)}
                  className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${ev.published ? 'bg-green-50 text-green-700' : 'bg-tagbg text-muted'}`}
                >
                  {ev.published ? 'Live' : 'Draft'}
                </button>
                <button onClick={() => setForm({ ...ev, date: ev.date?.toDate ? ev.date.toDate().toISOString().split('T')[0] : ev.date })} className="text-muted hover:text-forest">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(ev.id)} className="text-muted hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
