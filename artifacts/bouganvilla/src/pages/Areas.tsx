import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n/context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { destinations } from "../data/destinations";

export default function Areas() {
  const t = useT();
  useDocumentTitle("Destinations");

  return (
    <>
      <div className="pt-20 lg:pt-28" />

      {/* ── Header ────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-8 pt-10">
        <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>
          {t.areas.label}
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl text-[var(--color-charcoal)]">
          {t.areas.heading}
        </h1>
        <p className="mt-4 text-sm text-[var(--color-charcoal-muted)] font-light max-w-md leading-relaxed">
          {t.areas.sub}
        </p>
      </section>

      {/* ── Featured (large) cards — Aroeira first ──── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {destinations.slice(0, 2).map((dest, i) => (
            <Link
              key={dest.id}
              href={`/areas/${dest.id}`}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: i === 0 ? "16/10" : "16/10" }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                {!dest.comingSoon ? (
                  <span
                    className="px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-medium text-white"
                    style={{ backgroundColor: "var(--color-terracotta)" }}
                  >
                    Property Available
                  </span>
                ) : (
                  <span
                    className="px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-medium text-white/80 border border-white/30"
                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {dest.region}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-white mb-2 leading-tight">
                  {dest.name}
                </h2>
                <p className="text-sm text-white/60 font-light italic mb-5">{dest.tagline}</p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-white/80 group-hover:text-white group-hover:gap-3 transition-all">
                  Discover
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Secondary grid — 4 destinations ─────────── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-20 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.slice(2).map((dest) => (
            <Link
              key={dest.id}
              href={`/areas/${dest.id}`}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Coming soon badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-2.5 py-1 text-[8px] tracking-[0.2em] uppercase font-medium text-white/70 border border-white/20"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
                  Coming Soon
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.25em] uppercase font-light mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {dest.region}
                </p>
                <h3 className="font-serif text-xl text-white mb-1.5 leading-tight">{dest.name}</h3>
                <p className="text-xs text-white/50 font-light italic mb-3 leading-snug line-clamp-2">
                  {dest.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-medium text-white/60 group-hover:text-white group-hover:gap-2.5 transition-all">
                  Discover
                  <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Owners strip ─────────────────────────────── */}
      <section className="py-14 lg:py-16 px-6 text-center border-t border-[var(--color-sand-border)]">
        <p className="font-serif text-2xl lg:text-3xl text-[var(--color-charcoal)] mb-3">
          Have a property in one of these areas?
        </p>
        <p className="text-sm text-[var(--color-charcoal-muted)] font-light mb-7 max-w-sm mx-auto">
          We're always looking for exceptional properties. If yours fits our standard, we'd love to talk.
        </p>
        <Link
          href="/owners"
          className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "var(--color-deep-green)" }}
        >
          For Property Owners
          <ArrowRight size={13} />
        </Link>
      </section>
    </>
  );
}
