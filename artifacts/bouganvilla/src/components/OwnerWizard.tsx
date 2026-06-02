import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const AREAS = [
  "Chiado / Bairro Alto",
  "Belém / Santos",
  "Alfama / Mouraria",
  "Príncipe Real",
  "Parque das Nações",
  "Cascais / Estoril",
  "Sintra",
  "Almada / South Bank",
  "Other",
];

const AMENITIES = [
  { id: "pool", label: "Pool" },
  { id: "sea_view", label: "Sea view" },
  { id: "city_view", label: "City view" },
  { id: "terrace", label: "Terrace" },
  { id: "garden", label: "Garden" },
  { id: "parking", label: "Parking" },
  { id: "ac", label: "Air conditioning" },
  { id: "modern_kitchen", label: "Modern kitchen" },
];

type Step = 1 | 2 | 3 | 4;

interface FormData {
  area: string;
  propertyType: "studio" | "apartment" | "villa" | "house" | "";
  bedrooms: number;
  sizeSqm: number | "";
  amenities: string[];
  name: string;
  email: string;
  phone: string;
}

interface EstimateResult {
  nightlyLow: number;
  nightlyHigh: number;
  monthlyLow: number;
  monthlyHigh: number;
  annualLow: number;
  annualHigh: number;
}

const API_BASE = "";

