import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n/context";

export default function About() {
  const t = useT();

  return (
    <>
      <section
        className="grain-overlay relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--color-deep-green) 0%, #2a5268 100%)` }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-sand)" }}>
            {t.about.hero.label}
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-white leading-tight mb-6 max-w-2xl">
            {t.about.hero.heading1}
            <br />
            <em className="font-light italic" style={{ color: "var(--color-sand)" }}>
              {t.about.hero.heading2}
            </em>
          </h1>
        </div>
        <div
          className="absolute bottom-0 right-10 w-64 h-64 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--color-magenta)" }}
        />
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-base lg:text-lg text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6">
              {t.about.body1}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-6">
              {t.about.body2}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-10">
              {t.about.body3}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--color-terracotta)" }}
            >
              {t.about.cta}
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-5">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/photos/villa-bougainvillea/01_Outdoor_main.avif"
                alt="Portuguese coast — terrace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div
                className="p-8 border border-[var(--color-sand-border)] text-center"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <p className="font-serif text-4xl text-[var(--color-charcoal)] mb-1">2</p>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal-muted)" }}>
                  {t.about.stats.properties}
                </p>
              </div>
              <div
                className="p-8 border border-[var(--color-sand-border)] text-center"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <p className="font-serif text-4xl text-[var(--color-charcoal)] mb-1">2</p>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal-muted)" }}>
                  {t.about.stats.destinations}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-6 lg:px-12" style={{ backgroundColor: "var(--color-sand)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)]">
              {t.about.values.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {t.about.values.items.map((v) => (
              <div key={v.title} className="border-t-2 border-[var(--color-terracotta)] pt-6">
                <h3 className="font-serif text-xl text-[var(--color-charcoal)] mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
