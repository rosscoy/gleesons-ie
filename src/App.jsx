import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Sleep from './pages/Sleep'
import RoomDetail from './pages/RoomDetail'
import EatDrink from './pages/EatDrink'
import Menus from './pages/Menus'
import FoodCorner from './pages/FoodCorner'
import Drink from './pages/Drink'
import BookTable from './pages/BookTable'
import Gallery from './pages/Gallery'
import Events from './pages/Events'
import About from './pages/About'
import Vouchers from './pages/Vouchers'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminMenus from './admin/AdminMenus'
import AdminEvents from './admin/AdminEvents'
import AdminReviews from './admin/AdminReviews'
import AdminGallery from './admin/AdminGallery'
import AdminRooms from './admin/AdminRooms'
import AdminSettings from './admin/AdminSettings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/sleep/:roomSlug" element={<RoomDetail />} />
          <Route path="/eat-drink" element={<EatDrink />} />
          <Route path="/eat-drink/menus" element={<Menus />} />
          <Route path="/eat-drink/food-corner" element={<FoodCorner />} />
          <Route path="/eat-drink/drink" element={<Drink />} />
          <Route path="/eat-drink/book" element={<BookTable />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/menus" element={<ProtectedRoute><AdminMenus /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<ProtectedRoute><AdminRooms /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
