import { Link } from "wouter";
import { ArrowRight, BedDouble, Bath, Users, ExternalLink } from "lucide-react";
import { properties } from "../data";
import { useT } from "../lib/i18n/context";

export default function Properties() {
  const t = useT();

  return (
    <>
      <div className="pt-20 lg:pt-28" />

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-6 pt-10">
        <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>
          {t.properties.label}
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl text-[var(--color-charcoal)]">
          {t.properties.heading}
        </h1>
        <p className="mt-4 text-sm text-[var(--color-charcoal-muted)] font-light max-w-md leading-relaxed">
          {t.properties.sub}
        </p>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 pt-12">
        <div className="space-y-20 lg:space-y-28">
          {properties.map((property, i) => (
            <article key={property.id}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden">
                <Link
                  href={`/properties/${property.id}`}
                  className={`lg:col-span-3 relative aspect-[4/3] lg:aspect-auto min-h-[400px] overflow-hidden group block ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <img
                    src={property.image}
                    alt={`${property.name} — ${property.area}, ${property.region}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  <div
                    className="absolute top-5 left-5 px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium text-white"
                    style={{ backgroundColor: "var(--color-terracotta)" }}
                  >
                    {property.type === "villa" ? t.properties.villa : t.properties.apartment}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-6">
                    <span className="flex items-center gap-1.5 text-xs text-white/80 font-light">
                      <BedDouble size={13} strokeWidth={1.5} /> {property.bedrooms} {t.properties.beds}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-white/80 font-light">
                      <Bath size={13} strokeWidth={1.5} /> {property.bathrooms} {t.properties.baths}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-white/80 font-light">
                      <Users size={13} strokeWidth={1.5} /> {t.properties.sleeps} {property.guests}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5">
                      {t.properties.viewProperty}
                    </span>
                  </div>
                </Link>

                <div
                  className={`lg:col-span-2 flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-16 border border-[var(--color-sand-border)] border-t-0 lg:border-t ${i % 2 === 1 ? "lg:order-1 lg:border-r-0" : "lg:border-l-0"}`}
                  style={{ backgroundColor: "var(--color-cream)" }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal-subtle)" }}>
                    {property.area} · {property.region}
                  </p>
                  <Link href={`/properties/${property.id}`} className="group/title">
                    <h2 className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-5 leading-tight group-hover/title:text-[var(--color-terracotta)] transition-colors duration-300 cursor-pointer">
                      {property.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-8">
                    {property.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {property.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-widest uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={property.cta.href}
                      target={property.cta.external ? "_blank" : undefined}
                      rel={property.cta.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "var(--color-deep-green)" }}
                    >
                      {property.cta.label}
                      <ExternalLink size={12} />
                    </a>
                    <Link
                      href={`/properties/${property.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border border-[var(--color-charcoal-muted)]/30 text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-all"
                    >
                      {t.properties.learnMore}
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 text-center" style={{ backgroundColor: "var(--color-sand)" }}>
        <p className="font-serif text-2xl lg:text-3xl text-[var(--color-charcoal)] mb-4">
          {t.properties.cta.heading}
        </p>
        <p className="text-sm text-[var(--color-charcoal-muted)] font-light mb-8">
          {t.properties.cta.body}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "var(--color-deep-green)" }}
        >
          {t.properties.cta.button}
          <ArrowRight size={13} />
        </Link>
      </section>
    </>
  );
}
