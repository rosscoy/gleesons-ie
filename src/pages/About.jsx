import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SectionIntro from '../components/SectionIntro'
import { MapPin, Phone, Mail } from 'lucide-react'

const MAPS_URL = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || ''

export default function About() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream">
        <div className="bg-forest py-20 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Our story</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">About Gleesons</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">
            A family-run institution in the heart of Booterstown since the early 1990s.
          </p>
        </div>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionIntro
                eyebrow="Who we are"
                heading="Family, food & hospitality"
                body="Gleesons of Booterstown has been welcoming guests for over three decades. What started as a local pub has grown into an award-winning boutique hotel, restaurant and bar — all while staying true to the family values that built it."
              />
              <p className="text-muted leading-relaxed mt-6">
                We believe that great hospitality is about making people feel at home. Every guest is welcomed like a regular, every meal is made with care, and every room is a comfortable retreat from the bustle of Dublin.
              </p>
              <p className="text-muted leading-relaxed mt-4">
                Booterstown is a special place — leafy, coastal, close enough to the city but far enough to breathe — and Gleesons has been part of its fabric for a generation.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-forest/20 to-gold/10 rounded-3xl flex items-center justify-center">
              <p className="text-sm text-muted">Team photography coming soon</p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 bg-tagbg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionIntro
              eyebrow="Find us"
              heading="Getting to Gleesons"
              body="We're on Booterstown Avenue, just off the main Rock Road and a 2-minute walk from Booterstown DART station."
              centered
            />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {MAPS_URL ? (
                  <iframe
                    src={MAPS_URL}
                    title="Gleesons location map"
                    className="w-full h-80 rounded-2xl border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-80 bg-forest/10 rounded-2xl flex items-center justify-center">
                    <p className="text-sm text-muted">Map will appear here once configured</p>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">Address</p>
                  <p className="text-sm text-ink leading-relaxed flex items-start gap-2">
                    <MapPin size={15} className="text-forest mt-0.5 shrink-0" />
                    44 Booterstown Ave,<br />Booterstown, Dublin
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">Phone</p>
                  <a href="tel:+35312880236" className="text-sm text-ink flex items-center gap-2 hover:text-forest transition-colors">
                    <Phone size={15} className="text-forest shrink-0" />
                    +353 (0)1 288 0236
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">Email</p>
                  <a href="mailto:gleesonsofbooterstown@gmail.com" className="text-sm text-ink flex items-center gap-2 hover:text-forest transition-colors">
                    <Mail size={15} className="text-forest shrink-0" />
                    gleesonsofbooterstown@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-2">DART</p>
                  <p className="text-sm text-muted">Booterstown DART station — 2 min walk</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
