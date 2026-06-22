import { useState, useEffect } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useT } from "../lib/i18n/context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export default function Contact() {
  useDocumentTitle("Contact & Enquiries");
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", property: "",
    checkin: "", checkout: "", guests: "", message: "",
  });

  // Pre-fill from URL search params (e.g. from AvailabilityCalendar "Enquire" button)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkin = params.get("checkin") ?? "";
    const checkout = params.get("checkout") ?? "";
    const property = params.get("property") ?? "";
    if (checkin || checkout || property) {
      setForm(f => ({ ...f, checkin, checkout, property }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Server error ${res.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm font-light bg-white outline-none focus:border-[var(--color-terracotta)] transition-colors placeholder:text-[var(--color-charcoal-subtle)]";

  return (
    <>
      <div className="pt-20 lg:pt-28" />

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-24 pt-10">
        <div className="mb-12 lg:mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: "var(--color-terracotta)" }}>
            {t.contact.label}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[var(--color-charcoal)]">
            {t.contact.heading}
          </h1>
          <p className="mt-4 text-sm text-[var(--color-charcoal-muted)] font-light max-w-md leading-relaxed">
            {t.contact.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="border border-[var(--color-sand-border)] p-12 text-center"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <CheckCircle
                  size={36}
                  className="mx-auto mb-5"
                  strokeWidth={1.5}
                  style={{ color: "var(--color-terracotta)" }}
                />
                <h2 className="font-serif text-3xl text-[var(--color-charcoal)] mb-3">
                  {t.contact.success.heading}
                </h2>
                <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed">
                  {t.contact.success.body}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-start gap-3 px-4 py-3 border text-sm font-light" style={{ borderColor: "#f87171", backgroundColor: "#fff1f1", color: "#b91c1c" }}>
                    <AlertCircle size={15} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                      {t.contact.form.name}
                    </label>
                    <input
                      required type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.contact.form.namePlaceholder}
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                      {t.contact.form.email}
                    </label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                    {t.contact.form.property}
                  </label>
                  <select
                    required
                    value={form.property}
                    onChange={(e) => setForm({ ...form, property: e.target.value })}
                    className={field + " cursor-pointer"}
                    style={{ color: form.property ? "var(--color-charcoal)" : "var(--color-charcoal-subtle)" }}
                  >
                    <option value="" disabled>{t.contact.form.propertyPlaceholder}</option>
                    <option value="villa-emerald">{t.contact.form.optVillaEmerald}</option>
                    <option value="apartamento-sao-martinho">{t.contact.form.optSaoMartinho}</option>
                    <option value="both">{t.contact.form.optBoth}</option>
                    <option value="not-sure">{t.contact.form.optNotSure}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                      {t.contact.form.checkin}
                    </label>
                    <input
                      type="date"
                      value={form.checkin}
                      onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                      {t.contact.form.checkout}
                    </label>
                    <input
                      type="date"
                      value={form.checkout}
                      onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                      {t.contact.form.guests}
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className={field + " cursor-pointer"}
                    >
                      <option value="">{t.contact.form.guestsPlaceholder}</option>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? t.contact.form.guest : t.contact.form.guestsWord}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
                    {t.contact.form.message}
                  </label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder}
                    className={field + " resize-none"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-terracotta)" }}
                >
                  {loading ? (
                    <>
                      <Loader size={13} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      {t.contact.form.submit}
                      <Send size={13} />
                    </>
                  )}
                </button>

                <p className="text-xs font-light" style={{ color: "var(--color-charcoal-subtle)" }}>
                  {t.contact.form.disclaimer}
                </p>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-5" style={{ color: "var(--color-charcoal)" }}>
                {t.contact.sidebar.contactLabel}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={15} className="mt-0.5 shrink-0" strokeWidth={1.5} style={{ color: "var(--color-terracotta)" }} />
                  <div>
                    <p className="text-xs text-[var(--color-charcoal-muted)] font-light">Email</p>
                    <a href="mailto:info@bouganvilla.com" className="text-sm transition-colors" style={{ color: "var(--color-charcoal)" }}>
                      info@bouganvilla.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 shrink-0" strokeWidth={1.5} style={{ color: "var(--color-terracotta)" }} />
                  <div>
                    <p className="text-xs text-[var(--color-charcoal-muted)] font-light">WhatsApp / Phone</p>
                    <a href="tel:+351912345678" className="text-sm transition-colors" style={{ color: "var(--color-charcoal)" }}>
                      +351 912 345 678
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-[var(--color-sand-border)] p-6" style={{ backgroundColor: "var(--color-cream)" }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal)" }}>
                Response time
              </p>
              <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed">
                We reply to every enquiry within <strong className="font-medium text-[var(--color-charcoal)]">24 hours</strong>, usually much sooner.
              </p>
            </div>

            <div className="border border-[var(--color-sand-border)] p-6" style={{ backgroundColor: "var(--color-sand)" }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal)" }}>
                {t.contact.sidebar.directBook}
              </p>
              <p className="text-sm text-[var(--color-charcoal-muted)] font-light leading-relaxed mb-4">
                {t.contact.sidebar.directBody}
              </p>
              <a
                href="https://www.airbnb.com/hosting/listings/editor/1575967103888810416"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.15em] uppercase font-medium transition-colors"
                style={{ color: "var(--color-terracotta)" }}
              >
                {t.contact.sidebar.directCta}
              </a>
            </div>

            <div className="aspect-[3/2] overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
              <img
                src="/photos/villa-bougainvillea/04_Outdoor_Dinning.avif"
                alt="Portugal"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
