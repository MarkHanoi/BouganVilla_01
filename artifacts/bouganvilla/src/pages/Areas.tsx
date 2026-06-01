import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    id: "belverde-aroeira",
    name: "Belverde, Aroeira",
    region: "Setúbal Coast",
    tagline: "Pine Forest & Atlantic",
    description:
      "The Aroeira pine forest stretches across thousands of hectares of the Setúbal coast — ancient trees, clean air, and some of Portugal's finest Atlantic beaches just minutes away. Belverde sits quietly within it, a place entirely its own. No noise, no crowds. Just light through pines and the sound of the sea.",
    highlights: ["Aroeira Beach", "Lagoa de Albufeira", "Setúbal Natural Park", "30 min to Lisbon"],
    image:
      "/photos/villa-bougainvillea/03_Outdoor_From_Far.avif",
    property: "Villa Emerald",
    propertyId: "villa-emerald",
  },
  {
    id: "sao-martinho",
    name: "São Martinho do Porto",
    region: "Silver Coast",
    tagline: "The Scallop Bay",
    description:
      "One of Portugal's most distinctive natural formations — a near-perfect circular bay of warm, sheltered water surrounded by golden cliffs. São Martinho do Porto is unhurried and authentic. Fishermen still bring their catch in each morning; the village moves at exactly the right pace. It's halfway between Lisbon and Porto, and somehow far from both.",
    highlights: ["São Martinho Bay", "Praia de São Martinho", "Foz do Arelho", "Caldas da Rainha"],
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    property: "Apartamento São Martinho",
    propertyId: "apartamento-sao-martinho",
  },
];

export default function Areas() {
  return (
    <>
      <div className="pt-20 lg:pt-28" />

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-8 pt-10">
        <p
          className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
          style={{ color: "var(--color-terracotta)" }}
        >
          Destinations
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl text-[var(--color-charcoal)]">
          Where We Are
        </h1>
        <p className="mt-4 text-sm text-[var(--color-charcoal-muted)] font-light max-w-md leading-relaxed">
          Two remarkable stretches of the Portuguese coast. Both entirely different. Both worth it.
        </p>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 pt-12">
        <div className="space-y-6">
          {areas.map((area, i) => (
            <div
              key={area.id}
              className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-[var(--color-sand-border)]`}
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
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                  style={{ color: "var(--color-terracotta)" }}
                >
                  {area.tagline}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-[var(--color-charcoal)] mb-5 leading-tight">
                  {area.name}
                </h2>
                <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed font-light mb-8 max-w-md">
                  {area.description}
                </p>

                <div className="mb-8">
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3"
                    style={{ color: "var(--color-charcoal-subtle)" }}
                  >
                    Nearby
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
                  View {area.property}
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
