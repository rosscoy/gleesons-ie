import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-serif text-4xl font-semibold text-ink mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted mb-10">Last updated: May 2026</p>

          <div className="prose prose-sm max-w-none text-muted space-y-6">
            <p>
              Gleesons of Booterstown (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal information.
              This policy explains what data we collect, how we use it, and your rights in relation to it.
            </p>

            <h2 className="font-serif text-xl font-semibold text-ink mt-8 mb-2">1. What information we collect</h2>
            <p>We collect information you provide directly, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email address, and phone number (via contact and booking forms)</li>
              <li>Payment information (processed securely via our booking provider — we do not store card details)</li>
              <li>Email address (if you sign up for our newsletter)</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-ink mt-8 mb-2">2. How we use your information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and manage your bookings</li>
              <li>Respond to enquiries</li>
              <li>Send newsletters and special offers (only if you have opted in)</li>
              <li>Improve our website and services</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-ink mt-8 mb-2">3. Cookies</h2>
            <p>
              Our website uses cookies to improve your browsing experience. You can control cookie settings through your browser.
              We use Google Analytics to understand how visitors use the site — this data is anonymised.
            </p>

            <h2 className="font-serif text-xl font-semibold text-ink mt-8 mb-2">4. Your rights</h2>
            <p>
              Under GDPR you have the right to access, correct, or delete your personal data at any time.
              To make a request, contact us at gleesonsofbooterstown@gmail.com.
            </p>

            <h2 className="font-serif text-xl font-semibold text-ink mt-8 mb-2">5. Contact</h2>
            <p>
              If you have any questions about this policy, please contact us at gleesonsofbooterstown@gmail.com
              or by post at 44 Booterstown Ave, Booterstown, Dublin.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
