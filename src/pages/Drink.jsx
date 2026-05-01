import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MenuSection from '../components/MenuSection'

const PLACEHOLDER = {
  sections: [
    {
      title: 'Draught Beer & Cider',
      items: [
        { name: 'Guinness', price: '€6.50' },
        { name: 'Heineken', price: '€6.50' },
        { name: 'Smithwicks', price: '€6.20' },
        { name: 'Bulmers', price: '€6.50' },
      ],
    },
    {
      title: 'Wines by the Glass',
      subtitle: 'Full wine list available — ask your server',
      items: [
        { name: 'House White', description: 'Crisp and refreshing. 175ml / 250ml', price: '€8 / €11' },
        { name: 'House Red', description: 'Smooth and full-bodied. 175ml / 250ml', price: '€8 / €11' },
        { name: 'Prosecco', description: '125ml', price: '€9' },
      ],
    },
    {
      title: 'Cocktails',
      items: [
        { name: 'Aperol Spritz', description: 'Aperol, Prosecco, soda, orange.', price: '€12' },
        { name: 'Old Fashioned', description: 'Bourbon, sugar, Angostura bitters, orange peel.', price: '€13' },
        { name: 'Espresso Martini', description: 'Vodka, Kahlúa, fresh espresso.', price: '€13' },
        { name: 'Mojito', description: 'White rum, lime, mint, sugar, soda.', price: '€12' },
      ],
    },
    {
      title: 'Hot Drinks',
      items: [
        { name: 'Americano', price: '€3.50' },
        { name: 'Flat White', price: '€4.20' },
        { name: 'Latte / Cappuccino', price: '€4.20' },
        { name: 'Pot of Tea', price: '€3.50' },
        { name: 'Irish Coffee', price: '€8.50' },
      ],
    },
  ],
}

export default function Drink() {
  const [menu, setMenu]       = useState(PLACEHOLDER)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(db, 'menus', 'bar'))
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
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Bar & Drinks</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Craft beers, fine wines, classic cocktails, and everything in between.
          </p>
        </div>
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              menu.sections?.map((s, i) => <MenuSection key={i} section={s} />)
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
