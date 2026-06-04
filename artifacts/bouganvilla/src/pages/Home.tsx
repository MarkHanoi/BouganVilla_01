import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { properties, testimonials } from "../data";
import { useT } from "../lib/i18n/context";
import OwnerWizard from "../components/OwnerWizard";

type Persona = "guest" | "owner";

export default function Home() {
  const t = useT();
  const search = useSearch();
  const [persona, setPersona] = useState<Persona>("guest");

  useEffect(() => {
    if (search.includes("persona=owner")) {
      setPersona("owner");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [search]);

  const usps = [
    { icon: "✦", title: t.home.usps[0].title, body: t.home.usps[0].body },
    { icon: "◈", title: t.home.usps[1].title, body: t.home.usps[1].body },
    { icon: "◇", title: t.home.usps[2].title, body: t.home.usps[2].body },
  ];

  const ownerUsps = [
    { icon: "✦", title: "Hands-off management", body: "We handle everything — listings, guest comms, check-ins, cleaning. You collect." },
    { icon: "◈", title: "Premium positioning", body: "Your property listed as a curated Bougan Villa — never lost in a sea of listings." },
    { icon: "◇", title: "Transparent earnings", body: "Monthly reports, direct bank transfers, no surprises. Your property, your rules." },
  ];

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="grain-overlay hero-gradient relative flex flex-col items-center justify-center overflow-hidden pb-0"
        style={{ minHeight: "62vh" }}
      >
        <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl mx-auto w-full gap-7 pt-24 pb-12">

          {/* Headline */}
          <div className="text-center">
            {persona === "guest" ? (
              <>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] text-white mb-2">
                  {t.home.hero.line1}
                </h1>
                <p className="text-[10px] tracking-[0.3em] uppercase font-light mt-3" style={{ color: "rgba(245,239,224,0.55)" }}>
                  {t.home.hero.line2}
                </p>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] text-white mb-2">
                  What's your villa worth?
                </h1>
                <p className="text-[10px] tracking-[0.3em] uppercase font-light mt-3" style={{ color: "rgba(245,239,224,0.55)" }}>
                  Free rental estimate
                </p>
              </>
            )}
          </div>

          {/* ── Frosted glass panel ── */}
          <div
            className="w-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "14px",
            }}
          >
            {/* Tabs */}
            <div className="flex">
              <button
                onClick={() => setPersona("guest")}
                className="flex-1 py-3 text-[9px] tracking-[0.28em] uppercase font-medium transition-all duration-300 relative"
                style={{
                  color: persona === "guest" ? "var(--color-charcoal)" : "rgba(255,255,255,0.45)",
                  background: persona === "guest" ? "rgba(255,255,255,0.92)" : "transparent",
                  borderRadius: persona === "guest" ? "12px 0 0 0" : "0",
                }}
              >
                For Guests
              </button>
              <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
              <button
                onClick={() => setPersona("owner")}
                className="flex-1 py-3 text-[9px] tracking-[0.28em] uppercase font-medium transition-all duration-300 relative"
                style={{
                  color: persona === "owner" ? "var(--color-charcoal)" : "rgba(255,255,255,0.45)",
                  background: persona === "owner" ? "rgba(255,255,255,0.92)" : "transparent",
                  borderRadius: persona === "owner" ? "0 12px 0 0" : "0",
                }}
              >
                For Owners
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.12)" }} />

            {/* Panel body */}
            <div className="px-6 py-5">
              {persona === "guest" ? (
                <div className="flex flex-col gap-4">
                  <p className="text-white/65 text-[13px] font-light leading-relaxed">
                    Hand-picked properties on Portugal's most coveted coasts — Lisbon, Setúbal, Silver Coast.
                  </p>
                  <div className="flex gap-x-4 gap-y-1 flex-wrap items-center">
                    {["Lisbon", "Setúbal", "Silver Coast", "Cascais"].map((loc, i) => (
                      <span key={loc} className="flex items-center gap-2">
                        {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-white/20 inline-block" />}
                        <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-light">{loc}</span>
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/properties"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:gap-4"
                    style={{ backgroundColor: "white", color: "var(--color-charcoal)" }}
                  >
                    {t.home.hero.cta}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-white/65 text-[13px] font-light leading-relaxed">
                    Four steps, no commitment. We'll send you a personalised earnings breakdown within 48 hours.
                  </p>
                  <div className="flex gap-0 border border-white/10">
                    {[["€", "Revenue"], ["48h", "Response"], ["0%", "Hidden fees"]].map(([val, lbl], i) => (
                      <div key={lbl} className={`flex-1 py-3 text-center ${i < 2 ? "border-r border-white/10" : ""}`}>
                        <p className="text-white/90 font-light text-base leading-none mb-1">{val}</p>
                        <p className="text-white/35 text-[8px] tracking-[0.18em] uppercase">{lbl}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById("owner-wizard");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:gap-4"
                    style={{ backgroundColor: "white", color: "var(--color-charcoal)" }}
                  >
                    Get your estimate
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "18%", background: "linear-gradient(to top, #203e4e 0%, #203e4e 30%, transparent 100%)", zIndex: 3 }}
        />
      </section>

      {/* ── Shore transition ─────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "280px",
          marginTop: "-1px",
          maskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <img
          src="/photos/hero-beach.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: "rotate(180deg)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "45%", background: "linear-gradient(to bottom, #203e4e 0%, #203e4e 5%, transparent 100%)", zIndex: 1 }}
        />
      </div>

      {/* ══════════ GUEST MODE ══════════ */}
      {persona === "guest" && (
        <>
          {/* ── Manifesto strip */}
          <section className="py-10 border-b border-[var(--color-sand-border)]">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <p className="font-serif text-lg lg:text-xl text-[var(--color-charcoal)] leading-relaxed italic">
                "{t.home.manifesto}"
              </p>
            </div>
          </section>

          {/* ── Our Collection */}
          <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-14 lg:mb-20">
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">
                {t.home.collection.label}
              </h2>
            </div>
            <div className="space-y-16 lg:space-y-20">
              {properties.map((property, i) => (
                <div
                  key={property.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-[var(--color-sand-border)] ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                  style={{ backdropFilter: "blur(2px)" }}
                >
                  <Link href={`/properties/${property.id}`} className="relative aspect-[4/3] lg:aspect-auto overflow-hidden group block">
                    <img src={property.image} alt={`${property.name} — ${property.area}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ backgroundColor: "white", color: "var(--color-charcoal)" }}>
                      {property.type === "villa" ? t.home.collection.villa : t.home.collection.apartment}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5">{t.home.collection.viewProperty}</span>
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-16" style={{ backgroundColor: "rgba(253, 249, 244, 0.72)", backdropFilter: "blur(8px)" }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal-subtle)" }}>{property.area} · {property.region}</p>
                    <Link href={`/properties/${property.id}`} className="group/title">
                      <h3 className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-4 leading-tight group-hover/title:text-[var(--color-terracotta)] transition-colors duration-300 cursor-pointer">{property.name}</h3>
                    </Link>
                    <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6 max-w-sm">{property.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {property.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] tracking-widest uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)]">{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={property.cta.href} target={property.cta.external ? "_blank" : undefined} rel={property.cta.external ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:gap-4" style={{ backgroundColor: "var(--color-deep-green)", color: "white" }}>
                        {property.cta.label} <ArrowRight size={13} />
                      </a>
                      <Link href={`/properties/${property.id}`} className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-all">
                        {t.home.collection.learnMore}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Why Bougan Villa */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-14">
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>{t.home.promise.label}</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">{t.home.promise.heading}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {usps.map((usp) => (
                  <div key={usp.title} className="text-center px-8 py-10 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
                    <div className="text-2xl mb-5 block" style={{ color: "var(--color-magenta)" }}>{usp.icon}</div>
                    <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-3">{usp.title}</h3>
                    <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light">{usp.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── About */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="px-10 py-12 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-terracotta)" }}>{t.home.about.label}</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6 leading-tight">
                  {t.home.about.heading1}<br />
                  <em className="font-light italic" style={{ color: "var(--color-ocean)" }}>{t.home.about.heading2}</em>
                </h2>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6 max-w-md">{t.home.about.body1}</p>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light max-w-md">{t.home.about.body2}</p>
                <div className="mt-8">
                  <Link href="/about" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors group" style={{ color: "var(--color-terracotta)" }}>
                    {t.home.about.cta} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src="/photos/villa-bougainvillea/02_LivingRoom_CafeTable.avif" alt="Portuguese coast" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 -z-10" style={{ backgroundColor: "var(--color-terracotta-light)" }} />
              </div>
            </div>
          </section>

          {/* ── Testimonials */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-14">
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>{t.home.testimonials.label}</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">{t.home.testimonials.heading}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {testimonials.map((t_item) => (
                  <div key={t_item.id} className="p-8 lg:p-10 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(32, 62, 78, 0.88)", backdropFilter: "blur(8px)" }}>
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: t_item.rating }).map((_, i) => <Star key={i} size={12} className="fill-[var(--color-sand)] text-[var(--color-sand)]" />)}
                    </div>
                    <p className="font-serif text-lg text-white/90 leading-relaxed italic mb-6">"{t_item.quote}"</p>
                    <div className="border-t border-white/10 pt-5">
                      <p className="text-sm font-medium text-white/80">{t_item.author}</p>
                      <p className="text-xs text-white/40 font-light mt-0.5">{t_item.origin} · {t_item.property}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Contact CTA */}
          <section className="py-16 lg:py-24 px-6 text-center">
            <div className="max-w-xl mx-auto px-10 py-14 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
              <div className="bv-divider mb-8 max-w-xs mx-auto"><div className="bv-divider-dot" /><div className="bv-divider-dot" /><div className="bv-divider-dot" /></div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-terracotta)" }}>{t.home.cta.label}</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-5">{t.home.cta.heading}</h2>
              <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed mb-10">{t.home.cta.body}</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-all hover:gap-5" style={{ backgroundColor: "var(--color-deep-green)" }}>
                {t.home.cta.button} <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* ══════════ OWNER MODE ══════════ */}
      {persona === "owner" && (
        <>
          {/* ── Owner wizard anchor */}
          <div id="owner-wizard" className="py-16 lg:py-24 px-6 lg:px-12 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>Free estimate</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">What could your property earn?</h2>
              <p className="mt-4 text-sm text-[var(--color-charcoal-muted)] font-light">4 quick steps — we'll email you a full breakdown</p>
            </div>
            <OwnerWizard />
          </div>

          {/* ── How it works */}
          <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>The process</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">Simple from day one</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--color-sand-border)]">
              {[
                { num: "01", title: "Get your estimate", body: "Use the calculator above to see what your property could earn. We'll follow up with a personalised analysis." },
                { num: "02", title: "We take care of everything", body: "Listings, photography, guest comms, check-ins, cleaning — fully managed so you don't have to think about it." },
                { num: "03", title: "You earn, consistently", body: "Monthly transfers, transparent reports, and a dedicated contact whenever you need us." },
              ].map((step, i) => (
                <div key={step.num} className={`px-8 lg:px-12 py-10 lg:py-14 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[var(--color-sand-border)]" : ""}`} style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5" style={{ color: "var(--color-terracotta)" }}>{step.num}</p>
                  <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-3">{step.title}</h3>
                  <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Owner USPs */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-14">
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>Why Bougan Villa</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">Managed with care</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {ownerUsps.map((usp) => (
                  <div key={usp.title} className="text-center px-8 py-10 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
                    <div className="text-2xl mb-5 block" style={{ color: "var(--color-magenta)" }}>{usp.icon}</div>
                    <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-3">{usp.title}</h3>
                    <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light">{usp.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Owner CTA */}
          <section className="py-16 lg:py-24 px-6 text-center">
            <div className="max-w-xl mx-auto px-10 py-14 border border-[var(--color-sand-border)]" style={{ backgroundColor: "rgba(253, 249, 244, 0.65)", backdropFilter: "blur(8px)" }}>
              <div className="bv-divider mb-8 max-w-xs mx-auto"><div className="bv-divider-dot" /><div className="bv-divider-dot" /><div className="bv-divider-dot" /></div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-terracotta)" }}>Ready to list?</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-5">Let's talk about your property</h2>
              <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed mb-10">Already done the calculator? Get in touch and we'll walk you through everything — no commitment, no pressure.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-all hover:gap-5" style={{ backgroundColor: "var(--color-deep-green)" }}>
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
