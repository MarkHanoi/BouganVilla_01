import { useEffect, useState } from "react";
import { Mail, Phone, ExternalLink } from "lucide-react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";

const STATUSES = ["new", "replied", "converted", "closed"] as const;
type Status = typeof STATUSES[number];

const statusColors: Record<Status, string> = {
  new: "#c96a3a",
  replied: "#4a7fa5",
  converted: "#2e7d32",
  closed: "#aaa",
};

const propertyLabels: Record<string, string> = {
  "villa-emerald": "Villa Emerald",
  "apartamento-sao-martinho": "Apt São Martinho",
  both: "Both",
  "not-sure": "Not sure",
};

export default function AdminEnquiries() {
  const ready = useAdminAuth();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    fetch(`${API}/api/admin/enquiries`, { credentials: "include" })
      .then(r => r.json())
      .then(data => setEnquiries(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  useEffect(() => { if (ready) load(); }, [ready]);

  const updateStatus = async (id: number, status: Status) => {
    setUpdating(true);
    await fetch(`${API}/api/admin/enquiries/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(false);
    setSelected((s: any) => s ? { ...s, status } : s);
    load();
  };

  if (!ready) return null;

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.status === filter);

  const thStyle = "px-4 py-3 text-left text-[9px] tracking-[0.2em] uppercase font-medium border-b border-[var(--color-sand-border)]";
  const tdStyle = "px-4 py-3 text-sm font-light border-b border-[var(--color-sand-border)]";

  return (
    <AdminLayout title="Enquiries">
      <div className="max-w-6xl space-y-4">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", ...STATUSES] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium border transition-colors ${filter === s ? "text-white border-transparent" : "border-[var(--color-sand-border)] bg-white"}`}
              style={filter === s ? { backgroundColor: s === "all" ? "var(--color-deep-green)" : statusColors[s as Status] } : { color: "var(--color-charcoal-muted)" }}
            >
              {s} {s !== "all" && `(${enquiries.filter(e => e.status === s).length})`}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Table */}
          <div className="flex-1 bg-white border border-[var(--color-sand-border)] overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead style={{ backgroundColor: "var(--color-sand)" }}>
                <tr>
                  <th className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>Guest</th>
                  <th className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>Property</th>
                  <th className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>Dates</th>
                  <th className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>Status</th>
                  <th className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>Received</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-sm font-light" style={{ color: "var(--color-charcoal-muted)" }}>No enquiries</td></tr>
                ) : filtered.map(e => (
                  <tr
                    key={e.id}
                    onClick={() => setSelected(e)}
                    className={`cursor-pointer transition-colors ${selected?.id === e.id ? "bg-[#fdf6f0]" : "hover:bg-[var(--color-sand)]/40"}`}
                  >
                    <td className={tdStyle} style={{ color: "var(--color-charcoal)" }}>
                      <p className="font-medium text-sm">{e.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-charcoal-muted)" }}>{e.email}</p>
                    </td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>
                      {propertyLabels[e.property_id] ?? e.property_id ?? "—"}
                    </td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>
                      {e.check_in ? `${e.check_in?.slice(0, 10)} → ${e.check_out?.slice(0, 10)}` : "—"}
                    </td>
                    <td className={tdStyle}>
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase font-medium px-2 py-1"
                        style={{ color: statusColors[e.status as Status] ?? "#888", backgroundColor: `${statusColors[e.status as Status] ?? "#888"}18` }}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>
                      {new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 bg-white border border-[var(--color-sand-border)] p-5 shrink-0 space-y-4 self-start">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{selected.name}</p>
                  <p className="text-xs font-light" style={{ color: "var(--color-charcoal-muted)" }}>Enquiry #{selected.id}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-xs" style={{ color: "var(--color-charcoal-muted)" }}>×</button>
              </div>

              <div className="space-y-2">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-terracotta)" }}>
                  <Mail size={13} strokeWidth={1.5} /> {selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-terracotta)" }}>
                    <Phone size={13} strokeWidth={1.5} /> {selected.phone}
                  </a>
                )}
              </div>

              <div className="text-xs space-y-1 border-t border-[var(--color-sand-border)] pt-4" style={{ color: "var(--color-charcoal-muted)" }}>
                <p><span className="font-medium" style={{ color: "var(--color-charcoal)" }}>Property:</span> {propertyLabels[selected.property_id] ?? selected.property_id ?? "—"}</p>
                {selected.check_in && <p><span className="font-medium" style={{ color: "var(--color-charcoal)" }}>Dates:</span> {selected.check_in?.slice(0, 10)} → {selected.check_out?.slice(0, 10)}</p>}
                {selected.guests && <p><span className="font-medium" style={{ color: "var(--color-charcoal)" }}>Guests:</span> {selected.guests}</p>}
              </div>

              {selected.message && (
                <div className="border-t border-[var(--color-sand-border)] pt-4">
                  <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>Message</p>
                  <p className="text-xs font-light leading-relaxed whitespace-pre-wrap" style={{ color: "var(--color-charcoal)" }}>{selected.message}</p>
                </div>
              )}

              <div className="border-t border-[var(--color-sand-border)] pt-4">
                <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      disabled={updating || selected.status === s}
                      onClick={() => updateStatus(selected.id, s)}
                      className="py-1.5 text-[9px] tracking-[0.15em] uppercase font-medium border transition-colors disabled:opacity-40"
                      style={selected.status === s
                        ? { backgroundColor: statusColors[s], color: "white", borderColor: statusColors[s] }
                        : { color: statusColors[s], borderColor: statusColors[s] + "60", backgroundColor: statusColors[s] + "10" }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: Your Bougan Villa Enquiry&body=Hi ${selected.name},%0A%0AThank you for your enquiry about ${propertyLabels[selected.property_id] ?? selected.property_id ?? "our property"}.%0A%0A`}
                className="flex items-center justify-center gap-2 w-full py-3 text-[10px] tracking-[0.15em] uppercase font-medium text-white"
                style={{ backgroundColor: "var(--color-terracotta)" }}
              >
                <ExternalLink size={11} strokeWidth={1.5} />
                Reply via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
