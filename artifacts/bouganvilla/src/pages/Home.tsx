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
        className="grain-overlay relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Beach image — rotated 180° so ocean is top, sand is bottom */}
        <img
          src="/photos/hero-beach.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ transform: "rotate(180deg)" }}
        />

        {/* Top extension — bleed ocean turquoise upward from image edge */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "38%",
            background: "linear-gradient(to bottom, #1b9070 0%, rgba(27,144,112,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Bottom extension — bleed warm sand downward from image edge */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "38%",
            background: "linear-gradient(to top, #c4925a 0%, rgba(196,146,90,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Text-readability overlay — darkens the mid-zone where copy sits */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.52) 62%, rgba(0,0,0,0.18) 100%)",
            zIndex: 2,
          }}
        />

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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10">
          <div className="w-px h-10 bg-white/20" />
        </div>
      </section>

      {/* ── Shore: sand-to-cream transition ─────────────────
           5 SVG wave layers continuing the warm sand palette
           from the hero bottom into the cream page background.
           Colors: warm sandy gold → light sand → cream foam.
      ──────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "240px", marginTop: "-1px" }}
        aria-hidden="true"
      >
        {/* Depth gradient — warm sand at top, fades to cream */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom,",
              "  #c4925a 0%,",
              "  #cc9e68 18%,",
              "  #d4aa78 36%,",
              "  rgba(220,178,130,0.55) 65%,",
              "  rgba(220,178,130,0.10) 85%,",
              "  transparent 100%",
              ")",
            ].join(""),
          }}
        />

        {/* Wave 1 — back, deep warm sand, slowest (26s) */}
        <svg
          className="absolute"
          style={{ bottom: 0, width: "200%", height: "240px", animation: "wave-roll-a 26s linear infinite" }}
          viewBox="0 0 2880 240"
          preserveAspectRatio="none"
        >
          <path
            d="M0,148
               C 73,120 145,175 290,148
               C 385,120 575,176 670,148
               C 760,120 940,176 1030,148
               C 1133,120 1338,176 1440,148
               C 1513,120 1585,175 1730,148
               C 1825,120 2015,176 2110,148
               C 2200,120 2380,176 2470,148
               C 2573,120 2778,176 2880,148
               L2880,240 L0,240 Z"
            fill="#b07840"
          />
        </svg>

        {/* Wave 2 — medium sand, medium-slow (18s) */}
        <svg
          className="absolute"
          style={{ bottom: 0, width: "200%", height: "190px", animation: "wave-roll-b 18s linear infinite" }}
          viewBox="0 0 2880 190"
          preserveAspectRatio="none"
        >
          <path
            d="M0,118
               C 80,94 160,142 320,118
               C 408,94 583,142 670,118
               C 770,94 970,142 1070,118
               C 1163,94 1348,142 1440,118
               C 1520,94 1600,142 1760,118
               C 1848,94 2023,142 2110,118
               C 2210,94 2410,142 2510,118
               C 2603,94 2788,142 2880,118
               L2880,190 L0,190 Z"
            fill="rgba(192,140,80,0.88)"
          />
        </svg>

        {/* Wave 3 — lighter sand, medium (12s) */}
        <svg
          className="absolute"
          style={{ bottom: 0, width: "200%", height: "145px", animation: "wave-roll-c 12s linear infinite" }}
          viewBox="0 0 2880 145"
          preserveAspectRatio="none"
        >
          <path
            d="M0,90
               C 88,68 175,112 350,90
               C 428,68 583,112 660,90
               C 760,68 960,112 1060,90
               C 1155,68 1345,112 1440,90
               C 1528,68 1615,112 1790,90
               C 1868,68 2023,112 2100,90
               C 2200,68 2400,112 2500,90
               C 2595,68 2785,112 2880,90
               L2880,145 L0,145 Z"
            fill="rgba(208,162,100,0.82)"
          />
        </svg>

        {/* Wave 4 — pale sand, faster (8s) */}
        <svg
          className="absolute"
          style={{ bottom: 0, width: "200%", height: "94px", animation: "wave-roll-d 8s linear infinite" }}
          viewBox="0 0 2880 94"
          preserveAspectRatio="none"
        >
          <path
            d="M0,58
               C 70,38 140,78 280,58
               C 378,38 573,78 670,58
               C 758,38 933,78 1020,58
               C 1125,38 1335,78 1440,58
               C 1510,38 1580,78 1720,58
               C 1818,38 2013,78 2110,58
               C 2198,38 2373,78 2460,58
               C 2565,38 2775,78 2880,58
               L2880,94 L0,94 Z"
            fill="rgba(224,184,130,0.75)"
          />
        </svg>

        {/* Wave 5 — cream foam edge, fastest (5s) */}
        <svg
          className="absolute"
          style={{ bottom: 0, width: "200%", height: "42px", animation: "wave-roll-e 5s linear infinite" }}
          viewBox="0 0 2880 42"
          preserveAspectRatio="none"
        >
          <path
            d="M0,26
               C 83,12 165,40 330,26
               C 403,12 548,40 620,26
               C 725,12 935,40 1040,26
               C 1140,12 1340,40 1440,26
               C 1523,12 1605,40 1770,26
               C 1843,12 1988,40 2060,26
               C 2165,12 2375,40 2480,26
               C 2580,12 2780,40 2880,26
               L2880,42 L0,42 Z"
            fill="rgba(245,232,210,0.65)"
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
