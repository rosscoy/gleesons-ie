import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, updateDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import { Upload, Trash2, X } from 'lucide-react'
import AdminLayout from './AdminLayout'

const CATEGORIES = ['Rooms', 'Food', 'Bar', 'Events', 'Exterior']

export default function AdminGallery() {
  const [images, setImages]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [category, setCategory] = useState('Food')
  const fileRef                 = useRef()

  async function load() {
    setLoading(true)
    const snap = await getDocs(query(collection(db, 'gallery'), orderBy('sortOrder')))
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)

    for (const file of files) {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`)
      const task = uploadBytesResumable(storageRef, file)

      await new Promise((resolve, reject) => {
        task.on('state_changed',
          (snap) => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
          reject,
          async () => {
            const url = await getDownloadURL(task.snapshot.ref)
            await addDoc(collection(db, 'gallery'), {
              imageUrl:  url,
              storagePath: storageRef.fullPath,
              alt:       file.name.replace(/\.[^.]+$/, ''),
              category,
              published: true,
              sortOrder: images.length + 1,
              createdAt: serverTimestamp(),
            })
            resolve()
          }
        )
      })
    }

    setUploading(false)
    setProgress(0)
    load()
    fileRef.current.value = ''
  }

  async function handleDelete(image) {
    if (!window.confirm('Delete this image?')) return
    if (image.storagePath) {
      try { await deleteObject(ref(storage, image.storagePath)) } catch {}
    }
    await deleteDoc(doc(db, 'gallery', image.id))
    load()
  }

  async function togglePublished(image) {
    await updateDoc(doc(db, 'gallery', image.id), { published: !image.published })
    load()
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink">Gallery</h1>
        </div>

        {/* Upload area */}
        <div className="bg-surface border-2 border-dashed border-border rounded-2xl p-8 text-center mb-8">
          <Upload size={28} className="text-muted mx-auto mb-3" />
          <p className="text-sm font-medium text-ink mb-1">Upload images</p>
          <p className="text-xs text-muted mb-4">JPG, PNG, WebP. Multiple files supported.</p>

          <div className="flex items-center justify-center gap-3 mb-4">
            <label className="text-xs font-medium text-ink">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 text-sm bg-cream border border-border rounded-lg outline-none"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors cursor-pointer">
            <Upload size={15} />
            {uploading ? `Uploading… ${progress}%` : 'Choose files'}
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-forest border-t-transparent rounded-full animate-spin" /></div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-muted text-sm">No images yet. Upload some above.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((img) => (
              <div key={img.id} className={`group relative rounded-xl overflow-hidden border ${img.published ? 'border-border' : 'border-amber-300 opacity-60'}`}>
                <img src={img.imageUrl} alt={img.alt} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => togglePublished(img)}
                    className="p-1.5 bg-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/40 transition-colors"
                  >
                    {img.published ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(img)} className="p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                  <p className="text-[10px] text-white/80 truncate">{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
