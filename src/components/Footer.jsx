import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}
import NewsletterSignup from './NewsletterSignup'

const BOOKING_URL = import.meta.env.VITE_NETAFFINITY_BOOKING_URL || 'https://bookings.gleesons.ie'

const footerNav = [
  { label: 'Sleep',         href: '/sleep' },
  { label: 'Eat & Drink',   href: '/eat-drink' },
  { label: 'Gallery',       href: '/gallery' },
  { label: 'Events',        href: '/events' },
  { label: 'About Us',      href: '/about' },
  { label: 'Reviews',       href: '/reviews' },
  { label: 'Vouchers',      href: '/vouchers' },
  { label: 'Contact Us',    href: '/contact' },
  { label: 'Privacy Policy',href: '/privacy-policy' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="font-serif text-xl font-semibold text-cream">Gleesons</p>
              <p className="text-xs uppercase tracking-widest text-cream/50 mt-0.5">of Booterstown</p>
            </div>
            <p className="text-sm leading-relaxed text-cream/60 mb-5">
              Award-winning family-run boutique hotel, restaurant and bar — between the city and the sea.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-forest transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com/gleesons_booterstown"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-forest transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-cream/40 mb-4">Explore</p>
            <ul className="space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-cream/40 mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-sm text-cream/60 leading-snug">
                  44 Booterstown Ave,<br />Booterstown, Dublin
                </span>
              </li>
              <li>
                <a href="tel:+35312880236" className="flex items-center gap-2.5 text-sm text-cream/60 hover:text-cream transition-colors">
                  <Phone size={15} className="shrink-0 text-gold" />
                  +353 (0)1 288 0236
                </a>
              </li>
              <li>
                <a href="mailto:gleesonsofbooterstown@gmail.com" className="flex items-center gap-2.5 text-sm text-cream/60 hover:text-cream transition-colors">
                  <Mail size={15} className="shrink-0 text-gold" />
                  gleesonsofbooterstown@gmail.com
                </a>
              </li>
            </ul>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 px-4 py-2.5 bg-forest text-cream text-sm font-medium rounded-lg hover:bg-forest-dark transition-colors"
            >
              Book Your Stay
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs uppercase tracking-widest text-cream/40 mb-4">Stay in Touch</p>
            <p className="text-sm text-cream/60 mb-4 leading-relaxed">
              Get updates on events, special offers, and seasonal menus.
            </p>
            <NewsletterSignup dark />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cream/30">
          <p>© {new Date().getFullYear()} Gleesons of Booterstown. All rights reserved.</p>
          <Link to="/privacy-policy" className="hover:text-cream/60 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
