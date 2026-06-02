import { Switch, Route, useLocation } from "wouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Areas from "./pages/Areas";
import Owners from "./pages/Owners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./lib/i18n/context";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/351912345678"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.492a.5.5 0 0 0 .613.613l5.701-1.47A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.528-5.2-1.44l-.373-.223-3.862.995 1.01-3.788-.245-.39A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  );
}

export default function App() {
  const [location] = useLocation();

  return (
    <LanguageProvider>
      <div className="page-flow-bg" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div key={location} className="page-enter">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/properties" component={Properties} />
              <Route path="/properties/:id" component={PropertyDetail} />
              <Route path="/areas" component={Areas} />
              <Route path="/owners" component={Owners} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route>
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="text-center">
                    <p className="font-serif text-5xl text-[var(--color-charcoal)] mb-4">404</p>
                    <p className="text-[var(--color-charcoal-muted)] font-light">Page not found</p>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}
