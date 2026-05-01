import { Link } from 'react-router-dom'
import { ArrowRight, Star, Award, UtensilsCrossed, BedDouble, Wine, ShoppingBag } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SectionIntro from '../components/SectionIntro'
import RoomCard from '../components/RoomCard'
import EventCard from '../components/EventCard'
import { rooms } from '../data/rooms'

const BOOKING_URL = import.meta.env.VITE_NETAFFINITY_BOOKING_URL || 'https://bookings.gleesons.ie'

const pillars = [
  {
    icon:  <BedDouble size={28} className="text-gold" />,
    label: 'Sleep',
    desc:  '16 en-suite bedrooms — from classic doubles to our signature suite.',
    href:  '/sleep',
  },
  {
    icon:  <UtensilsCrossed size={28} className="text-gold" />,
    label: 'Eat',
    desc:  'Fine dining with locally sourced produce. Breakfast, lunch, and dinner.',
    href:  '/eat-drink/menus',
  },
  {
    icon:  <Wine size={28} className="text-gold" />,
    label: 'Drink',
    desc:  'A carefully curated bar — craft beers, fine wines, and classic cocktails.',
    href:  '/eat-drink/drink',
  },
  {
    icon:  <ShoppingBag size={28} className="text-gold" />,
    label: 'Food Corner',
    desc:  'Artisan sandwiches, fresh pastries, and takeaway meals to go.',
    href:  '/eat-drink/food-corner',
  },
]

const stats = [
  { value: '16',    label: 'En-suite bedrooms' },
  { value: '5★',    label: 'Dining experience' },
  { value: '30+',   label: 'Years of hospitality' },
  { value: '100%',  label: 'Family run' },
]

// Placeholder featured events — will be replaced with Firestore data
const featuredEvents = []

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest">
        {/* Placeholder for hero image/video — swap with <video> or <img> once assets arrive */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest/70" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-cream/80 text-xs font-medium mb-6 backdrop-blur-sm">
            <Award size={13} className="text-gold" />
            Award-winning boutique hotel
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-cream leading-tight mb-6">
            Between the<br />
            <span className="italic text-gold">city & the sea</span>
          </h1>

          <p className="text-cream/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            A family-run boutique hotel, restaurant and bar in the heart of Booterstown, Dublin.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-white font-medium rounded-xl hover:bg-gold-hover transition-colors"
            >
              Book Your Stay
              <ArrowRight size={16} />
            </a>
            <Link
              to="/eat-drink/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-cream font-medium rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Book a Table
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold text-gold" />)}
            <span className="text-cream/60 text-sm ml-2">Rated 5 stars on Google</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40">
          <div className="w-px h-8 bg-cream/20 animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionIntro
            eyebrow="Welcome"
            heading="Everything under one roof"
            body="Whether you're staying the night, dining in, or just popping in for a bite — Gleesons has you covered."
            centered
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <Link
                key={p.label}
                to={p.href}
                className="group block bg-surface border border-border rounded-2xl p-6 hover:shadow-md hover:border-forest/30 transition-all"
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="font-serif text-lg font-semibold text-ink mb-2">{p.label}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-forest group-hover:text-gold transition-colors">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-20 bg-tagbg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionIntro
              eyebrow="Accommodation"
              heading="Rest well in Booterstown"
              body="16 en-suite rooms — each one a warm retreat, just minutes from the DART and the sea."
            />
            <Link
              to="/sleep"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold transition-colors shrink-0"
            >
              All rooms <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-forest">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl font-semibold text-gold mb-1">{s.value}</p>
                <p className="text-sm text-cream/60 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionIntro
                eyebrow="Eat & Drink"
                heading="Five-star dining, locally sourced"
                body="Our kitchen is built around the finest Irish produce — from sea to table and farm to fork. Whether it's a leisurely dinner, a quick Food Corner lunch, or drinks at the bar, everything is made with care."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/eat-drink/menus" className="px-4 py-2.5 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors">
                  View Menus
                </Link>
                <Link to="/eat-drink/book" className="px-4 py-2.5 border border-forest text-forest text-sm font-medium rounded-xl hover:bg-forest/5 transition-colors">
                  Book a Table
                </Link>
              </div>
            </div>
            {/* Placeholder for dining photo */}
            <div className="aspect-[4/3] bg-gradient-to-br from-forest/20 to-gold/10 rounded-3xl flex items-center justify-center">
              <p className="text-sm text-muted">Dining photography coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      {featuredEvents.length > 0 && (
        <section className="py-20 bg-tagbg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <SectionIntro eyebrow="Events" heading="What's on at Gleesons" />
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold transition-colors shrink-0">
                All events <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredEvents.map((ev) => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Placeholder for exterior photo */}
            <div className="aspect-[4/3] bg-gradient-to-br from-forest/10 to-gold/10 rounded-3xl flex items-center justify-center order-2 lg:order-1">
              <p className="text-sm text-muted">Exterior photography coming soon</p>
            </div>
            <div className="order-1 lg:order-2">
              <SectionIntro
                eyebrow="Our story"
                heading="A Booterstown institution"
                body="For over three decades, Gleesons has been the heartbeat of Booterstown. A family-run hotel that feels like a home-from-home — where the staff know your name, the food is always fresh, and the welcome is always warm."
              />
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-forest hover:text-gold transition-colors"
              >
                Read our story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-forest">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-cream mb-4">
            Ready to visit?
          </h2>
          <p className="text-cream/60 text-lg mb-10">
            Book a room, reserve a table, or just come in and say hello.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-white font-medium rounded-xl hover:bg-gold-hover transition-colors"
            >
              Book Your Stay
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-cream font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
