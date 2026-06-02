import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { useT } from "../lib/i18n/context";

export default function Owners() {
  const t = useT();

  return (
    <>
      <section
        className="grain-overlay relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--color-deep-green) 0%, #1e3a5f 100%)` }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-sand)" }}>
            {t.owners.hero.label}
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-white leading-tight mb-6 max-w-2xl">
            {t.owners.hero.heading1}
            <br />
            <em className="font-light italic" style={{ color: "var(--color-sand)" }}>
              {t.owners.hero.heading2}
            </em>
          </h1>
          <p className="text-sm text-white/60 font-light leading-relaxed max-w-md mb-10">
            {t.owners.hero.body}
          </p>
          <a
            href="mailto:info@bouganvilla.com"
            className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors hover:bg-white/90"
            style={{ backgroundColor: "white", color: "var(--color-charcoal)" }}
          >
            {t.owners.hero.cta}
            <Mail size={13} />
          </a>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: "var(--color-terracotta)" }}>
              {t.owners.approach.label}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6 leading-tight">
              {t.owners.approach.heading1}
              <br />
              <em className="font-light italic" style={{ color: "var(--color-ocean)" }}>
                {t.owners.approach.heading2}
              </em>
            </h2>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-5 max-w-md">
              {t.owners.approach.body1}
            </p>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-5 max-w-md">
              {t.owners.approach.body2}
            </p>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-10 max-w-md">
              {t.owners.approach.body3}
            </p>
            <a
              href="mailto:info@bouganvilla.com"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors group"
              style={{ color: "var(--color-terracotta)" }}
            >
              {t.owners.approach.cta}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="/photos/villa-bougainvillea/01_Swimming_Pool_Water.avif"
              alt="Villa estate Portugal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 text-center" style={{ backgroundColor: "var(--color-sand)" }}>
        <p className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-4">
          {t.owners.bottom.heading}
        </p>
        <p className="text-sm text-[var(--color-charcoal-muted)] font-light mb-8 max-w-md mx-auto">
          {t.owners.bottom.body}
        </p>
        <a
          href="mailto:info@bouganvilla.com"
          className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--color-terracotta)" }}
        >
          info@bouganvilla.com
          <Mail size={13} />
        </a>
      </section>
    </>
  );
}
