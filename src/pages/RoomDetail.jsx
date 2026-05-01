import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Maximize2 } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { rooms } from '../data/rooms'

const BOOKING_URL = import.meta.env.VITE_NETAFFINITY_BOOKING_URL || 'https://bookings.gleesons.ie'

export default function RoomDetail() {
  const { roomSlug } = useParams()
  const room = rooms.find((r) => r.slug === roomSlug)

  if (!room) {
    return (
      <>
        <Nav />
        <main className="pt-16 min-h-screen flex items-center justify-center bg-cream">
          <div className="text-center">
            <p className="text-muted mb-4">Room not found.</p>
            <Link to="/sleep" className="text-forest underline text-sm">Back to rooms</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const currentIndex = rooms.findIndex((r) => r.slug === roomSlug)
  const prev = rooms[currentIndex - 1]
  const next = rooms[currentIndex + 1]

  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream">

        {/* Hero image placeholder */}
        <div className="aspect-[21/9] bg-gradient-to-br from-forest/30 to-gold/10 flex items-center justify-center">
          {room.image
            ? <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            : <p className="text-muted text-sm">Room photography coming soon</p>
          }
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <Link to="/sleep" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-forest transition-colors mb-6">
            <ArrowLeft size={14} /> All rooms
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Accommodation</p>
              <h1 className="font-serif text-4xl font-semibold text-ink mb-4">{room.name}</h1>

              <div className="flex items-center gap-6 text-sm text-muted mb-6">
                <span className="flex items-center gap-1.5"><Maximize2 size={14} />{room.size}</span>
                <span className="flex items-center gap-1.5"><Users size={14} />{room.guests} guests</span>
              </div>

              <p className="text-muted leading-relaxed mb-8">{room.description}</p>

              <h2 className="font-serif text-xl font-semibold text-ink mb-4">Room amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted">
                    <CheckCircle2 size={15} className="text-forest shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
                <p className="font-serif text-xl font-semibold text-ink mb-2">{room.name}</p>
                <p className="text-sm text-muted mb-6">Check availability and book directly for the best rate.</p>
                <a
                  href={room.bookingUrl || BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3.5 bg-forest text-cream font-medium rounded-xl hover:bg-forest-dark transition-colors"
                >
                  Check Availability
                </a>
                <p className="text-xs text-muted text-center mt-3">Best rate guaranteed when booking direct</p>
              </div>
            </div>
          </div>

          {/* Prev / next navigation */}
          <div className="mt-14 pt-8 border-t border-border flex justify-between items-center">
            {prev ? (
              <Link to={`/sleep/${prev.slug}`} className="flex items-center gap-2 text-sm text-muted hover:text-forest transition-colors">
                <ArrowLeft size={15} /> {prev.name}
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/sleep/${next.slug}`} className="flex items-center gap-2 text-sm text-muted hover:text-forest transition-colors">
                {next.name} <ArrowRight size={15} />
              </Link>
            ) : <span />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
