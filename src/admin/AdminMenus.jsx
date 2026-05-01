import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from './AdminLayout'

const MENU_IDS = [
  { id: 'restaurant',   label: 'Restaurant Menu' },
  { id: 'food-corner',  label: 'Food Corner' },
  { id: 'bar',          label: 'Bar & Drinks' },
]

const DIETARY_OPTIONS = ['V', 'VG', 'GF']

function newItem() { return { name: '', description: '', price: '', dietary: [], featured: false } }
function newSection() { return { title: '', items: [newItem()] } }

export default function AdminMenus() {
  const [activeMenu, setActiveMenu] = useState('restaurant')
  const [sections, setSections]     = useState([newSection()])
  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [saved, setSaved]           = useState(false)
  const [collapsed, setCollapsed]   = useState({})

  useEffect(() => {
    setLoading(true)
    getDoc(doc(db, 'menus', activeMenu))
      .then((snap) => {
        if (snap.exists() && snap.data().sections?.length) {
          setSections(snap.data().sections)
        } else {
          setSections([newSection()])
        }
      })
      .catch(() => setSections([newSection()]))
      .finally(() => setLoading(false))
  }, [activeMenu])

  function updateSection(si, key, val) {
    setSections((prev) => prev.map((s, i) => i === si ? { ...s, [key]: val } : s))
  }

  function updateItem(si, ii, key, val) {
    setSections((prev) =>
      prev.map((s, i) =>
        i === si
          ? { ...s, items: s.items.map((item, j) => j === ii ? { ...item, [key]: val } : item) }
          : s
      )
    )
  }

  function toggleDietary(si, ii, tag) {
    const item = sections[si].items[ii]
    const dietary = item.dietary?.includes(tag)
      ? item.dietary.filter((d) => d !== tag)
      : [...(item.dietary || []), tag]
    updateItem(si, ii, 'dietary', dietary)
  }

  function addSection() { setSections((prev) => [...prev, newSection()]) }
  function removeSection(si) { setSections((prev) => prev.filter((_, i) => i !== si)) }
  function addItem(si) { setSections((prev) => prev.map((s, i) => i === si ? { ...s, items: [...s.items, newItem()] } : s)) }
  function removeItem(si, ii) { setSections((prev) => prev.map((s, i) => i === si ? { ...s, items: s.items.filter((_, j) => j !== ii) } : s)) }

  async function handleSave() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'menus', activeMenu), {
        id:         activeMenu,
        title:      MENU_IDS.find((m) => m.id === activeMenu)?.label,
        sections,
        updatedAt:  serverTimestamp(),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Error saving: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full px-3 py-2 text-sm bg-cream border border-border rounded-lg outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest'

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Menus</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
          </button>
        </div>

        {/* Menu tabs */}
        <div className="flex gap-2 mb-8">
          {MENU_IDS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMenu(m.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeMenu === m.id ? 'bg-forest text-cream' : 'bg-surface border border-border text-muted hover:border-forest'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, si) => (
              <div key={si} className="bg-surface border border-border rounded-2xl overflow-hidden">
                {/* Section header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <input
                    value={section.title}
                    onChange={(e) => updateSection(si, 'title', e.target.value)}
                    placeholder="Section title (e.g. Starters)"
                    className="flex-1 font-medium text-sm bg-transparent outline-none text-ink placeholder:text-muted"
                  />
                  <button onClick={() => setCollapsed((c) => ({ ...c, [si]: !c[si] }))} className="text-muted hover:text-ink p-1">
                    {collapsed[si] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </button>
                  <button onClick={() => removeSection(si)} className="text-muted hover:text-red-500 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>

                {!collapsed[si] && (
                  <div className="p-5 space-y-4">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <input
                          value={item.name}
                          onChange={(e) => updateItem(si, ii, 'name', e.target.value)}
                          placeholder="Item name"
                          className={`sm:col-span-4 ${inputCls}`}
                        />
                        <input
                          value={item.description}
                          onChange={(e) => updateItem(si, ii, 'description', e.target.value)}
                          placeholder="Description (optional)"
                          className={`sm:col-span-5 ${inputCls}`}
                        />
                        <input
                          value={item.price}
                          onChange={(e) => updateItem(si, ii, 'price', e.target.value)}
                          placeholder="Price"
                          className={`sm:col-span-2 ${inputCls}`}
                        />
                        <div className="sm:col-span-12 flex items-center gap-4 flex-wrap">
                          <div className="flex gap-2">
                            {DIETARY_OPTIONS.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleDietary(si, ii, tag)}
                                className={`px-2 py-0.5 text-xs font-medium rounded border transition-colors ${
                                  item.dietary?.includes(tag)
                                    ? 'bg-forest text-cream border-forest'
                                    : 'border-border text-muted hover:border-forest'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!item.featured}
                              onChange={(e) => updateItem(si, ii, 'featured', e.target.checked)}
                              className="accent-gold"
                            />
                            Chef's pick
                          </label>
                          <button onClick={() => removeItem(si, ii)} className="ml-auto text-muted hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem(si)}
                      className="flex items-center gap-1.5 text-sm text-forest hover:text-gold transition-colors"
                    >
                      <Plus size={15} /> Add item
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-2xl text-sm text-muted hover:border-forest hover:text-forest transition-colors w-full justify-center"
            >
              <Plus size={16} /> Add section
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
