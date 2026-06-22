import { Switch, Route, useLocation } from "wouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Areas from "./pages/Areas";
import DestinationDetail from "./pages/DestinationDetail";
import Owners from "./pages/Owners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEnquiries from "./pages/admin/Enquiries";
import AdminBookings from "./pages/admin/Bookings";
import AdminCalendar from "./pages/admin/Calendar";
import AdminRevenue from "./pages/admin/Revenue";
import AdminProperties from "./pages/admin/Properties";
import { LanguageProvider } from "./lib/i18n/context";
import ErrorBoundary from "./components/ErrorBoundary";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/351912345678"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 transition-all hover:scale-105 active:scale-95"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="26.5" fill="transparent" stroke="white" strokeWidth="1.5" />
        <g transform="translate(15, 15)">
          <path
            fill="white"
            d="M13 0C5.82 0 0 5.82 0 13c0 2.3.61 4.46 1.67 6.33L.06 25.46a.5.5 0 0 0 .61.61l6.19-1.6A12.94 12.94 0 0 0 13 26c7.18 0 13-5.82 13-13S20.18 0 13 0zm0 23.83c-1.9 0-3.68-.5-5.22-1.38l-.37-.22-3.83.99.99-3.76-.25-.39A10.83 10.83 0 0 1 2.17 13C2.17 7.02 7.02 2.17 13 2.17S23.83 7.02 23.83 13 18.98 23.83 13 23.83z"
          />
          <path
            fill="white"
            d="M19.11 15.86c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.72.16-.22.32-.83 1.05-1.02 1.26-.19.22-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.39-.26-.63-.53-.54-.72-.55-.19-.01-.4-.01-.62-.01-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.33.16.21 2.27 3.46 5.5 4.85.77.33 1.37.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"
          />
        </g>
      </svg>
    </a>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-flow-bg" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default function App() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <Switch>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/enquiries" component={AdminEnquiries} />
        <Route path="/admin/bookings" component={AdminBookings} />
        <Route path="/admin/calendar" component={AdminCalendar} />
        <Route path="/admin/revenue" component={AdminRevenue} />
        <Route path="/admin/properties" component={AdminProperties} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/:rest*" component={AdminDashboard} />
      </Switch>
    );
  }

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <PublicLayout>
          <div key={location} className="page-enter">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/properties" component={Properties} />
              <Route path="/properties/:id" component={PropertyDetail} />
              <Route path="/areas" component={Areas} />
              <Route path="/areas/:id" component={DestinationDetail} />
              <Route path="/owners" component={Owners} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route>
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                  <p className="font-serif text-[120px] leading-none" style={{ color: "var(--color-sand-border)" }}>404</p>
                  <p className="font-serif text-3xl text-[var(--color-charcoal)] mb-3 -mt-4">Page not found</p>
                  <p className="text-sm text-[var(--color-charcoal-muted)] font-light mb-8 max-w-xs">
                    The page you're looking for has moved or doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium text-white"
                    style={{ backgroundColor: "var(--color-terracotta)" }}
                  >
                    Back to Home
                  </a>
                </div>
              </Route>
            </Switch>
          </div>
        </PublicLayout>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
