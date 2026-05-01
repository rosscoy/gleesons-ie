import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const BOOKING_URL = import.meta.env.VITE_NETAFFINITY_BOOKING_URL || 'https://bookings.gleesons.ie'

const navItems = [
  {
    label: 'Sleep',
    href:  '/sleep',
    children: [
      { label: 'Classic Double',       href: '/sleep/classic-double' },
      { label: 'Classic Double/Twin',  href: '/sleep/classic-double-twin' },
      { label: 'Superior Treble',      href: '/sleep/superior-treble' },
      { label: 'Superior Double',      href: '/sleep/superior-double' },
      { label: 'Suite',                href: '/sleep/suite' },
      { label: 'Blackrock Clinic',     href: '/sleep/blackrock-clinic' },
    ],
  },
  {
    label: 'Eat & Drink',
    href:  '/eat-drink',
    children: [
      { label: 'Menus',         href: '/eat-drink/menus' },
      { label: 'Food Corner',   href: '/eat-drink/food-corner' },
      { label: 'Drink',         href: '/eat-drink/drink' },
      { label: 'Book a Table',  href: '/eat-drink/book' },
    ],
  },
  { label: 'About Us',  href: '/about' },
  { label: 'Vouchers',  href: '/vouchers' },
  { label: 'Reviews',   href: '/reviews' },
]

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!item.children) {
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${isActive ? 'text-gold' : 'text-ink hover:text-forest'}`
        }
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-ink hover:text-forest transition-colors"
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
          <NavLink
            to={item.href}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-ink hover:bg-tagbg hover:text-forest transition-colors"
          >
            Overview
          </NavLink>
          <div className="border-t border-border my-1" />
          {item.children.map((child) => (
            <NavLink
              key={child.href}
              to={child.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm transition-colors ${isActive ? 'text-gold bg-tagbg' : 'text-muted hover:bg-tagbg hover:text-forest'}`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold text-forest">Gleesons</span>
            <span className="text-[10px] uppercase tracking-widest text-muted">of Booterstown</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <DropdownItem key={item.href} item={item} />
            ))}
          </nav>

          {/* Book CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-forest text-surface text-sm font-medium rounded-lg hover:bg-forest-dark transition-colors"
            >
              Book Your Stay
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-ink hover:text-forest transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-ink hover:bg-tagbg rounded-lg transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.href ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === item.href && (
                      <div className="ml-4 mt-1 space-y-1">
                        <NavLink to={item.href} className="block px-3 py-2 text-sm font-medium text-forest hover:bg-tagbg rounded-lg">
                          Overview
                        </NavLink>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={({ isActive }) =>
                              `block px-3 py-2 text-sm rounded-lg transition-colors ${isActive ? 'text-gold bg-tagbg' : 'text-muted hover:bg-tagbg hover:text-ink'}`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-gold bg-tagbg' : 'text-ink hover:bg-tagbg'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-forest text-surface text-sm font-medium rounded-lg hover:bg-forest-dark transition-colors"
              >
                Book Your Stay
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
