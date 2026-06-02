import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n/context";

const areaIds = ["belverde-aroeira", "sao-martinho"] as const;

const areaData = [
  {
    id: "belverde-aroeira",
    name: "Belverde, Aroeira",
    region: "Setúbal Coast",
    highlights: ["Aroeira Beach", "Lagoa de Albufeira", "Setúbal Natural Park", "30 min to Lisbon"],
    image: "/photos/villa-bougainvillea/03_Outdoor_From_Far.avif",
    property: "Villa Emerald",
    propertyId: "villa-emerald",
    key: "belverde" as const,
  },
  {
    id: "sao-martinho",
    name: "São Martinho do Porto",
    region: "Silver Coast",
    highlights: ["São Martinho Bay", "Praia de São Martinho", "Foz do Arelho", "Caldas da Rainha"],
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    property: "Apartamento São Martinho",
    propertyId: "apartamento-sao-martinho",
    key: "saoMartinho" as const,
  },
];

export default function Areas() {
  const t = useT();

  return (
    <>
      <div className="pt-20 lg:pt-28" />

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

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 pt-12">
        <div className="space-y-6">
          {areaData.map((area, i) => {
            const translated = t.areas[area.key];
            return (
              <div
                key={area.id}
                className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-[var(--color-sand-border)]"
              >
                <div
                  className={`relative aspect-[4/3] lg:aspect-auto min-h-[340px] overflow-hidden group ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span
                      className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium text-white"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                    >
                      {area.region}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-14 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  style={{ backgroundColor: "var(--color-cream)" }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: "var(--color-terracotta)" }}>
                    {translated.tagline}
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-5 leading-tight">
                    {area.name}
                  </h2>
                  <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-8 max-w-md">
                    {translated.description}
                  </p>

                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal-subtle)" }}>
                      {t.areas.nearby}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {area.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-3 py-1 text-[10px] tracking-wide font-light border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/properties/${area.propertyId}`}
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors group"
                    style={{ color: "var(--color-terracotta)" }}
                  >
                    {t.areas.view} {area.property}
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
