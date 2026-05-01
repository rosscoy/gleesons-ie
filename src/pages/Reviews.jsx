import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ExternalLink } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import SectionIntro from '../components/SectionIntro'

// Placeholder reviews shown until admin adds real ones
const PLACEHOLDER_REVIEWS = [
  { author: 'Sarah M.', text: 'Absolutely wonderful stay. The staff were so warm and welcoming, the room was immaculate, and breakfast was outstanding. Will definitely be back.', rating: 5, source: 'Google', date: 'April 2025' },
  { author: 'James O\'Brien', text: 'We had dinner here for our anniversary and it was just perfect. The food was incredible — really locally sourced and beautifully presented. Highly recommend.', rating: 5, source: 'TripAdvisor', date: 'March 2025' },
  { author: 'Emma K.', text: 'Lovely spot in Booterstown. The Food Corner is our go-to for lunch during the week. Fresh, tasty, and great value.', rating: 5, source: 'Google', date: 'March 2025' },
  { author: 'Colm F.', text: 'Stayed for two nights while visiting family nearby. Comfortable room, great location for the DART, and the bar was a lovely way to end the evening.', rating: 5, source: 'TripAdvisor', date: 'February 2025' },
  { author: 'Claire D.', text: 'The suite is gorgeous — such a treat for a special occasion. Beautifully styled and immaculately clean. Breakfast in bed was a lovely touch.', rating: 5, source: 'Direct', date: 'January 2025' },
  { author: 'Michael R.', text: 'Have been coming to Gleesons for years. It\'s a Booterstown institution. Always reliable, always welcoming, always delicious.', rating: 5, source: 'Google', date: 'December 2024' },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(PLACEHOLDER_REVIEWS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('published', '==', true),
      orderBy('date', 'desc')
    )
    getDocs(q)
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        if (data.length > 0) setReviews(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">What guests say</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Reviews</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            We're proud of what our guests say about us. Here's a selection of recent reviews.
          </p>
        </div>

        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {reviews.map((r, i) => <ReviewCard key={r.id || i} review={r} />)}
              </div>
            )}

            {/* External profile links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-border">
              <a
                href="https://google.com/search?q=Gleesons+of+Booterstown"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-sm font-medium text-ink hover:border-forest hover:text-forest transition-colors"
              >
                View on Google <ExternalLink size={14} />
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-sm font-medium text-ink hover:border-forest hover:text-forest transition-colors"
              >
                View on TripAdvisor <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
