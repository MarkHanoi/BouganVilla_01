import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";

const CHANNEL_COLORS: Record<string, string> = {
  airbnb: "#FF5A5F",
  booking_com: "#003580",
  direct: "#2e7d32",
  owner_block: "#888",
};

const CHANNEL_LABELS: Record<string, string> = {
  airbnb: "Airbnb",
  booking_com: "Booking.com",
  direct: "Direct",
  owner_block: "Owner Block",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "#2e7d32",
  enquiry: "#c96a3a",
  blocked: "#888",
  cancelled: "#e53935",
  checked_in: "#4a7fa5",
  checked_out: "#aaa",
};

const STATUSES = ["confirmed", "enquiry", "blocked", "cancelled", "checked_in", "checked_out"];

const emptyBooking = {
  property_id: "villa-emerald", channel: "direct", guest_name: "", guest_email: "",
  check_in: "", check_out: "", guests_count: "", total_gross: "", channel_fee_pct: "", notes: "",
};

export default function AdminBookings() {
  const ready = useAdminAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState({ ...emptyBooking });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = () => {
    fetch(`${API}/api/admin/bookings`, { credentials: "include" })
      .then(r => r.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  useEffect(() => { if (ready) load(); }, [ready]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${API}/api/admin/bookings/${id}`, {
      method: "PUT", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      const net = newBooking.total_gross && newBooking.channel_fee_pct
        ? (parseFloat(newBooking.total_gross) * (1 - parseFloat(newBooking.channel_fee_pct) / 100)).toFixed(2)
        : newBooking.total_gross;
      const res = await fetch(`${API}/api/admin/bookings`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newBooking, net_revenue: net || null }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? "Failed"); }
      setShowForm(false);
      setNewBooking({ ...emptyBooking });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (b: any) => {
    setEditingId(b.id);
    setEditData({
      guest_name: b.guest_name ?? "",
      guest_email: b.guest_email ?? "",
      check_in: b.check_in?.slice(0, 10) ?? "",
      check_out: b.check_out?.slice(0, 10) ?? "",
      guests_count: b.guests_count ?? "",
      total_gross: b.total_gross ?? "",
      channel_fee_pct: b.channel_fee_pct ?? "",
      status: b.status ?? "confirmed",
      notes: b.notes ?? "",
    });
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    const net = editData.total_gross && editData.channel_fee_pct
      ? (parseFloat(editData.total_gross) * (1 - parseFloat(editData.channel_fee_pct) / 100)).toFixed(2)
      : editData.total_gross || null;
    await fetch(`${API}/api/admin/bookings/${editingId}`, {
      method: "PUT", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editData, net_revenue: net }),
    });
    setEditingId(null);
    load();
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Permanently delete this booking? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch(`${API}/api/admin/bookings/${id}`, { method: "DELETE", credentials: "include" });
    setDeletingId(null);
    load();
  };

  if (!ready) return null;

  const filtered = propertyFilter === "all" ? bookings : bookings.filter(b => b.property_id === propertyFilter);

  const thStyle = "px-4 py-3 text-left text-[9px] tracking-[0.2em] uppercase font-medium border-b border-[var(--color-sand-border)]";
  const tdStyle = "px-4 py-3 text-sm font-light border-b border-[var(--color-sand-border)]";
  const inputCls = "w-full border border-[var(--color-sand-border)] px-3 py-2 text-sm font-light bg-white outline-none focus:border-[var(--color-terracotta)]";
  const editInputCls = "w-full border border-[var(--color-sand-border)] px-2 py-1.5 text-xs font-light bg-[#fffdf9] outline-none focus:border-[var(--color-terracotta)]";

  return (
    <AdminLayout title="Bookings">
      <div className="max-w-6xl space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2">
            {["all", "villa-emerald", "apartamento-sao-martinho"].map(p => (
              <button
                key={p}
                onClick={() => setPropertyFilter(p)}
                className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium border transition-colors ${propertyFilter === p ? "text-white bg-[var(--color-deep-green)] border-transparent" : "border-[var(--color-sand-border)] bg-white"}`}
                style={propertyFilter !== p ? { color: "var(--color-charcoal-muted)" } : {}}
              >
                {p === "all" ? "All" : p === "villa-emerald" ? "Villa Emerald" : "Apt São Martinho"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-terracotta)" }}
          >
            <Plus size={12} strokeWidth={2} />
            Add Booking
          </button>
        </div>

        {/* Add booking form */}
        {showForm && (
          <div className="bg-white border border-[var(--color-sand-border)] p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: "var(--color-charcoal)" }}>New Booking</p>
            {error && <p className="text-xs mb-4 px-3 py-2" style={{ backgroundColor: "#fff1f1", color: "#b91c1c" }}>{error}</p>}
            <form onSubmit={handleCreate} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Property</label>
                <select required value={newBooking.property_id} onChange={e => setNewBooking({ ...newBooking, property_id: e.target.value })} className={inputCls}>
                  <option value="villa-emerald">Villa Emerald</option>
                  <option value="apartamento-sao-martinho">Apt São Martinho</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Channel</label>
                <select required value={newBooking.channel} onChange={e => setNewBooking({ ...newBooking, channel: e.target.value })} className={inputCls}>
                  <option value="direct">Direct</option>
                  <option value="airbnb">Airbnb</option>
                  <option value="booking_com">Booking.com</option>
                  <option value="owner_block">Owner Block</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Guest Name</label>
                <input type="text" value={newBooking.guest_name} onChange={e => setNewBooking({ ...newBooking, guest_name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Guest Email</label>
                <input type="email" value={newBooking.guest_email} onChange={e => setNewBooking({ ...newBooking, guest_email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Check-in</label>
                <input required type="date" value={newBooking.check_in} onChange={e => setNewBooking({ ...newBooking, check_in: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Check-out</label>
                <input required type="date" value={newBooking.check_out} onChange={e => setNewBooking({ ...newBooking, check_out: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Gross (€)</label>
                <input type="number" step="0.01" value={newBooking.total_gross} onChange={e => setNewBooking({ ...newBooking, total_gross: e.target.value })} className={inputCls} placeholder="0.00" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-charcoal-muted)" }}>Channel Fee %</label>
                <input type="number" step="0.1" value={newBooking.channel_fee_pct} onChange={e => setNewBooking({ ...newBooking, channel_fee_pct: e.target.value })} className={inputCls} placeholder="0" />
              </div>
              <div className="col-span-2 lg:col-span-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 text-[10px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)]" style={{ color: "var(--color-charcoal-muted)" }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 text-[10px] tracking-[0.15em] uppercase font-medium text-white disabled:opacity-60" style={{ backgroundColor: "var(--color-terracotta)" }}>
                  {saving ? "Saving…" : "Save Booking"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-[var(--color-sand-border)] overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead style={{ backgroundColor: "var(--color-sand)" }}>
              <tr>
                {["Property", "Channel", "Guest", "Check-in", "Check-out", "Nights", "Gross", "Fee %", "Net", "Status", ""].map(h => (
                  <th key={h} className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={11} className="px-4 py-8 text-center text-sm font-light" style={{ color: "var(--color-charcoal-muted)" }}>No bookings yet</td></tr>
              ) : filtered.map(b => {
                const nights = b.check_in && b.check_out
                  ? Math.round((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000)
                  : "—";

                if (editingId === b.id) {
                  const editNet = editData.total_gross && editData.channel_fee_pct
                    ? (parseFloat(editData.total_gross) * (1 - parseFloat(editData.channel_fee_pct) / 100)).toFixed(2)
                    : editData.total_gross || "—";
                  return (
                    <tr key={b.id} style={{ backgroundColor: "#fffdf9" }}>
                      <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>
                        {b.property_id === "villa-emerald" ? "Villa Emerald" : "Apt SM"}
                      </td>
                      <td className={tdStyle}>
                        <span className="text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-1"
                          style={{ color: CHANNEL_COLORS[b.channel] ?? "#888", backgroundColor: `${CHANNEL_COLORS[b.channel] ?? "#888"}15` }}>
                          {CHANNEL_LABELS[b.channel] ?? b.channel}
                        </span>
                      </td>
                      <td className={tdStyle}>
                        <div className="space-y-1">
                          <input className={editInputCls} placeholder="Name" value={editData.guest_name} onChange={e => setEditData(d => ({ ...d, guest_name: e.target.value }))} />
                          <input className={editInputCls} placeholder="Email" type="email" value={editData.guest_email} onChange={e => setEditData(d => ({ ...d, guest_email: e.target.value }))} />
                        </div>
                      </td>
                      <td className={tdStyle}>
                        <input className={editInputCls} type="date" value={editData.check_in} onChange={e => setEditData(d => ({ ...d, check_in: e.target.value }))} />
                      </td>
                      <td className={tdStyle}>
                        <input className={editInputCls} type="date" value={editData.check_out} onChange={e => setEditData(d => ({ ...d, check_out: e.target.value }))} />
                      </td>
                      <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{nights}</td>
                      <td className={tdStyle}>
                        <input className={editInputCls} type="number" step="0.01" placeholder="0.00" value={editData.total_gross} onChange={e => setEditData(d => ({ ...d, total_gross: e.target.value }))} />
                      </td>
                      <td className={tdStyle}>
                        <input className={editInputCls} type="number" step="0.1" placeholder="0" value={editData.channel_fee_pct} onChange={e => setEditData(d => ({ ...d, channel_fee_pct: e.target.value }))} />
                      </td>
                      <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>
                        {editNet !== "—" ? `€${parseFloat(editNet as string).toLocaleString()}` : "—"}
                      </td>
                      <td className={tdStyle}>
                        <select
                          value={editData.status}
                          onChange={e => setEditData(d => ({ ...d, status: e.target.value }))}
                          className="text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-1 border outline-none cursor-pointer"
                          style={{ color: STATUS_COLORS[editData.status] ?? "#888", borderColor: `${STATUS_COLORS[editData.status] ?? "#888"}40`, backgroundColor: `${STATUS_COLORS[editData.status] ?? "#888"}10` }}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                        </select>
                      </td>
                      <td className={tdStyle}>
                        <div className="flex items-center gap-2">
                          <button onClick={saveEdit} title="Save" className="p-1 rounded hover:bg-green-50 transition-colors">
                            <Check size={14} strokeWidth={1.5} style={{ color: "#2e7d32" }} />
                          </button>
                          <button onClick={() => setEditingId(null)} title="Cancel" className="p-1 rounded hover:bg-gray-100 transition-colors">
                            <X size={14} strokeWidth={1.5} style={{ color: "var(--color-charcoal-muted)" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={b.id} className="hover:bg-[var(--color-sand)]/30 transition-colors group">
                    <td className={tdStyle} style={{ color: "var(--color-charcoal)" }}>
                      {b.property_id === "villa-emerald" ? "Villa Emerald" : "Apt SM"}
                    </td>
                    <td className={tdStyle}>
                      <span className="text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-1"
                        style={{ color: CHANNEL_COLORS[b.channel] ?? "#888", backgroundColor: `${CHANNEL_COLORS[b.channel] ?? "#888"}15` }}>
                        {CHANNEL_LABELS[b.channel] ?? b.channel}
                      </span>
                    </td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal)" }}>
                      <p>{b.guest_name ?? "—"}</p>
                      {b.guest_email && <p className="text-xs" style={{ color: "var(--color-charcoal-muted)" }}>{b.guest_email}</p>}
                    </td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{b.check_in?.slice(0, 10)}</td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{b.check_out?.slice(0, 10)}</td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{nights}</td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal)" }}>{b.total_gross ? `€${parseFloat(b.total_gross).toLocaleString()}` : "—"}</td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{b.channel_fee_pct ? `${b.channel_fee_pct}%` : "—"}</td>
                    <td className={tdStyle} style={{ color: "var(--color-charcoal)" }}>{b.net_revenue ? `€${parseFloat(b.net_revenue).toLocaleString()}` : "—"}</td>
                    <td className={tdStyle}>
                      <select
                        value={b.status}
                        onChange={e => updateStatus(b.id, e.target.value)}
                        className="text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-1 border outline-none cursor-pointer"
                        style={{ color: STATUS_COLORS[b.status] ?? "#888", borderColor: `${STATUS_COLORS[b.status] ?? "#888"}40`, backgroundColor: `${STATUS_COLORS[b.status] ?? "#888"}10` }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                    </td>
                    <td className={tdStyle}>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(b)} title="Edit booking" className="p-1 rounded hover:bg-[var(--color-sand)] transition-colors">
                          <Pencil size={13} strokeWidth={1.5} style={{ color: "var(--color-charcoal-muted)" }} />
                        </button>
                        <button
                          onClick={() => deleteBooking(b.id)}
                          disabled={deletingId === b.id}
                          title="Delete booking"
                          className="p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={13} strokeWidth={1.5} style={{ color: "#e53935" }} />
                        </button>
                        {b.guest_email && (
                          <a href={`mailto:${b.guest_email}`} className="text-[10px] tracking-[0.1em] uppercase font-medium" style={{ color: "var(--color-terracotta)" }}>
                            Email
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
