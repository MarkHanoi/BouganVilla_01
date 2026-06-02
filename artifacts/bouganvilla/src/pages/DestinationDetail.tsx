import { useParams, Link } from "wouter";
import { ArrowLeft, MapPin, ArrowRight, Mail } from "lucide-react";
import { destinations } from "../data/destinations";
import { useT } from "../lib/i18n/context";

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const t = useT();
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-3xl text-[var(--color-charcoal)] mb-3">Destination not found</p>
          <Link href="/areas" className="text-sm text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] underline font-light">
            ← Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[780px] overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/25" />

        {/* Back link */}
        <Link
          href="/areas"
          className="absolute top-20 left-6 lg:left-12 z-10 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={12} />
          {t.nav.destinations}
        </Link>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12 lg:pb-16 z-10">
          <div className="max-w-7xl mx-auto">
            <p
              className="text-[10px] tracking-[0.35em] uppercase font-medium mb-3"
              style={{ color: "var(--color-sand)" }}
            >
              {dest.region}
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl text-white leading-[1.02] mb-4">
              {dest.name}
            </h1>
            <p className="text-sm lg:text-base text-white/65 font-light max-w-lg leading-relaxed italic">
              {dest.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-20">

          {/* ── Main text ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Lead paragraph */}
            <div>
              <p className="font-serif text-xl lg:text-2xl text-[var(--color-charcoal)] leading-relaxed mb-8">
                {dest.shortDesc}
              </p>
              <div className="h-px w-16" style={{ backgroundColor: "var(--color-terracotta)" }} />
            </div>

            {/* Paragraphs */}
            <div className="space-y-6">
              {dest.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base lg:text-[17px] text-[var(--color-charcoal-muted)] leading-[1.85] font-light"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Property CTA or Coming Soon */}
            {dest.comingSoon ? (
              <div
                className="border border-[var(--color-sand-border)] p-8 lg:p-10"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 mt-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-terracotta)" }}
                  />
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-terracotta)" }}>
                      Coming Soon
                    </p>
                    <p className="font-serif text-xl text-[var(--color-charcoal)] mb-3">
                      We're looking for the right property here.
                    </p>
                    <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed max-w-lg mb-6">
                      Our selection process is deliberate — we only represent properties we believe in. If you own or know of a property in {dest.name} that might suit our portfolio, we'd love to hear about it.
                    </p>
                    <a
                      href="mailto:info@bouganvilla.com"
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors group"
                      style={{ color: "var(--color-terracotta)" }}
                    >
                      <Mail size={13} />
                      info@bouganvilla.com
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              dest.propertyId && (
                <div
                  className="border border-[var(--color-sand-border)] p-8 lg:p-10"
                  style={{ backgroundColor: "var(--color-sand)" }}
                >
                  <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-terracotta)" }}>
                    Our Property Here
                  </p>
                  <p className="font-serif text-xl text-[var(--color-charcoal)] mb-4">
                    We have a villa in {dest.name}
                  </p>
                  <Link
                    href={`/properties/${dest.propertyId}`}
                    className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium text-white transition-all hover:gap-5"
                    style={{ backgroundColor: "var(--color-deep-green)" }}
                  >
                    View the property
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )
            )}
          </div>

          {/* ── Sidebar ───────────────────────────── */}
          <div className="lg:col-span-1 space-y-8">

            {/* Quick facts */}
            <div
              className="border border-[var(--color-sand-border)] p-7"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <p className="text-[10px] tracking-[0.28em] uppercase font-medium mb-5" style={{ color: "var(--color-charcoal)" }}>
                At a Glance
              </p>
              <div className="divide-y divide-[var(--color-sand-border)]">
                {dest.facts.map((f) => (
                  <div key={f.label} className="py-3.5 flex items-start justify-between gap-4">
                    <span className="text-xs text-[var(--color-charcoal-muted)] font-light shrink-0">{f.label}</span>
                    <span className="text-xs font-medium text-[var(--color-charcoal)] text-right">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div
              className="border border-[var(--color-sand-border)] p-7"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <p className="text-[10px] tracking-[0.28em] uppercase font-medium mb-5 flex items-center gap-2" style={{ color: "var(--color-charcoal)" }}>
                <MapPin size={11} />
                Highlights
              </p>
              <ul className="space-y-3">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--color-terracotta)" }} />
                    <span className="text-sm text-[var(--color-charcoal-muted)] font-light">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div
              className="border border-[var(--color-sand-border)] p-7"
              style={{ backgroundColor: "var(--color-sand)" }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal)" }}>
                Plan your stay
              </p>
              <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed mb-5">
                Questions about {dest.name} or any of our destinations? We're happy to help plan your trip.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors group"
                style={{ color: "var(--color-terracotta)" }}
              >
                Get in touch
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Destinations ───────────────────── */}
      <section className="py-14 lg:py-20 px-6 lg:px-12" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-8" style={{ color: "var(--color-charcoal-muted)" }}>
            Other Destinations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {destinations
              .filter((d) => d.id !== dest.id)
              .map((d) => (
                <Link
                  key={d.id}
                  href={`/areas/${d.id}`}
                  className="group relative aspect-[3/4] overflow-hidden block"
                >
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-medium tracking-[0.05em]">{d.name}</p>
                    {d.comingSoon && (
                      <p className="text-white/50 text-[9px] tracking-[0.15em] uppercase font-light mt-0.5">
                        Coming Soon
                      </p>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
