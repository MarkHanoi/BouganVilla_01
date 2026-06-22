import { useState, useEffect } from "react";
import { properties as staticProperties, type Property } from "../data";

const API = import.meta.env.VITE_API_URL ?? "";

function asArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") { try { return JSON.parse(v); } catch { return []; } }
  return [];
}

function transform(raw: Record<string, unknown>): Property {
  return {
    id: raw.id as string,
    name: raw.name as string,
    area: (raw.area as string) ?? "",
    region: (raw.region as string) ?? "",
    type: raw.type as "villa" | "apartment",
    description: (raw.description as string) ?? "",
    longDescription: (raw.long_description as string) ?? "",
    bedrooms: Number(raw.bedrooms ?? 0),
    bathrooms: Number(raw.bathrooms ?? 0),
    guests: Number(raw.guests ?? 0),
    image: (raw.image as string) ?? "",
    images: asArray(raw.images) as string[],
    amenities: asArray(raw.amenities) as string[],
    tags: asArray(raw.tags) as string[],
    highlights: asArray(raw.highlights) as { label: string; value: string }[],
    nearby: asArray(raw.nearby) as { label: string; distance: string }[],
    cta: {
      label: (raw.cta_label as string) ?? "Enquire",
      href: (raw.cta_href as string) ?? "/contact",
      external: Boolean(raw.cta_external ?? false),
    },
    basePriceEur: raw.base_price_eur ? Number(raw.base_price_eur) : undefined,
  };
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(staticProperties);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/properties`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((rows: Record<string, unknown>[]) => {
        const transformed = rows.map(transform);
        if (transformed.length > 0) setProperties(transformed);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { properties, loading };
}

export function useProperty(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(
    id ? (staticProperties.find(p => p.id === id) ?? null) : null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`${API}/api/properties/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((raw: Record<string, unknown>) => setProperty(transform(raw)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { property, loading };
}
