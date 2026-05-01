import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Save } from 'lucide-react'
import AdminLayout from './AdminLayout'

const DEFAULTS = {
  phone:                 '+353 (0)1 288 0236',
  email:                 'gleesonsofbooterstown@gmail.com',
  address:               '44 Booterstown Ave, Booterstown, Dublin',
  facebook:              '',
  instagram:             'https://instagram.com/gleesons_booterstown',
  heroHeadline:          'Between the city & the sea',
  heroSubtext:           'A family-run boutique hotel, restaurant and bar in the heart of Booterstown, Dublin.',
  netAffinityVoucherUrl: '',
  googleMapsEmbedUrl:    '',
}

const fields = [
  { key: 'heroHeadline',          label: 'Hero headline',          type: 'text' },
  { key: 'heroSubtext',           label: 'Hero subtext',           type: 'textarea' },
  { key: 'phone',                 label: 'Phone number',           type: 'text' },
  { key: 'email',                 label: 'Email address',          type: 'email' },
  { key: 'address',               label: 'Address',                type: 'text' },
  { key: 'facebook',              label: 'Facebook URL',           type: 'url' },
  { key: 'instagram',             label: 'Instagram URL',          type: 'url' },
  { key: 'netAffinityVoucherUrl', label: 'Net Affinity voucher URL', type: 'url' },
  { key: 'googleMapsEmbedUrl',    label: 'Google Maps embed src URL', type: 'url' },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULTS)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'content', 'settings'))
      .then((snap) => { if (snap.exists()) setSettings({ ...DEFAULTS, ...snap.data() }) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function update(key, val) { setSettings((s) => ({ ...s, [key]: val })) }

  async function handleSave() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'content', 'settings'), settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Error: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full px-3 py-2.5 text-sm bg-cream border border-border rounded-xl outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest'

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Settings</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-5">
            {fields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-ink mb-1.5">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={settings[key] || ''}
                    onChange={(e) => update(key, e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                ) : (
                  <input
                    type={type}
                    value={settings[key] || ''}
                    onChange={(e) => update(key, e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
