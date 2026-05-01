import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { rooms as defaultRooms } from '../data/rooms'

export default function AdminRooms() {
  const [rooms, setRooms]   = useState(defaultRooms)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [open, setOpen]     = useState(null)

  useEffect(() => {
    getDoc(doc(db, 'content', 'rooms'))
      .then((snap) => { if (snap.exists() && snap.data().rooms?.length) setRooms(snap.data().rooms) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function updateRoom(slug, key, val) {
    setRooms((prev) => prev.map((r) => r.slug === slug ? { ...r, [key]: val } : r))
  }

  function addAmenity(slug) {
    setRooms((prev) =>
      prev.map((r) => r.slug === slug ? { ...r, amenities: [...(r.amenities || []), ''] } : r)
    )
  }

  function updateAmenity(slug, i, val) {
    setRooms((prev) =>
      prev.map((r) =>
        r.slug === slug
          ? { ...r, amenities: r.amenities.map((a, j) => j === i ? val : a) }
          : r
      )
    )
  }

  function removeAmenity(slug, i) {
    setRooms((prev) =>
      prev.map((r) => r.slug === slug ? { ...r, amenities: r.amenities.filter((_, j) => j !== i) } : r)
    )
  }

  async function handleSave() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'content', 'rooms'), { rooms })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Error: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full px-3 py-2 text-sm bg-cream border border-border rounded-lg outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest'

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Rooms</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save all'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => (
              <div key={room.slug} className="bg-surface border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === room.slug ? null : room.slug)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="font-medium text-ink">{room.name}</span>
                  {open === room.slug ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </button>

                {open === room.slug && (
                  <div className="px-5 pb-5 border-t border-border space-y-4 pt-4">
                    <div>
                      <label className="block text-xs font-medium text-ink mb-1">Short description (card)</label>
                      <input value={room.shortDesc || ''} onChange={(e) => updateRoom(room.slug, 'shortDesc', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink mb-1">Full description</label>
                      <textarea rows={4} value={room.description || ''} onChange={(e) => updateRoom(room.slug, 'description', e.target.value)} className={`${inputCls} resize-none`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-ink mb-1">Size</label>
                        <input value={room.size || ''} onChange={(e) => updateRoom(room.slug, 'size', e.target.value)} placeholder="e.g. 28m²" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink mb-1">Guests</label>
                        <input value={room.guests || ''} onChange={(e) => updateRoom(room.slug, 'guests', e.target.value)} placeholder="e.g. 1–2" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink mb-2">Amenities</label>
                      <div className="space-y-2">
                        {room.amenities?.map((a, i) => (
                          <div key={i} className="flex gap-2">
                            <input value={a} onChange={(e) => updateAmenity(room.slug, i, e.target.value)} className={`flex-1 ${inputCls}`} />
                            <button onClick={() => removeAmenity(room.slug, i)} className="text-muted hover:text-red-500"><Trash2 size={14} /></button>
                          </div>
                        ))}
                        <button onClick={() => addAmenity(room.slug)} className="flex items-center gap-1.5 text-sm text-forest hover:text-gold transition-colors">
                          <Plus size={14} /> Add amenity
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
