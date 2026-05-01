import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { X } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const CATEGORIES = ['All', 'Rooms', 'Food', 'Bar', 'Events', 'Exterior']

export default function Gallery() {
  const [images, setImages]     = useState([])
  const [filter, setFilter]     = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'gallery'),
      where('published', '==', true),
      orderBy('sortOrder')
    )
    getDocs(q)
      .then((snap) => setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const visible = filter === 'All' ? images : images.filter((img) => img.category === filter)

  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Explore</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Gallery</h1>
        </div>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    filter === cat
                      ? 'bg-forest text-cream'
                      : 'bg-surface border border-border text-muted hover:border-forest hover:text-forest'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              </div>
            ) : visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted">Gallery photos coming soon.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {visible.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setLightbox(img)}
                    className="block w-full rounded-xl overflow-hidden hover:opacity-90 transition-opacity focus:outline-none"
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.alt || ''}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox.imageUrl}
            alt={lightbox.alt || ''}
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </>
  )
}
