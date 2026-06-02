import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import Logo from "./Logo";
import { useT, useLang } from "../lib/i18n/context";
import { LANGUAGES } from "../lib/i18n/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [location] = useLocation();
  const t = useT();
  const { lang, setLang } = useLang();
  const langRef = useRef<HTMLDivElement>(null);

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  const navLinks = [
    { href: "/properties", label: t.nav.properties },
    { href: "/areas", label: t.nav.destinations },
    { href: "/owners", label: t.nav.forOwners },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

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

        <nav className="hidden lg:flex items-center gap-6">
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

          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 text-[11px] tracking-[0.1em] font-light transition-colors duration-200",
                transparent
                  ? "text-white/60 hover:text-white"
                  : "text-[var(--color-charcoal-subtle)] hover:text-[var(--color-charcoal)]",
              )}
              aria-label="Select language"
            >
              {currentLang.label}
              <ChevronDown
                size={10}
                strokeWidth={1.5}
                className={cn("transition-transform duration-200", langOpen ? "rotate-180" : "")}
              />
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 py-1.5 min-w-[120px] border border-[var(--color-sand-border)] shadow-lg z-50"
                style={{ backgroundColor: "var(--color-cream)" }}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 text-[11px] tracking-[0.08em] font-light transition-colors text-left",
                      l.code === lang
                        ? "text-[var(--color-terracotta)]"
                        : "text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-sand)]/40",
                    )}
                  >
                    <span>{l.label}</span>
                    <span
                      className="text-[9px] tracking-[0.05em] font-light"
                      style={{ color: "var(--color-charcoal-subtle)" }}
                    >
                      {l.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={cn(
              "ml-1 px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-light border transition-all duration-200",
              transparent
                ? "border-white/40 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                : "border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white",
            )}
          >
            {t.nav.enquire}
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
            {t.nav.enquire}
          </Link>

          {/* Mobile language grid */}
          <div className="pt-3 border-t border-[var(--color-sand-border)]">
            <p
              className="text-[9px] tracking-[0.25em] uppercase font-medium mb-3"
              style={{ color: "var(--color-charcoal-subtle)" }}
            >
              Language
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMenuOpen(false); }}
                  className={cn(
                    "py-2 text-[10px] tracking-[0.1em] font-light border transition-colors",
                    l.code === lang
                      ? "border-[var(--color-terracotta)] text-[var(--color-terracotta)]"
                      : "border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal-muted)]",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
