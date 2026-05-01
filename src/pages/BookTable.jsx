import Nav from '../components/Nav'
import Footer from '../components/Footer'

const RESDIARY_URL = import.meta.env.VITE_RESDIARY_WIDGET_URL || ''

export default function BookTable() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Eat & Drink</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Book a Table</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Reserve your table for lunch, dinner, or a special occasion.
          </p>
        </div>

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {RESDIARY_URL ? (
              <iframe
                src={RESDIARY_URL}
                title="Book a table — ResDiary"
                className="w-full min-h-[600px] border-0 rounded-2xl"
                loading="lazy"
              />
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-10 text-center">
                <p className="font-serif text-xl text-ink mb-2">Reservations</p>
                <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
                  Online booking will be available here shortly. In the meantime, please call or email us to reserve a table.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+35312880236"
                    className="px-6 py-3 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors"
                  >
                    Call +353 (0)1 288 0236
                  </a>
                  <a
                    href="mailto:gleesonsofbooterstown@gmail.com"
                    className="px-6 py-3 border border-forest text-forest text-sm font-medium rounded-xl hover:bg-forest/5 transition-colors"
                  >
                    Email us
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
