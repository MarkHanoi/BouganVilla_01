import { useEffect, useState } from "react";
import { Check, X, Edit2 } from "lucide-react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";

interface Property {
  id: string;
  name: string;
  type: string;
  area: string;
  region: string;
  bedrooms: number;
  guests: number;
  active: boolean;
  airbnb_url: string | null;
  base_price_eur: string | null;
}

interface EditState {
  id: string;
  field: "base_price_eur" | "airbnb_url";
  value: string;
}

export default function AdminProperties() {
  const ready = useAdminAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    fetch(`${API}/api/admin/properties`, { credentials: "include" })
      .then(r => r.json())
      .then(setProperties)
      .catch(() => setError("Failed to load properties"))
      .finally(() => setLoading(false));
  }, [ready]);

  async function patch(id: string, body: Record<string, unknown>) {
    setSaving(id);
    setError(null);
    try {
      const r = await fetch(`${API}/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(await r.text());
      const updated: Property = await r.json();
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSaving(null);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    await patch(id, { active: !current });
  }

  async function saveEdit() {
    if (!edit) return;
    const val = edit.field === "base_price_eur"
      ? (edit.value === "" ? null : parseFloat(edit.value))
      : (edit.value === "" ? null : edit.value);
    await patch(edit.id, { [edit.field]: val });
    setEdit(null);
  }

  return (
    <AdminLayout title="Properties">
      <div className="max-w-4xl">
        {error && (
          <div className="mb-4 px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-3 text-sm text-gray-500 py-12">
            <div className="w-4 h-4 border border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Loading properties…
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map(prop => (
              <div
                key={prop.id}
                className="bg-white border border-[var(--color-sand-border)] p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-[var(--color-charcoal)]">{prop.name}</h3>
                    <p className="text-xs text-[var(--color-charcoal-muted)] font-light mt-0.5">
                      {prop.area} · {prop.region} · {prop.bedrooms} beds · {prop.guests} guests
                    </p>
                  </div>
                  <button
                    onClick={() => toggleActive(prop.id, prop.active)}
                    disabled={saving === prop.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-medium border transition-colors ${
                      prop.active
                        ? "border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                        : "border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {prop.active
                      ? <><Check size={10} /> Active</>
                      : <><X size={10} /> Inactive</>}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Base price */}
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-medium text-[var(--color-charcoal-muted)] mb-2">
                      Base price / night
                    </p>
                    {edit?.id === prop.id && edit?.field === "base_price_eur" ? (
                      <div className="flex gap-2">
                        <div className="flex items-center border border-[var(--color-sand-border)] bg-white">
                          <span className="px-2 text-xs text-[var(--color-charcoal-muted)]">€</span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={edit.value}
                            onChange={e => setEdit({ ...edit, value: e.target.value })}
                            className="w-24 py-1.5 pr-2 text-sm outline-none"
                            autoFocus
                            onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEdit(null); }}
                          />
                        </div>
                        <button
                          onClick={saveEdit}
                          disabled={saving === prop.id}
                          className="px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium text-white bg-[var(--color-terracotta)] hover:opacity-90 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEdit(null)}
                          className="px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium text-[var(--color-charcoal-muted)] border border-[var(--color-sand-border)] hover:border-[var(--color-charcoal-muted)]/40"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEdit({ id: prop.id, field: "base_price_eur", value: prop.base_price_eur ?? "" })}
                        className="flex items-center gap-2 text-sm text-[var(--color-charcoal)] hover:text-[var(--color-terracotta)] transition-colors group"
                      >
                        <span>
                          {prop.base_price_eur ? `€${parseFloat(prop.base_price_eur).toFixed(0)}/night` : "—  Not set"}
                        </span>
                        <Edit2 size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>

                  {/* Airbnb URL */}
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-medium text-[var(--color-charcoal-muted)] mb-2">
                      Airbnb / booking URL
                    </p>
                    {edit?.id === prop.id && edit?.field === "airbnb_url" ? (
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={edit.value}
                          onChange={e => setEdit({ ...edit, value: e.target.value })}
                          placeholder="https://airbnb.com/rooms/…"
                          className="flex-1 px-3 py-1.5 text-sm border border-[var(--color-sand-border)] outline-none"
                          autoFocus
                          onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEdit(null); }}
                        />
                        <button
                          onClick={saveEdit}
                          disabled={saving === prop.id}
                          className="px-3 py-1.5 text-[10px] tracking-wider uppercase font-medium text-white bg-[var(--color-terracotta)] hover:opacity-90 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEdit(null)}
                          className="px-2 py-1.5 text-[10px] border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal-muted)]/40"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEdit({ id: prop.id, field: "airbnb_url", value: prop.airbnb_url ?? "" })}
                        className="flex items-center gap-2 text-sm text-[var(--color-charcoal)] hover:text-[var(--color-terracotta)] transition-colors group max-w-full"
                      >
                        <span className="truncate max-w-[280px]">
                          {prop.airbnb_url ?? "—  Not set"}
                        </span>
                        <Edit2 size={11} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
