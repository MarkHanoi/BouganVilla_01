import { Link } from "wouter";
import { BedDouble, Bath, Users } from "lucide-react";
import type { Property } from "../data";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="overflow-hidden aspect-[4/3] relative" style={{ backgroundColor: "var(--color-sand)" }}>
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {property.tags[0] && (
          <span
            className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 text-white"
            style={{ backgroundColor: "var(--color-terracotta)" }}
          >
            {property.tags[0]}
          </span>
        )}
      </div>
      <div className="pt-5">
        <p
          className="text-[10px] tracking-widest uppercase font-medium mb-1"
          style={{ color: "var(--color-charcoal-subtle)" }}
        >
          {property.area}
        </p>
        <h3
          className="font-serif text-xl leading-tight mb-4"
          style={{ color: "var(--color-charcoal)" }}
        >
          {property.name}
        </h3>
        <div
          className="border-t pt-4 flex items-center gap-5"
          style={{ borderColor: "var(--color-sand-border)" }}
        >
          <span
            className="flex items-center gap-1.5 text-xs font-light"
            style={{ color: "var(--color-charcoal-muted)" }}
          >
            <BedDouble size={13} /> {property.bedrooms} beds
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-light"
            style={{ color: "var(--color-charcoal-muted)" }}
          >
            <Bath size={13} /> {property.bathrooms} baths
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-light"
            style={{ color: "var(--color-charcoal-muted)" }}
          >
            <Users size={13} /> sleeps {property.guests}
          </span>
        </div>
      </div>
    </Link>
  );
}
