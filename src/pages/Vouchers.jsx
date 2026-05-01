import { Gift, ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const VOUCHER_URL = import.meta.env.VITE_NETAFFINITY_VOUCHER_URL || 'https://bookings.gleesons.ie'

export default function Vouchers() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-20 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Gift vouchers</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Give the gift of Gleesons</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">
            Treat someone special to a stay, a meal, or anything in between.
          </p>
        </div>

        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-8">
              <Gift size={32} className="text-gold" />
            </div>

            <h2 className="font-serif text-3xl font-semibold text-ink mb-4">
              The perfect gift for any occasion
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Whether it's a birthday, anniversary, wedding, or just because — a Gleesons gift voucher is a thoughtful way to share something special.
            </p>
            <p className="text-muted leading-relaxed mb-10">
              Vouchers can be used towards accommodation, dining, drinks, or anything at Gleesons. Available in any denomination.
            </p>

            <a
              href={VOUCHER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-cream font-medium rounded-xl hover:bg-forest-dark transition-colors"
            >
              Purchase a Voucher
              <ArrowRight size={16} />
            </a>

            <p className="text-xs text-muted mt-6">
              You'll be redirected to our secure booking portal to complete your purchase.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
