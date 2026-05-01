import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-[70vh] bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-serif text-8xl font-semibold text-forest/20 mb-4">404</p>
          <h1 className="font-serif text-3xl font-semibold text-ink mb-3">Page not found</h1>
          <p className="text-muted mb-8">The page you're looking for doesn't exist or has moved.</p>
          <Link
            to="/"
            className="inline-flex px-6 py-3 bg-forest text-cream text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
