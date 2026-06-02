import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation } from "wouter";
import {
  ArrowLeft, BedDouble, Bath, Users, ExternalLink,
  X, ChevronLeft, ChevronRight, Grid3X3, MapPin, Car, Phone,
} from "lucide-react";
import { properties } from "../data";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { useT } from "../lib/i18n/context";

/* ── Lightbox ──────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
  t,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
  t: ReturnType<typeof useT>;
}) {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(8,12,18,0.97)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors"
      >
        <X size={18} strokeWidth={1.5} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-light">{t.detail.close}</span>
      </button>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] uppercase text-white/35 font-light">
        {current + 1} / {images.length}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 lg:left-8 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
      >
        <ChevronLeft size={30} strokeWidth={1} />
      </button>
      <div
        className="max-w-[90vw] max-h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={`${t.detail.photos} ${current + 1}`}
          className="max-w-full max-h-[88vh] object-contain"
          style={{ animation: "fadeInScale 0.2s ease" }}
        />
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 lg:right-8 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
      >
        <ChevronRight size={30} strokeWidth={1} />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.28)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Gallery Grid ──────────────────────────────────── */
function GalleryGrid({
  images,
  onOpen,
  t,
}: {
  images: string[];
  onOpen: (i: number) => void;
  t: ReturnType<typeof useT>;
}) {
  if (images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Mobile: single tall hero */}
      <div
        className="relative overflow-hidden cursor-pointer group block lg:hidden"
        style={{ height: "62vw", minHeight: "260px", maxHeight: "480px" }}
        onClick={() => onOpen(0)}
      >
        <img
          src={images[0]}
          alt="Property hero"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {images.length > 1 && (
          <button
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)]"
            onClick={(e) => { e.stopPropagation(); onOpen(0); }}
          >
            <Grid3X3 size={11} />
            {images.length} {t.detail.photos}
          </button>
        )}
      </div>

      {/* Desktop: editorial 5-photo grid */}
      <div
        className="hidden lg:flex gap-[3px] w-full"
        style={{ height: "72vh", minHeight: "540px", maxHeight: "780px" }}
      >
        {/* Main hero — left panel, ~62% width */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          style={{ flex: "1.65" }}
          onClick={() => onOpen(0)}
        >
          <img
            src={images[0]}
            alt="Property exterior"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <button
            className="absolute bottom-5 left-5 flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.18em] uppercase font-medium bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
            onClick={(e) => { e.stopPropagation(); onOpen(0); }}
          >
            <Grid3X3 size={11} />
            {t.detail.allPhotos} {images.length} {t.detail.photos}
          </button>
        </div>

        {/* Right column — 2 × 2 grid, ~38% width */}
        {images.length > 1 && (
          <div
            className="grid grid-cols-2 gap-[3px]"
            style={{ flex: "1", display: "grid", gridTemplateRows: "1fr 1fr" }}
          >
            {[1, 2, 3, 4].map((idx) => {
              const src = images[idx];
              if (!src) {
                return (
                  <div
                    key={idx}
                    className="bg-[var(--color-sand)]"
                    style={{ minHeight: 0 }}
                  />
                );
              }
              const isLast = idx === 4;
              const remaining = images.length - 5;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{ minHeight: 0 }}
                  onClick={() => onOpen(idx)}
                >
                  <img
                    src={src}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-300" />
                  {isLast && remaining > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/42 backdrop-blur-[2px]">
                      <span className="font-serif text-3xl text-white leading-none">+{remaining}</span>
                      <span className="text-[9px] tracking-[0.28em] uppercase text-white/65 font-medium mt-2">
                        {t.detail.morePhotos}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */
export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const property = properties.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = useT();

  function handleEnquire(checkin: string, checkout: string) {
    navigate(`/contact?checkin=${checkin}&checkout=${checkout}&property=${id ?? ""}`);
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-3xl text-[var(--color-charcoal)] mb-3">{t.detail.notFound}</p>
          <Link href="/properties" className="text-sm text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] underline font-light">
            {t.detail.backToAll}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Gallery ─────────────────────────────────── */}
      <section className="pt-[72px]">
        <GalleryGrid images={property.images} onOpen={setLightboxIndex} t={t} />
      </section>

      {/* ── Content ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-18">

        {/* Back link */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          {t.detail.allProperties}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Main column ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Title + quick stats */}
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase font-medium text-[var(--color-charcoal-subtle)] mb-3">
                {property.area} · {property.region}
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--color-charcoal)] leading-[1.05] mb-7">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-7 pb-8 border-b border-[var(--color-sand-border)]">
                <span className="flex items-center gap-2.5 text-sm text-[var(--color-charcoal-muted)] font-light">
                  <BedDouble size={15} strokeWidth={1.4} />
                  {property.bedrooms} {t.detail.bedroomsLabel}
                </span>
                <span className="flex items-center gap-2.5 text-sm text-[var(--color-charcoal-muted)] font-light">
                  <Bath size={15} strokeWidth={1.4} />
                  {property.bathrooms} {t.detail.bathroomsLabel}
                </span>
                <span className="flex items-center gap-2.5 text-sm text-[var(--color-charcoal-muted)] font-light">
                  <Users size={15} strokeWidth={1.4} />
                  {t.detail.sleepsLabel} {property.guests}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl">
              {property.longDescription.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-base lg:text-[17px] text-[var(--color-charcoal-muted)] leading-[1.8] font-light mb-6 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Key highlights */}
            {property.highlights.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[var(--color-charcoal)] mb-5">
                  {t.detail.atAGlance}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="px-5 py-4 border border-[var(--color-sand-border)]"
                      style={{ backgroundColor: "var(--color-cream)" }}
                    >
                      <p className="text-[9px] tracking-[0.22em] uppercase font-medium text-[var(--color-charcoal-subtle)] mb-1.5">
                        {h.label}
                      </p>
                      <p className="font-serif text-xl text-[var(--color-charcoal)]">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[var(--color-charcoal)] mb-5">
                {t.detail.whatsIncluded}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--color-terracotta)" }}
                    />
                    <span className="text-sm text-[var(--color-charcoal-muted)] font-light">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            {property.nearby.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[var(--color-charcoal)] mb-5 flex items-center gap-2">
                  <MapPin size={11} />
                  {t.detail.nearby}
                </p>
                <div className="divide-y divide-[var(--color-sand-border)] border-t border-b border-[var(--color-sand-border)]">
                  {property.nearby.map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-3.5">
                      <span className="text-sm text-[var(--color-charcoal-muted)] font-light">{n.label}</span>
                      <span className="text-sm font-medium text-[var(--color-charcoal)] tabular-nums">{n.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interior photo strip */}
            {property.images.length > 5 && (
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[var(--color-charcoal)] mb-4">
                  {t.detail.insideTheVilla}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {property.images.slice(5).map((src, i) => (
                    <div
                      key={i}
                      className="overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: "4/3" }}
                      onClick={() => setLightboxIndex(i + 5)}
                    >
                      <img
                        src={src}
                        alt={`Interior ${i + 6}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────── */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 border border-[var(--color-sand-border)] p-8"
              style={{ backgroundColor: "var(--color-sand)" }}
            >
              <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-1 leading-snug">
                {property.name}
              </h3>
              <p className="text-xs text-[var(--color-charcoal-muted)] font-light mb-8 leading-relaxed">
                {property.area} · {property.region}
              </p>

              <div className="space-y-2.5 mb-5">
                <a
                  href={property.cta.href}
                  target={property.cta.external ? "_blank" : undefined}
                  rel={property.cta.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center gap-2 w-full py-4 text-[11px] tracking-[0.16em] uppercase font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "var(--color-terracotta)" }}
                >
                  {property.cta.label}
                  <ExternalLink size={12} />
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[11px] tracking-[0.16em] uppercase font-medium border border-[var(--color-charcoal-muted)]/25 text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal)]/50 hover:text-[var(--color-charcoal)] transition-all"
                >
                  {t.detail.sendEnquiry}
                </Link>
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-[11px] tracking-[0.14em] uppercase font-medium transition-colors"
                  style={{ color: "#15803d" }}
                >
                  <Phone size={12} />
                  {t.detail.whatsapp}
                </a>
              </div>

              <p className="text-[10px] text-center font-light mb-8" style={{ color: "var(--color-charcoal-subtle)" }}>
                {t.detail.respondTime}
              </p>

              {/* Quick stats */}
              <div className="border-t border-[var(--color-sand-border)] pt-6 space-y-3.5 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-charcoal-muted)] font-light flex items-center gap-2">
                    <BedDouble size={13} strokeWidth={1.4} /> {t.detail.bedrooms}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-charcoal)]">{property.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-charcoal-muted)] font-light flex items-center gap-2">
                    <Bath size={13} strokeWidth={1.4} /> {t.detail.bathrooms}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-charcoal)]">{property.bathrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-charcoal-muted)] font-light flex items-center gap-2">
                    <Users size={13} strokeWidth={1.4} /> {t.detail.guests}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-charcoal)]">{t.detail.upTo} {property.guests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-charcoal-muted)] font-light flex items-center gap-2">
                    <Car size={13} strokeWidth={1.4} /> {t.detail.parking}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-charcoal)]">{t.detail.parkingValue}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[9px] tracking-widest uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)]"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setLightboxIndex(0)}
                className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.18em] uppercase font-medium text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] border border-[var(--color-sand-border)] hover:border-[var(--color-charcoal-muted)]/40 transition-all"
              >
                <Grid3X3 size={11} />
                {t.detail.viewAllPhotos} {property.images.length} {t.detail.photos}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Availability Calendar ─────────────────── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-16 lg:pb-24">
        <div
          className="border border-[var(--color-sand-border)] p-8 lg:p-12"
          style={{ backgroundColor: "rgba(255,255,255,0.70)" }}
        >
          <AvailabilityCalendar
            propertyId={property.id}
            onEnquire={handleEnquire}
          />
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={property.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          t={t}
        />
      )}

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
