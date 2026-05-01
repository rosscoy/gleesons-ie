import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SectionIntro from '../components/SectionIntro'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms'

const BOOKING_URL = import.meta.env.VITE_NETAFFINITY_BOOKING_URL || 'https://bookings.gleesons.ie'

export default function Sleep() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Page hero */}
        <div className="bg-forest py-20 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Accommodation</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Sleep at Gleesons</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">
            16 en-suite rooms in the heart of Booterstown — from cosy doubles to our signature suite.
          </p>
        </div>

        {/* Rooms grid */}
        <section className="py-16 bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.slug} room={room} />
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-tagbg">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <SectionIntro
              eyebrow="Ready to book?"
              heading="Check availability"
              body="Book directly for the best available rates. Special rates available for Blackrock Clinic staff and patients."
              centered
            />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-8 px-8 py-4 bg-forest text-cream font-medium rounded-xl hover:bg-forest-dark transition-colors"
            >
              Book Your Stay
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
