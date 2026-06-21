import { useEffect, useState } from "react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminRevenue() {
  const ready = useAdminAuth();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [summary, setSummary] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const load = () => {
    const params = new URLSearchParams({ year: String(year) });
    if (propertyFilter !== "all") params.set("property_id", propertyFilter);

    Promise.all([
      fetch(`${API}/api/admin/revenue?${params}`, { credentials: "include" }).then(r => r.json()),
      fetch(`${API}/api/admin/bookings`, { credentials: "include" }).then(r => r.json()),
    ]).then(([rev, bk]) => {
      setSummary(Array.isArray(rev?.bookings) ? rev.bookings : []);
      setBookings(Array.isArray(bk) ? bk : []);
    }).catch(() => {});
  };

  useEffect(() => { if (ready) load(); }, [ready, year, propertyFilter]);
  if (!ready) return null;

  // Compute monthly revenue from bookings
  const monthlyData = MONTHS.map((m, i) => {
    const monthStr = String(i + 1).padStart(2, "0");
    const inMonth = bookings.filter(b =>
      b.status !== "cancelled" &&
      b.check_in?.startsWith(`${year}-${monthStr}`) &&
      (propertyFilter === "all" || b.property_id === propertyFilter)
    );
    const gross = inMonth.reduce((s: number, b: any) => s + (parseFloat(b.total_gross) || 0), 0);
    const net = inMonth.reduce((s: number, b: any) => s + (parseFloat(b.net_revenue) || 0), 0);
    const nights = inMonth.reduce((s: number, b: any) => {
      const cin = new Date(b.check_in), cout = new Date(b.check_out);
      return s + Math.round((cout.getTime() - cin.getTime()) / 86400000);
    }, 0);
    return { month: m, index: i, gross, net, nights, count: inMonth.length };
  });

  const totalGross = monthlyData.reduce((s, m) => s + m.gross, 0);
  const totalNights = monthlyData.reduce((s, m) => s + m.nights, 0);
  const maxGross = Math.max(...monthlyData.map(m => m.gross), 1);

  const thStyle = "px-4 py-3 text-left text-[9px] tracking-[0.2em] uppercase font-medium border-b border-[var(--color-sand-border)]";
  const tdStyle = "px-4 py-3 text-sm font-light border-b border-[var(--color-sand-border)]";

  return (
    <AdminLayout title="Revenue">
      <div className="max-w-5xl space-y-6">
        {/* Controls */}
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex gap-1">
            <button onClick={() => setYear(y => y - 1)} className="px-3 py-1.5 text-xs border border-[var(--color-sand-border)] bg-white" style={{ color: "var(--color-charcoal-muted)" }}>‹</button>
            <span className="px-4 py-1.5 text-xs font-medium bg-white border border-[var(--color-sand-border)]" style={{ color: "var(--color-charcoal)" }}>{year}</span>
            <button onClick={() => setYear(y => y + 1)} className="px-3 py-1.5 text-xs border border-[var(--color-sand-border)] bg-white" style={{ color: "var(--color-charcoal-muted)" }}>›</button>
          </div>
          {["all", "villa-emerald", "apartamento-sao-martinho"].map(p => (
            <button
              key={p}
              onClick={() => setPropertyFilter(p)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium border transition-colors ${propertyFilter === p ? "text-white bg-[var(--color-deep-green)] border-transparent" : "border-[var(--color-sand-border)] bg-white"}`}
              style={propertyFilter !== p ? { color: "var(--color-charcoal-muted)" } : {}}
            >
              {p === "all" ? "All" : p === "villa-emerald" ? "Villa Emerald" : "Apt SM"}
            </button>
          ))}
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Annual Gross", value: `€${totalGross.toLocaleString()}` },
            { label: "Total Nights", value: totalNights },
            { label: "Avg per Night", value: totalNights ? `€${Math.round(totalGross / totalNights).toLocaleString()}` : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[var(--color-sand-border)] p-5">
              <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>{label}</p>
              <p className="text-2xl font-light" style={{ color: "var(--color-charcoal)" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-[var(--color-sand-border)] p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: "var(--color-charcoal)" }}>Monthly Revenue</p>
          <div className="flex items-end gap-2 h-32">
            {monthlyData.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full transition-all duration-300 cursor-pointer hover:opacity-80"
                  style={{
                    height: `${Math.max((m.gross / maxGross) * 100, m.gross > 0 ? 4 : 0)}%`,
                    backgroundColor: m.index === selectedMonth ? "var(--color-terracotta)" : "var(--color-deep-green)",
                    minHeight: m.gross > 0 ? "4px" : "0",
                  }}
                  onClick={() => setSelectedMonth(m.index === selectedMonth ? null : m.index)}
                  title={`${m.month}: €${m.gross.toLocaleString()}`}
                />
                <p className="text-[8px]" style={{ color: "var(--color-charcoal-muted)" }}>{m.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly breakdown table */}
        <div className="bg-white border border-[var(--color-sand-border)] overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "var(--color-sand)" }}>
              <tr>
                {["Month","Bookings","Nights","Gross","Net"].map(h => (
                  <th key={h} className={thStyle} style={{ color: "var(--color-charcoal-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(m => (
                <tr key={m.month} className={`transition-colors ${m.index === selectedMonth ? "bg-[#fdf6f0]" : "hover:bg-[var(--color-sand)]/30"}`} onClick={() => setSelectedMonth(m.index === selectedMonth ? null : m.index)} style={{ cursor: "pointer" }}>
                  <td className={tdStyle} style={{ color: "var(--color-charcoal)", fontWeight: m.gross > 0 ? 400 : 300 }}>{m.month} {year}</td>
                  <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{m.count || "—"}</td>
                  <td className={tdStyle} style={{ color: "var(--color-charcoal-muted)" }}>{m.nights || "—"}</td>
                  <td className={tdStyle} style={{ color: m.gross > 0 ? "var(--color-charcoal)" : "var(--color-charcoal-muted)" }}>
                    {m.gross > 0 ? `€${m.gross.toLocaleString()}` : "—"}
                  </td>
                  <td className={tdStyle} style={{ color: m.net > 0 ? "var(--color-charcoal)" : "var(--color-charcoal-muted)" }}>
                    {m.net > 0 ? `€${m.net.toLocaleString()}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
