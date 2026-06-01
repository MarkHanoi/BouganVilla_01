import { Link } from "wouter";
import { Instagram, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-deep-green)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          <div>
            <Logo inverted className="h-10 w-auto mb-4" />
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-xs">
              Curated stays on the Portuguese coast.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/40 mb-4">
              Our Properties
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/properties/villa-emerald"
                  className="text-sm text-white/70 hover:text-white transition-colors font-light"
                >
                  Villa Emerald — Belverde, Aroeira
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-sm text-white/70 hover:text-white transition-colors font-light"
                >
                  Apartamento São Martinho — Silver Coast
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/40 mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@bouganvilla.com"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors font-light"
                >
                  <Mail size={14} className="text-[var(--color-terracotta)]" />
                  info@bouganvilla.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors font-light"
                  aria-label="Instagram"
                >
                  <Instagram size={14} className="text-[var(--color-terracotta)]" />
                  @bouganvilla
                </a>
              </li>
              <li>
                <a
                  href="https://www.airbnb.com/hosting/listings/editor/1575967103888810416"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors font-light"
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center text-[var(--color-terracotta)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c1.243 0 2.25 1.007 2.25 2.25S13.243 9 12 9 9.75 7.993 9.75 6.75 10.757 4.5 12 4.5zM18 17.25H6v-1.5c0-2.484 2.016-4.5 4.5-4.5h3c2.484 0 4.5 2.016 4.5 4.5v1.5z" />
                    </svg>
                  </span>
                  Airbnb
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-light">
            © {new Date().getFullYear()} Bougan Villa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors font-light"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
