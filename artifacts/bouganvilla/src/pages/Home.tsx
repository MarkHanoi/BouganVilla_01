import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { properties, testimonials } from "../data";

const usps = [
  {
    icon: "✦",
    title: "Personally Curated",
    body: "Only homes we love. We've stayed in every property we list — and we'd happily book them again.",
  },
  {
    icon: "◈",
    title: "Local Knowledge",
    body: "We know every corner of the coast. The hidden coves, the best bakeries, the quiet roads. We share all of it.",
  },
  {
    icon: "◇",
    title: "Seamless Stays",
    body: "From your first question to your last morning coffee, we handle everything — so you can simply be there.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="grain-overlay hero-gradient relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/30" />
            <span
              className="text-[10px] tracking-[0.35em] uppercase font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Portuguese Coast
            </span>
            <div className="h-px w-12 bg-white/30" />
          </div>

          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] text-white mb-6"
          >
            Stay where the
            <br />
            <em className="font-light italic" style={{ color: "var(--color-sand)" }}>
              light is different.
            </em>
          </h1>

          <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-md mx-auto mb-10">
            Handpicked villas and apartments on the Portuguese coast.
          </p>

          <Link
            href="/properties"
            className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:gap-5"
            style={{
              backgroundColor: "var(--color-terracotta)",
              color: "white",
            }}
          >
            Explore Our Properties
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Decorative bougainvillea pink orb */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--color-magenta)" }}
        />
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--color-sand)" }}
        />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10">
          <div className="w-px h-10 bg-white/20" />
        </div>
      </section>

      {/* ── Shore: sea meets sand ────────────────────────
           Four SVG wave layers animate at staggered speeds
           and phase offsets — back waves slow & dark,
           front waves fast & foamy — over a gradient that
           fades from the hero's deep ocean floor to transparent,
           letting the warm sand page-flow-bg show through below.
      ──────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "118px", marginTop: "-2px" }}
        aria-hidden="true"
      >
        {/* Sea depth gradient — fades hero dark → transparent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #183448 0%, rgba(22,58,82,0.55) 55%, transparent 100%)",
          }}
        />

        {/* Wave 1 — back, deep, slowest (24s) */}
        <svg
          className="absolute"
          style={{
            bottom: 0, width: "200%", height: "108px",
            animation: "wave-roll-a 24s linear infinite",
          }}
          viewBox="0 0 2880 108"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C90,42 200,80 300,62 C400,42 520,82 630,62
               C740,42 840,80 960,62 C1060,42 1160,82 1280,60
               C1390,40 1500,80 1620,62 C1720,42 1840,80 1940,60
               C2060,40 2160,82 2280,62 C2380,42 2500,80 2600,60
               C2720,40 2800,80 2880,62 L2880,108 L0,108 Z"
            fill="#183448"
          />
        </svg>

        {/* Wave 2 — mid-deep, slightly lighter (17s) */}
        <svg
          className="absolute"
          style={{
            bottom: 0, width: "200%", height: "86px",
            animation: "wave-roll-b 17s linear infinite",
          }}
          viewBox="0 0 2880 86"
          preserveAspectRatio="none"
        >
          <path
            d="M0,52 C110,28 220,66 340,50 C450,28 560,68 680,48
               C800,26 900,68 1020,50 C1130,28 1250,68 1360,48
               C1480,26 1580,68 1700,50 C1810,28 1920,66 2040,48
               C2160,26 2260,68 2380,50 C2490,28 2600,66 2720,48
               C2800,28 2880,66 2880,50 L2880,86 L0,86 Z"
            fill="rgba(20,62,90,0.92)"
          />
        </svg>

        {/* Wave 3 — mid, teal, medium (11s) */}
        <svg
          className="absolute"
          style={{
            bottom: 0, width: "200%", height: "64px",
            animation: "wave-roll-c 11s linear infinite",
          }}
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C130,16 260,56 390,38 C520,16 640,58 780,36
               C900,14 1020,58 1150,38 C1270,16 1400,56 1530,36
               C1660,14 1780,58 1900,38 C2030,16 2150,56 2280,36
               C2420,14 2560,56 2690,36 C2800,16 2880,52 2880,36
               L2880,64 L0,64 Z"
            fill="rgba(32,88,115,0.78)"
          />
        </svg>

        {/* Wave 4 — surf/foam edge, lightest, fastest (7s) */}
        <svg
          className="absolute"
          style={{
            bottom: 0, width: "200%", height: "38px",
            animation: "wave-roll-d 7s linear infinite",
          }}
          viewBox="0 0 2880 38"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C160,6 320,36 480,22 C640,6 800,34 960,20
               C1120,4 1280,34 1440,20 C1600,4 1760,34 1920,20
               C2080,4 2240,34 2400,20 C2560,4 2720,32 2880,20
               L2880,38 L0,38 Z"
            fill="rgba(195,228,235,0.32)"
          />
        </svg>
      </div>

      {/* ── Manifesto strip ────────────────────────────── */}
      <section className="py-10 border-b border-[var(--color-sand-border)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-lg lg:text-xl text-[var(--color-charcoal)] leading-relaxed italic">
            "We only list homes we believe in — places where the light, the air, and the detail make a real difference to your stay."
          </p>
        </div>
      </section>

      {/* ── Our Properties ──────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14 lg:mb-20">
          <p
            className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
            style={{ color: "var(--color-terracotta)" }}
          >
            Our Collection
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">
            Two Exceptional Homes
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {properties.map((property, i) => (
            <div
              key={property.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-[var(--color-sand-border)] ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              style={{ backdropFilter: "blur(2px)" }}
            >
              {/* Image — clickable to detail page */}
              <Link
                href={`/properties/${property.id}`}
                className="relative aspect-[4/3] lg:aspect-auto overflow-hidden group block"
              >
                <img
                  src={property.image}
                  alt={`${property.name} — ${property.area}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{
                    backgroundColor: "var(--color-terracotta)",
                    color: "white",
                  }}
                >
                  {property.type === "villa" ? "Villa" : "Apartment"}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5">
                    View Property
                  </span>
                </div>
              </Link>

              {/* Content — semi-transparent glass card */}
              <div
                className="flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-16"
                style={{ backgroundColor: "rgba(253, 249, 244, 0.72)", backdropFilter: "blur(8px)" }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
                  style={{ color: "var(--color-charcoal-subtle)" }}
                >
                  {property.area} · {property.region}
                </p>
                <Link href={`/properties/${property.id}`} className="group/title">
                <h3 className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-4 leading-tight group-hover/title:text-[var(--color-terracotta)] transition-colors duration-300 cursor-pointer">
                  {property.name}
                </h3>
                </Link>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6 max-w-sm">
                  {property.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {property.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] tracking-widest uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={property.cta.href}
                    target={property.cta.external ? "_blank" : undefined}
                    rel={property.cta.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:gap-4"
                    style={{
                      backgroundColor: "var(--color-deep-green)",
                      color: "white",
                    }}
                  >
                    {property.cta.label}
                    <ArrowRight size={13} />
                  </a>
                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Bougan Villa ────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
              style={{ color: "var(--color-terracotta)" }}
            >
              Our Promise
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">
              Why Bougan Villa
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {usps.map((usp) => (
              <div
                key={usp.title}
                className="text-center px-8 py-10 border border-[var(--color-sand-border)]"
                style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}
              >
                <div
                  className="text-2xl mb-5 block"
                  style={{ color: "var(--color-magenta)" }}
                >
                  {usp.icon}
                </div>
                <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-3">
                  {usp.title}
                </h3>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light">
                  {usp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className="px-10 py-12 border border-[var(--color-sand-border)]"
            style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "var(--color-terracotta)" }}
            >
              About Us
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6 leading-tight">
              Born from a love of
              <br />
              <em className="font-light italic" style={{ color: "var(--color-ocean)" }}>
                the Portuguese coast.
              </em>
            </h2>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6 max-w-md">
              Bougan Villa is a small, passionate agency born from a love of the Portuguese coast. We list only homes we believe in — places where the light, the air, and the detail make a real difference to your stay.
            </p>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light max-w-md">
              We're just starting — with two exceptional properties and a very clear idea of the kind of experience we want to create. Quality over volume, always.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors group"
                style={{ color: "var(--color-terracotta)" }}
              >
                Our Story
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/photos/villa-bougainvillea/02_LivingRoom_CafeTable.avif"
                alt="Portuguese coast"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 -z-10"
              style={{ backgroundColor: "var(--color-terracotta-light)" }}
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
              style={{ color: "var(--color-terracotta)" }}
            >
              Guest Stories
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">
              What our guests say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 lg:p-10 border border-[var(--color-sand-border)]"
                style={{ backgroundColor: "rgba(45, 74, 62, 0.88)", backdropFilter: "blur(8px)" }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[var(--color-sand)] text-[var(--color-sand)]" />
                  ))}
                </div>
                <p className="font-serif text-lg text-white/90 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white/80">{t.author}</p>
                  <p className="text-xs text-white/40 font-light mt-0.5">
                    {t.origin} · {t.property}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 text-center">
        <div
          className="max-w-xl mx-auto px-10 py-14 border border-[var(--color-sand-border)]"
          style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}
        >
          {/* Bougainvillea divider */}
          <div className="bv-divider mb-8 max-w-xs mx-auto">
            <div className="bv-divider-dot" />
            <div className="bv-divider-dot" />
            <div className="bv-divider-dot" />
          </div>
          <p
            className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ color: "var(--color-terracotta)" }}
          >
            Plan Your Stay
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-5">
            Ready to escape?
          </h2>
          <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed mb-10">
            Tell us when you'd like to visit, which property interests you, and what would make your stay perfect. We'll take it from there.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-all hover:gap-5"
            style={{ backgroundColor: "var(--color-terracotta)" }}
          >
            Get in Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
