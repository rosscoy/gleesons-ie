import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import SectionIntro from '../components/SectionIntro'

export default function Events() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'events'),
      where('published', '==', true),
      orderBy('date')
    )
    getDocs(q)
      .then((snap) => setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">What's on</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Events at Gleesons</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Live music, tasting nights, seasonal dinners, and more. Check back regularly for what's coming up.
          </p>
        </div>

        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-ink mb-2">Nothing on just yet</p>
                <p className="text-muted text-sm">Check back soon — events will be listed here as they're announced.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((ev) => <EventCard key={ev.id} event={ev} />)}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
