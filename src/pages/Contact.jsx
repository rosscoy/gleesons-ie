import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SectionIntro from '../components/SectionIntro'
import ContactForm from '../components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const MAPS_URL = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || ''

const hours = [
  { day: 'Monday – Friday',  time: '7:00am – 11:00pm' },
  { day: 'Saturday',         time: '8:00am – 11:00pm' },
  { day: 'Sunday',           time: '9:00am – 10:00pm' },
]

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Get in touch</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Contact Us</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Whether it's a question, a booking enquiry, or just to say hello — we'd love to hear from you.
          </p>
        </div>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div>
              <SectionIntro eyebrow="Send a message" heading="We'll get back to you" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold mb-4">Contact details</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-forest mt-0.5 shrink-0" />
                    <span className="text-sm text-ink">44 Booterstown Ave, Booterstown, Dublin</span>
                  </li>
                  <li>
                    <a href="tel:+35312880236" className="flex items-center gap-2.5 text-sm text-ink hover:text-forest transition-colors">
                      <Phone size={16} className="text-forest shrink-0" />
                      +353 (0)1 288 0236
                    </a>
                  </li>
                  <li>
                    <a href="mailto:gleesonsofbooterstown@gmail.com" className="flex items-center gap-2.5 text-sm text-ink hover:text-forest transition-colors">
                      <Mail size={16} className="text-forest shrink-0" />
                      gleesonsofbooterstown@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gold mb-4">Opening hours</p>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day} className="flex items-center gap-2 text-sm text-muted">
                      <Clock size={14} className="text-forest shrink-0" />
                      <span className="text-ink font-medium">{h.day}</span>
                      <span className="text-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted mt-3">Hours may vary on bank holidays and during events.</p>
              </div>

              {/* Map */}
              {MAPS_URL ? (
                <iframe
                  src={MAPS_URL}
                  title="Gleesons location"
                  className="w-full h-56 rounded-2xl border-0"
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-56 bg-forest/10 rounded-2xl flex items-center justify-center">
                  <p className="text-xs text-muted">Map will appear once configured</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
