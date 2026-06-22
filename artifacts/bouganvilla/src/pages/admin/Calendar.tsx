import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, RefreshCw, Link, X } from "lucide-react";
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

interface IcalFeed {
  id: number;
  property_id: string;
  channel: string;
  ical_url: string;
  last_synced: string | null;
  error_count: number;
}

interface CreateBookingForm {
  property_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  channel: string;
  total_price: string;
  notes: string;
}

const BLANK_BOOKING: CreateBookingForm = {
  property_id: "villa-emerald",
  guest_name: "",
  guest_email: "",
  check_in: "",
  check_out: "",
  channel: "direct",
  total_price: "",
  notes: "",
};

export default function AdminCalendar() {
  const ready = useAdminAuth();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [bookings, setBookings] = useState<any[]>([]);
  const [feeds, setFeeds] = useState<IcalFeed[]>([]);
  const [showFeeds, setShowFeeds] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [newFeed, setNewFeed] = useState({ property_id: "villa-emerald", channel: "airbnb", ical_url: "" });
  const [addingFeed, setAddingFeed] = useState(false);
  const [createForm, setCreateForm] = useState<CreateBookingForm | null>(null);
  const [saving, setSaving] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadBookings = () => {
    const from = new Date(year, month, 1).toISOString().slice(0, 10);
    const to = new Date(year, month + 1, 0).toISOString().slice(0, 10);
    fetch(`${API}/api/admin/bookings?from=${from}&to=${to}`, { credentials: "include" })
      .then(r => r.json())
      .then(d => setBookings(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  const loadFeeds = () => {
    fetch(`${API}/api/admin/ical-feeds`, { credentials: "include" })
      .then(r => r.json())
      .then(d => setFeeds(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  useEffect(() => {
    if (!ready) return;
    loadBookings();
    loadFeeds();
  }, [ready, year, month]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch(`${API}/api/sync-ical`, { method: "POST", credentials: "include" });
      const data = await res.json() as { results?: Array<{ synced: number; error?: string }> };
      const total = data.results?.reduce((s, r) => s + (r.synced ?? 0), 0) ?? 0;
      const errors = data.results?.filter(r => r.error).length ?? 0;
      setSyncMsg(errors ? `Synced ${total} events, ${errors} feed(s) failed` : `Synced ${total} events`);
      loadBookings();
      loadFeeds();
    } catch {
      setSyncMsg("Sync request failed");
    }
    setSyncing(false);
  };

  const handleAddFeed = async () => {
    if (!newFeed.ical_url) return;
    setAddingFeed(true);
    await fetch(`${API}/api/admin/ical-feeds`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeed),
    });
    setNewFeed(f => ({ ...f, ical_url: "" }));
    loadFeeds();
    setAddingFeed(false);
  };

  const handleDeleteFeed = async (id: number) => {
    await fetch(`${API}/api/admin/ical-feeds/${id}`, { method: "DELETE", credentials: "include" });
    loadFeeds();
  };

  if (!ready) return null;

  const monthName = new Date(year, month).toLocaleString("en-GB", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
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

        {/* Controls row */}
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={prev} className="p-2 border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors">
            <ChevronLeft size={14} strokeWidth={1.5} style={{ color: "var(--color-charcoal)" }} />
          </button>
          <h2 className="text-sm font-medium tracking-wide min-w-[160px] text-center" style={{ color: "var(--color-charcoal)" }}>{monthName}</h2>
          <button onClick={next} className="p-2 border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors">
            <ChevronRight size={14} strokeWidth={1.5} style={{ color: "var(--color-charcoal)" }} />
          </button>

          {/* Legend */}
          <div className="flex gap-3 ml-2 flex-wrap">
            {Object.entries(CHANNEL_LABELS).map(([ch, label]) => (
              <span key={ch} className="flex items-center gap-1.5 text-[10px] font-light" style={{ color: "var(--color-charcoal-muted)" }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: CHANNEL_COLORS[ch]?.text }} />
                {label}
              </span>
            ))}
          </div>

          <span className="flex-1" />

          {/* Sync button */}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors disabled:opacity-50"
            style={{ color: "var(--color-charcoal-muted)" }}
          >
            <RefreshCw size={12} strokeWidth={1.5} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing…" : "Sync iCal"}
          </button>

          <button
            onClick={() => setShowFeeds(f => !f)}
            className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] bg-white hover:bg-[var(--color-sand)] transition-colors"
            style={{ color: "var(--color-charcoal-muted)" }}
          >
            <Link size={12} strokeWidth={1.5} />
            iCal Feeds {showFeeds ? "▲" : "▼"}
          </button>
        </div>

        {/* Sync status */}
        {syncMsg && (
          <div className="px-4 py-2 border border-[var(--color-sand-border)] text-xs font-light" style={{ backgroundColor: "var(--color-sand)", color: "var(--color-charcoal-muted)" }}>
            {syncMsg}
          </div>
        )}

        {/* iCal Feed Management Panel */}
        {showFeeds && (
          <div className="bg-white border border-[var(--color-sand-border)] p-6 space-y-4">
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "var(--color-charcoal)" }}>iCal Feed Management</p>
            <p className="text-xs font-light" style={{ color: "var(--color-charcoal-muted)" }}>
              Paste Airbnb or Booking.com iCal export URLs here. They sync automatically every 15 minutes.
            </p>

            {/* Existing feeds */}
            {feeds.length > 0 && (
              <div className="space-y-2">
                {feeds.map(feed => (
                  <div key={feed.id} className="flex items-center gap-3 p-3 border border-[var(--color-sand-border)]" style={{ backgroundColor: "var(--color-sand)" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] tracking-[0.15em] uppercase font-medium px-1.5 py-0.5 text-white"
                          style={{ backgroundColor: CHANNEL_COLORS[feed.channel]?.text ?? "#888" }}>
                          {CHANNEL_LABELS[feed.channel] ?? feed.channel}
                        </span>
                        <span className="text-[10px] font-medium" style={{ color: "var(--color-charcoal)" }}>
                          {PROPERTIES.find(p => p.id === feed.property_id)?.label ?? feed.property_id}
                        </span>
                        {feed.error_count > 0 && (
                          <span className="text-[9px] text-red-500">⚠ {feed.error_count} errors</span>
                        )}
                      </div>
                      <p className="text-[10px] font-mono truncate" style={{ color: "var(--color-charcoal-muted)" }}>{feed.ical_url}</p>
                      {feed.last_synced && (
                        <p className="text-[9px] mt-0.5" style={{ color: "var(--color-charcoal-subtle)" }}>
                          Last synced: {new Date(feed.last_synced).toLocaleString("en-GB")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteFeed(feed.id)}
                      className="p-1.5 border border-[var(--color-sand-border)] hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={12} strokeWidth={1.5} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {feeds.length === 0 && (
              <p className="text-xs italic" style={{ color: "var(--color-charcoal-muted)" }}>No iCal feeds configured yet.</p>
            )}

            {/* Add new feed */}
            <div className="border-t border-[var(--color-sand-border)] pt-4">
              <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "var(--color-charcoal-muted)" }}>Add Feed</p>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={newFeed.property_id}
                  onChange={e => setNewFeed(f => ({ ...f, property_id: e.target.value }))}
                  className="border border-[var(--color-sand-border)] px-3 py-2 text-xs bg-white outline-none focus:border-[var(--color-terracotta)]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                <select
                  value={newFeed.channel}
                  onChange={e => setNewFeed(f => ({ ...f, channel: e.target.value }))}
                  className="border border-[var(--color-sand-border)] px-3 py-2 text-xs bg-white outline-none focus:border-[var(--color-terracotta)]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  <option value="airbnb">Airbnb</option>
                  <option value="booking_com">Booking.com</option>
                </select>
                <input
                  type="url"
                  placeholder="https://www.airbnb.com/calendar/ical/…"
                  value={newFeed.ical_url}
                  onChange={e => setNewFeed(f => ({ ...f, ical_url: e.target.value }))}
                  className="flex-1 min-w-[200px] border border-[var(--color-sand-border)] px-3 py-2 text-xs outline-none focus:border-[var(--color-terracotta)]"
                  style={{ color: "var(--color-charcoal)" }}
                />
                <button
                  onClick={handleAddFeed}
                  disabled={addingFeed || !newFeed.ical_url}
                  className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium text-white disabled:opacity-50 transition-opacity"
                  style={{ backgroundColor: "var(--color-deep-green)" }}
                >
                  <Plus size={12} strokeWidth={1.5} />
                  Add
                </button>
              </div>
              <div className="mt-3 p-3 border border-[var(--color-sand-border)] text-[10px] font-light space-y-1" style={{ backgroundColor: "var(--color-sand)", color: "var(--color-charcoal-muted)" }}>
                <p><strong>Airbnb:</strong> Profile → Listings → [Property] → Pricing &amp; Availability → Availability Settings → Export calendar → copy URL</p>
                <p><strong>Booking.com:</strong> Extranet → Rates &amp; Availability → Sync Calendars → Export</p>
                <p className="mt-1">Your Bougan Villa iCal feeds (for import into channels):</p>
                {PROPERTIES.map(p => (
                  <p key={p.id} className="font-mono break-all">
                    {window.location.origin}/api/ical/{p.id}.ics
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Per-property calendars */}
        {PROPERTIES.map(({ id: propId, label: propLabel }) => (
          <div key={propId} className="bg-white border border-[var(--color-sand-border)]">
            <div className="px-4 py-3 border-b border-[var(--color-sand-border)] flex items-center justify-between" style={{ backgroundColor: "var(--color-sand)" }}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal)" }}>{propLabel}</p>
              {/* iCal export link */}
              <a
                href={`${API}/api/ical/${propId}.ics`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[9px] tracking-[0.12em] uppercase font-medium transition-colors"
                style={{ color: "var(--color-charcoal-muted)" }}
              >
                <Link size={10} strokeWidth={1.5} />
                iCal Export
              </a>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-7 border-b border-[var(--color-sand-border)]">
                  {DOW.map(d => (
                    <div key={d} className="text-center text-[9px] tracking-[0.15em] uppercase py-2 font-medium" style={{ color: "var(--color-charcoal-muted)" }}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
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
