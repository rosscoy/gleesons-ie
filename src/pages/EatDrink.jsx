import { Link } from 'react-router-dom'
import { ArrowRight, UtensilsCrossed, ShoppingBag, Wine, CalendarCheck } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SectionIntro from '../components/SectionIntro'

const sections = [
  {
    icon:    <UtensilsCrossed size={24} className="text-gold" />,
    label:   'Menus',
    desc:    'Our full restaurant menu — starters, mains, desserts, and daily specials. Fresh, local, seasonal.',
    href:    '/eat-drink/menus',
    cta:     'View menus',
  },
  {
    icon:    <ShoppingBag size={24} className="text-gold" />,
    label:   'Food Corner',
    desc:    'Artisan sandwiches, fresh pastries, pies, salads, and hot meals to eat in or take away.',
    href:    '/eat-drink/food-corner',
    cta:     'See what\'s on offer',
  },
  {
    icon:    <Wine size={24} className="text-gold" />,
    label:   'Drink',
    desc:    'Craft beers, fine wines, cocktails and spirits — something for every taste, any time of day.',
    href:    '/eat-drink/drink',
    cta:     'Browse the drinks list',
  },
  {
    icon:    <CalendarCheck size={24} className="text-gold" />,
    label:   'Book a Table',
    desc:    'Reserve your table online — lunch, dinner, or a special occasion. We\'d love to have you.',
    href:    '/eat-drink/book',
    cta:     'Make a reservation',
  },
]

export default function EatDrink() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream">
        <div className="bg-forest py-20 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Eat & Drink</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Food & drink at Gleesons</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">
            Five-star dining with locally sourced produce. From a quick coffee to a full evening out.
          </p>
        </div>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="group bg-surface border border-border rounded-2xl p-8 hover:shadow-md hover:border-forest/30 transition-all"
              >
                <div className="mb-4">{s.icon}</div>
                <h2 className="font-serif text-2xl font-semibold text-ink mb-2">{s.label}</h2>
                <p className="text-muted leading-relaxed mb-6">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest group-hover:text-gold transition-colors">
                  {s.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
