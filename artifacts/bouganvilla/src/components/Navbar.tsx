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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-12 lg:h-14">
        <Link href="/">
          <Logo
            inverted={transparent}
            className="h-6 lg:h-7 w-auto transition-all duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[12px] tracking-[0.06em] font-light transition-colors duration-200",
                transparent
                  ? "text-white/75 hover:text-white"
                  : "text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "ml-1 px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-light border transition-all duration-200",
              transparent
                ? "border-white/40 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                : "border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white",
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
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-cream)] border-t border-[var(--color-sand-border)] px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] tracking-[0.06em] font-light text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-1 px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase font-light border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-center hover:bg-[var(--color-charcoal)] hover:text-white transition-colors"
          >
            Enquire
          </Link>
        </div>
      )}
    </header>
  );
}
