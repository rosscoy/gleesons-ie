import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MenuSection from '../components/MenuSection'

const PLACEHOLDER = {
  sections: [
    {
      title: 'Sandwiches & Wraps',
      items: [
        { name: 'Chicken Avocado Wrap', description: 'Grilled chicken, fresh avocado, mixed leaves and honey mustard.', price: '€9.50' },
        { name: 'Club Sandwich', description: 'Chicken, bacon, egg, lettuce, tomato on toasted white bread.', price: '€10.50' },
        { name: 'BLT', description: 'Crispy bacon, lettuce, tomato on sourdough.', price: '€8.50' },
        { name: 'Smoked Salmon & Cream Cheese Bagel', description: 'With capers and red onion.', price: '€9.50' },
      ],
    },
    {
      title: 'Hot Food',
      items: [
        { name: 'Soup of the Day', description: 'Served with fresh bread.', price: '€6.50', dietary: ['V'] },
        { name: 'Chicken & Mushroom Pie', description: 'Creamy filling, buttery pastry, with salad or chips.', price: '€13.50' },
        { name: 'Beef & Guinness Pie', description: 'Slow-braised beef in rich Guinness gravy, shortcrust pastry top.', price: '€13.50' },
        { name: 'Quiche of the Day', description: 'Ask at the counter for today\'s quiche.', price: '€9.00', dietary: ['V'] },
      ],
    },
    {
      title: 'Salads',
      items: [
        { name: 'Nicoise Salad', description: 'Tuna, green beans, egg, olives, potatoes, French dressing.', price: '€12.00', dietary: ['GF'] },
        { name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, classic Caesar dressing. Add chicken +€3.', price: '€10.50' },
      ],
    },
    {
      title: 'Pastries & Sweet Things',
      items: [
        { name: 'Croissant', description: 'Butter, almond, or ham & cheese.', price: 'From €3.50' },
        { name: 'Muffin of the Day', price: '€3.00' },
        { name: 'Scone with Jam & Cream', price: '€4.50', dietary: ['V'] },
        { name: 'Slice of Cake', description: 'Ask at the counter for today\'s cake.', price: 'From €4.00', dietary: ['V'] },
      ],
    },
  ],
}

export default function FoodCorner() {
  const [menu, setMenu]       = useState(PLACEHOLDER)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(db, 'menus', 'food-corner'))
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
          <h1 className="font-serif text-5xl font-semibold text-cream mb-4">Food Corner</h1>
          <p className="text-cream/60 max-w-lg mx-auto">
            Freshly made sandwiches, hot pies, salads, pastries, and more — to eat in or take away.
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