export default function OwnerWizard() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    area: "",
    propertyType: "",
    bedrooms: 1,
    sizeSqm: "",
    amenities: [],
    name: "",
    email: "",
    phone: "",
  });

  const toggleAmenity = (id: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(id)
        ? f.amenities.filter((a) => a !== id)
        : [...f.amenities, id],
    }));
  };

  const canNext1 = form.area !== "";
  const canNext2 = form.propertyType !== "" && form.sizeSqm !== "" && Number(form.sizeSqm) > 0;
  const canSubmit = form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/owner-estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          bedrooms: Number(form.bedrooms),
          sizeSqm: Number(form.sizeSqm),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResult(data.estimate);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepLabels = ["Location", "Property", "Features", "Contact"];

  if (result) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-white/20 p-8 max-w-lg w-full mx-auto">
        <div className="text-center mb-6">
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-terracotta)" }}>
            Your estimate
          </p>
          <div className="text-4xl font-light text-[var(--color-charcoal)] mb-1">
            €{result.nightlyLow}–€{result.nightlyHigh}
          </div>
          <p className="text-sm text-[var(--color-charcoal-muted)]">per night</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="border border-[var(--color-sand-border)] p-4 text-center">
            <p className="text-[10px] tracking-widest uppercase text-[var(--color-charcoal-subtle)] mb-1">Monthly</p>
            <p className="text-lg font-light text-[var(--color-charcoal)]">€{result.monthlyLow.toLocaleString()}–€{result.monthlyHigh.toLocaleString()}</p>
          </div>
          <div className="border border-[var(--color-sand-border)] p-4 text-center">
            <p className="text-[10px] tracking-widest uppercase text-[var(--color-charcoal-subtle)] mb-1">Annual</p>
            <p className="text-lg font-light text-[var(--color-charcoal)]">€{result.annualLow.toLocaleString()}–€{result.annualHigh.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-[var(--color-deep-green)]/8 border border-[var(--color-deep-green)]/20 p-4 mb-4">
          <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--color-deep-green)" }} />
          <p className="text-xs text-[var(--color-charcoal-muted)] leading-relaxed">
            Full breakdown sent to <strong>{form.email}</strong>. A consultant will reach out within 48 hours.
          </p>
        </div>
        <button
          onClick={() => { setResult(null); setStep(1); setForm({ area: "", propertyType: "", bedrooms: 1, sizeSqm: "", amenities: [], name: "", email: "", phone: "" }); }}
          className="w-full text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--color-charcoal-muted)] py-2 hover:text-[var(--color-charcoal)] transition-colors"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-white/20 max-w-lg w-full mx-auto">
      {/* Step indicator */}
      <div className="flex border-b border-[var(--color-sand-border)]">
        {stepLabels.map((label, i) => {
          const s = (i + 1) as Step;
          const active = step === s;
          const done = step > s;
          return (
            <button
              key={label}
              onClick={() => done && setStep(s)}
              className={`flex-1 py-3 text-[9px] tracking-[0.18em] uppercase font-medium transition-colors border-b-2 ${
                active
                  ? "border-[var(--color-deep-green)] text-[var(--color-deep-green)]"
                  : done
                  ? "border-transparent text-[var(--color-charcoal-subtle)] cursor-pointer hover:text-[var(--color-charcoal)]"
                  : "border-transparent text-[var(--color-charcoal-subtle)] cursor-default"
              }`}
            >
              {done ? <span className="inline-flex items-center gap-1"><Check size={9} />{label}</span> : label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {/* Step 1 — Location */}
        {step === 1 && (
          <div>
            <p className="text-xs text-[var(--color-charcoal-muted)] mb-4">Where is your property?</p>
            <div className="grid grid-cols-1 gap-2">
              {AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => setForm((f) => ({ ...f, area }))}
                  className={`text-left px-4 py-3 text-sm border transition-all ${
                    form.area === area
                      ? "border-[var(--color-deep-green)] bg-[var(--color-deep-green)]/5 text-[var(--color-deep-green)] font-medium"
                      : "border-[var(--color-sand-border)] text-[var(--color-charcoal)] hover:border-[var(--color-charcoal-muted)]"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Property */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-xs text-[var(--color-charcoal-muted)] mb-3">Property type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["studio", "apartment", "villa", "house"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setForm((f) => ({ ...f, propertyType: type, bedrooms: type === "studio" ? 0 : f.bedrooms || 1 }))}
                    className={`py-3 text-sm capitalize border transition-all ${
                      form.propertyType === type
                        ? "border-[var(--color-deep-green)] bg-[var(--color-deep-green)]/5 text-[var(--color-deep-green)] font-medium"
                        : "border-[var(--color-sand-border)] text-[var(--color-charcoal)] hover:border-[var(--color-charcoal-muted)]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {form.propertyType !== "studio" && (
              <div>
                <p className="text-xs text-[var(--color-charcoal-muted)] mb-3">Bedrooms</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setForm((f) => ({ ...f, bedrooms: n }))}
                      className={`flex-1 py-2.5 text-sm border transition-all ${
                        form.bedrooms === n
                          ? "border-[var(--color-deep-green)] bg-[var(--color-deep-green)]/5 text-[var(--color-deep-green)] font-medium"
                          : "border-[var(--color-sand-border)] text-[var(--color-charcoal)] hover:border-[var(--color-charcoal-muted)]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-[var(--color-charcoal-muted)] mb-2">Size (m²)</p>
              <div className="relative">
                <input
                  type="number"
                  min={10}
                  max={1000}
                  placeholder="e.g. 85"
                  value={form.sizeSqm}
                  onChange={(e) => setForm((f) => ({ ...f, sizeSqm: e.target.value === "" ? "" : Number(e.target.value) }))}
                  className="w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-deep-green)] pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-charcoal-subtle)]">m²</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Amenities */}
        {step === 3 && (
          <div>
            <p className="text-xs text-[var(--color-charcoal-muted)] mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map(({ id, label }) => {
                const selected = form.amenities.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleAmenity(id)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm border transition-all text-left ${
                      selected
                        ? "border-[var(--color-deep-green)] bg-[var(--color-deep-green)]/5 text-[var(--color-deep-green)]"
                        : "border-[var(--color-sand-border)] text-[var(--color-charcoal)] hover:border-[var(--color-charcoal-muted)]"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${selected ? "border-[var(--color-deep-green)] bg-[var(--color-deep-green)]" : "border-[var(--color-charcoal-subtle)]"}`}>
                      {selected && <Check size={9} className="text-white" />}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[var(--color-charcoal-subtle)] mt-3">You can skip this — we'll calculate from your basics.</p>
          </div>
        )}

        {/* Step 4 — Contact */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--color-charcoal-muted)]">Where should we send your estimate?</p>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-deep-green)]"
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-deep-green)]"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-deep-green)]"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="px-5 py-3 text-[10px] tracking-[0.2em] uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-all"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium text-white transition-all hover:gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-deep-green)" }}
            >
              Continue <ArrowRight size={12} />
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium text-white transition-all hover:gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-deep-green)" }}
            >
              {loading ? <><Loader2 size={12} className="animate-spin" /> Calculating…</> : <>Get my estimate <ArrowRight size={12} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
