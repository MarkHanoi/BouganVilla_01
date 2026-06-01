import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import Logo from "./Logo";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/areas", label: "Destinations" },
  { href: "/owners", label: "For Owners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        transparent
          ? "bg-transparent"
          : "bg-[var(--color-cream)] border-b border-[var(--color-sand-border)]",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        <Link href="/">
          <Logo
            inverted={transparent}
            className="h-8 lg:h-10 w-auto transition-all duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200",
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "ml-2 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-200",
              transparent
                ? "bg-white/10 border border-white/50 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                : "bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-deep-green)]",
            )}
          >
            Enquire
          </Link>
        </nav>

        <button
          className={cn(
            "lg:hidden p-1 transition-colors",
            transparent ? "text-white" : "text-[var(--color-charcoal)]",
          )}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-cream)] border-t border-[var(--color-sand-border)] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase font-medium text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-medium bg-[var(--color-terracotta)] text-white text-center hover:bg-[var(--color-deep-green)] transition-colors"
          >
            Enquire
          </Link>
        </div>
      )}
    </header>
  );
}
