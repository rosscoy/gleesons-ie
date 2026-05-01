import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MenuSection from '../components/MenuSection'
import SectionIntro from '../components/SectionIntro'

// Fallback placeholder content shown until admin adds real menu
const PLACEHOLDER_MENU = {
  title: 'Restaurant Menu',
  sections: [
    {
      title: 'Starters',
      items: [
        { name: 'Soup of the Day', description: 'Freshly made each morning with seasonal vegetables, served with sourdough bread.', price: '€7.50', dietary: ['V', 'GF'] },
        { name: 'Smoked Salmon', description: 'House-smoked Irish salmon with capers, crème fraîche and brown bread.', price: '€12.50' },
        { name: 'Chicken Liver Pâté', description: 'With red onion marmalade and toasted brioche.', price: '€9.50' },
      ],
    },
    {
      title: 'Mains',
      items: [
        { name: 'Catch of the Day', description: 'Ask your server for today\'s fresh fish — simply prepared with seasonal vegetables.', price: 'Market price', featured: true },
        { name: '8oz Sirloin Steak', description: 'Irish grass-fed beef, with chips, roasted tomato and your choice of sauce.', price: '€28.00' },
        { name: 'Roast of the Day', description: 'Slow-roasted with seasonal sides and gravy. Ask your server for today\'s roast.', price: '€22.00' },
        { name: 'Mushroom Risotto', description: 'Wild mushroom, truffle oil, parmesan, rocket.', price: '€17.50', dietary: ['V', 'GF'] },
      ],
    },
    {
      title: 'Desserts',
      items: [
        { name: 'Warm Chocolate Fondant', description: 'With vanilla ice cream and caramel sauce.', price: '€8.50' },
        { name: 'Crème Brûlée', description: 'Classic vanilla crème brûlée with a caramelised sugar crust.', price: '€7.50', dietary: ['GF'] },
        { name: 'Cheese Board', description: 'Selection of Irish artisan cheeses with crackers, grapes and chutney.', price: '€13.50' },
      ],
    },
  ],
}

export default function Menus() {
  const [menu, setMenu]       = useState(PLACEHOLDER_MENU)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(db, 'menus', 'restaurant'))
      .then((snap) => { if (snap.exists()) setMenu(snap.data()) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="bg-forest py-16 px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/80 mb-3">Eat & Drink</p>
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Restaurant Menu</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Locally sourced, freshly prepared. Our menu changes with the seasons.
          </p>
        </div>

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              menu.sections?.map((section, i) => (
                <MenuSection key={i} section={section} />
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
