import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";

const API = import.meta.env.VITE_API_URL ?? "";

const CHANNEL_COLORS: Record<string, { bg: string; text: string }> = {
  airbnb:      { bg: "#FF5A5F22", text: "#FF5A5F" },
  booking_com: { bg: "#00358022", text: "#003580" },
  direct:      { bg: "#2e7d3222", text: "#2e7d32" },
  owner_block: { bg: "#88888822", text: "#555" },
};

const CHANNEL_LABELS: Record<string, string> = {
  airbnb: "Airbnb", booking_com: "Booking.com", direct: "Direct", owner_block: "Owner Block",
};

const PROPERTIES = [
  { id: "villa-emerald", label: "Villa Emerald" },
  { id: "apartamento-sao-martinho", label: "Apt São Martinho" },
];

export default function AdminCalendar() {
  const ready = useAdminAuth();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!ready) return;
    const from = new Date(year, month, 1).toISOString().slice(0, 10);
    const to = new Date(year, month + 1, 0).toISOString().slice(0, 10);
    fetch(`${API}/api/admin/bookings?from=${from}&to=${to}`, { credentials: "include" })
      .then(r => r.json())
      .then(d => setBookings(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [ready, year, month]);

  if (!ready) return null;

  const monthName = new Date(year, month).toLocaleString("en-GB", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const getBookingsForPropertyDay = (propertyId: string, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookings.filter(b =>
      b.property_id === propertyId &&
      b.status !== "cancelled" &&
      b.check_in <= dateStr &&
      b.check_out > dateStr
    );
  };

  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <AdminLayout title="Calendar">
      <div className="max-w-6xl space-y-6">
        {/* Month nav */}
        <div className="flex items-center gap-4">
          <button onClick={prev} className="p-2 border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors">
            <ChevronLeft size={14} strokeWidth={1.5} style={{ color: "var(--color-charcoal)" }} />
          </button>
          <h2 className="text-sm font-medium tracking-wide min-w-[160px] text-center" style={{ color: "var(--color-charcoal)" }}>{monthName}</h2>
          <button onClick={next} className="p-2 border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors">
            <ChevronRight size={14} strokeWidth={1.5} style={{ color: "var(--color-charcoal)" }} />
          </button>
          {/* Legend */}
          <div className="flex gap-3 ml-4 flex-wrap">
            {Object.entries(CHANNEL_LABELS).map(([ch, label]) => (
              <span key={ch} className="flex items-center gap-1.5 text-[10px] font-light" style={{ color: "var(--color-charcoal-muted)" }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: CHANNEL_COLORS[ch]?.text }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Per-property calendars */}
        {PROPERTIES.map(({ id: propId, label: propLabel }) => (
          <div key={propId} className="bg-white border border-[var(--color-sand-border)]">
            <div className="px-4 py-3 border-b border-[var(--color-sand-border)]" style={{ backgroundColor: "var(--color-sand)" }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal)" }}>{propLabel}</p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* DOW header */}
                <div className="grid grid-cols-7 border-b border-[var(--color-sand-border)]">
                  {DOW.map(d => (
                    <div key={d} className="text-center text-[9px] tracking-[0.15em] uppercase py-2 font-medium" style={{ color: "var(--color-charcoal-muted)" }}>{d}</div>
                  ))}
                </div>
                {/* Days grid */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for first week */}
                  {Array.from({ length: firstDow }).map((_, i) => (
                    <div key={`e${i}`} className="border-b border-r border-[var(--color-sand-border)] min-h-[72px]" />
                  ))}
                  {days.map(day => {
                    const dayBookings = getBookingsForPropertyDay(propId, day);
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isToday = dateStr === today.toISOString().slice(0, 10);
                    const col = (firstDow + day - 1) % 7;
                    return (
                      <div
                        key={day}
                        className={`border-b border-r border-[var(--color-sand-border)] min-h-[72px] p-1 ${col === 6 ? "border-r-0" : ""}`}
                      >
                        <p
                          className={`text-[11px] font-medium mb-1 w-5 h-5 flex items-center justify-center ${isToday ? "rounded-full text-white" : ""}`}
                          style={isToday ? { backgroundColor: "var(--color-terracotta)", color: "white" } : { color: "var(--color-charcoal-muted)" }}
                        >
                          {day}
                        </p>
                        <div className="space-y-0.5">
                          {dayBookings.map(b => {
                            const colors = CHANNEL_COLORS[b.channel] ?? { bg: "#88888820", text: "#555" };
                            const isCheckIn = b.check_in?.slice(0, 10) === dateStr;
                            return (
                              <div
                                key={b.id}
                                className="text-[9px] px-1 py-0.5 truncate"
                                style={{ backgroundColor: colors.bg, color: colors.text, borderLeft: `2px solid ${colors.text}` }}
                                title={`${b.guest_name ?? "Reserved"} (${b.check_in?.slice(0, 10)} → ${b.check_out?.slice(0, 10)})`}
                              >
                                {isCheckIn ? "▶ " : ""}{b.guest_name ?? CHANNEL_LABELS[b.channel] ?? "Reserved"}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
