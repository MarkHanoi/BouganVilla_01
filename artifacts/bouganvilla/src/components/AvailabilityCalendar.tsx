import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

type Channel = "airbnb" | "booking_com" | "direct" | "owner_block";

interface BlockedPeriod {
  from: string;
  to: string;
  channel: Channel;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function toYMD(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function channelColor(channel: Channel) {
  switch (channel) {
    case "airbnb":      return { bg: "#FDEBD0", text: "#C96A3A", dot: "#C96A3A" };
    case "booking_com": return { bg: "#DBEAFE", text: "#2563EB", dot: "#3B82F6" };
    case "owner_block": return { bg: "#E5E7EB", text: "#6B7280", dot: "#9CA3AF" };
    default:            return { bg: "#DCF0DC", text: "#2e7d32", dot: "#2e7d32" };
  }
}

function isBlocked(dateStr: string, periods: BlockedPeriod[]): BlockedPeriod | null {
  for (const p of periods) {
    if (dateStr >= p.from && dateStr < p.to) return p;
  }
  return null;
}

function getDaysInMonth(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const result: (Date | null)[] = Array(startPad).fill(null);
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    result.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return result;
}

interface MonthGridProps {
  year: number;
  month: number;
  periods: BlockedPeriod[];
  today: string;
  selectedStart: string | null;
  selectedEnd: string | null;
  hovered: string | null;
  onSelect: (d: string) => void;
  onHover: (d: string | null) => void;
}

function MonthGrid({ year, month, periods, today, selectedStart, selectedEnd, hovered, onSelect, onHover }: MonthGridProps) {
  const days = getDaysInMonth(year, month);
  const rangeEnd = selectedEnd ?? hovered;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-[11px] tracking-[0.25em] uppercase font-medium text-[var(--color-charcoal)] mb-4 text-center">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] tracking-widest uppercase font-medium text-[var(--color-charcoal-subtle)] py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-[var(--color-sand-border)]">
        {days.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} className="bg-[var(--color-cream)] aspect-square" />;

          const dateStr = toYMD(date);
          const isPast = dateStr < today;
          const isToday = dateStr === today;
          const blocked = isBlocked(dateStr, periods);
          const inRange = selectedStart && rangeEnd && dateStr > selectedStart && dateStr <= rangeEnd;
          const isStart = dateStr === selectedStart;
          const isEnd = dateStr === selectedEnd;
          const colors = blocked ? channelColor(blocked.channel) : null;

          return (
            <button
              key={dateStr}
              disabled={!!blocked || isPast}
              onClick={() => !blocked && !isPast && onSelect(dateStr)}
              onMouseEnter={() => !blocked && !isPast && onHover(dateStr)}
              onMouseLeave={() => onHover(null)}
              className="relative aspect-square flex items-center justify-center text-xs transition-colors"
              style={{
                backgroundColor: isStart || isEnd
                  ? "var(--color-deep-green)"
                  : inRange
                  ? "#d0e8e0"
                  : blocked
                  ? colors!.bg
                  : isPast
                  ? "#F7F5F1"
                  : "white",
                color: isStart || isEnd
                  ? "white"
                  : blocked
                  ? colors!.text
                  : isPast
                  ? "var(--color-charcoal-subtle)"
                  : "var(--color-charcoal)",
                cursor: blocked || isPast ? "not-allowed" : "pointer",
                fontWeight: isToday ? 600 : 300,
              }}
            >
              {isToday && !blocked && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-terracotta)" }} />
              )}
              {date.getDate()}
              {blocked && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors!.dot }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  propertyId: string;
  onEnquire: (checkin: string, checkout: string) => void;
}

export default function AvailabilityCalendar({ propertyId, onEnquire }: Props) {
  const today = toYMD(new Date());
  const [offset, setOffset] = useState(0);
  const [step, setStep] = useState<"start" | "end">("start");
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [periods, setPeriods] = useState<BlockedPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${API}/api/availability/${propertyId}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: Array<{ check_in: string; check_out: string; channel: string }>) => {
        setPeriods(data.map(b => ({
          from: b.check_in.slice(0, 10),
          to: b.check_out.slice(0, 10),
          channel: b.channel as Channel,
        })));
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [propertyId]);

  const now = new Date();
  const m1 = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const m2 = new Date(now.getFullYear(), now.getMonth() + offset + 1, 1);

  function handleSelect(dateStr: string) {
    if (step === "start") {
      setSelectedStart(dateStr);
      setSelectedEnd(null);
      setStep("end");
      return;
    }
    if (dateStr <= selectedStart!) {
      setSelectedStart(dateStr);
      setSelectedEnd(null);
      return;
    }
    // Check no blocked dates in range
    const d = new Date(selectedStart!);
    d.setDate(d.getDate() + 1);
    const end = new Date(dateStr);
    while (d <= end) {
      if (isBlocked(toYMD(d), periods)) {
        setSelectedStart(dateStr);
        setSelectedEnd(null);
        return;
      }
      d.setDate(d.getDate() + 1);
    }
    setSelectedEnd(dateStr);
    setStep("start");
  }

  const nights = selectedStart && selectedEnd
    ? Math.round((new Date(selectedEnd).getTime() - new Date(selectedStart).getTime()) / 86400000)
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium text-[var(--color-charcoal)] mb-1">Availability</p>
          <p className="text-xs text-[var(--color-charcoal-muted)] font-light">
            {loading ? "Loading…" : error ? "Live data unavailable" : "Live calendar"}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {([
            { label: "Airbnb",      dot: "#C96A3A" },
            { label: "Booking.com", dot: "#3B82F6" },
            { label: "Owner block", dot: "#9CA3AF" },
          ] as const).map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.dot }} />
              <span className="text-[9px] tracking-widest uppercase text-[var(--color-charcoal-muted)]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader size={18} strokeWidth={1.5} className="animate-spin" style={{ color: "var(--color-terracotta)" }} />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setOffset(o => Math.max(0, o - 1))}
              disabled={offset === 0}
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-sand-border)] hover:border-[var(--color-charcoal-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} strokeWidth={1.5} />
            </button>
            <span className="flex-1" />
            <button
              onClick={() => setOffset(o => o + 1)}
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-sand-border)] hover:border-[var(--color-charcoal-muted)] transition-colors"
            >
              <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 mb-6">
            <MonthGrid year={m1.getFullYear()} month={m1.getMonth()} periods={periods} today={today}
              selectedStart={selectedStart} selectedEnd={selectedEnd} hovered={hovered}
              onSelect={handleSelect} onHover={setHovered} />
            <div className="hidden sm:block w-px bg-[var(--color-sand-border)]" />
            <MonthGrid year={m2.getFullYear()} month={m2.getMonth()} periods={periods} today={today}
              selectedStart={selectedStart} selectedEnd={selectedEnd} hovered={hovered}
              onSelect={handleSelect} onHover={setHovered} />
          </div>

          {selectedStart ? (
            <div className="border border-[var(--color-sand-border)] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: "var(--color-sand)" }}>
              <div>
                {!selectedEnd ? (
                  <p className="text-sm text-[var(--color-charcoal)] font-light">
                    Check-in: <strong className="font-medium">{selectedStart}</strong> — now pick check-out
                  </p>
                ) : (
                  <p className="text-sm text-[var(--color-charcoal)] font-light">
                    <strong className="font-medium">{selectedStart}</strong>{" → "}<strong className="font-medium">{selectedEnd}</strong>
                    <span className="ml-2 text-[var(--color-charcoal-muted)]">({nights} night{nights !== 1 ? "s" : ""})</span>
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setSelectedStart(null); setSelectedEnd(null); setStep("start"); }}
                  className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] text-[var(--color-charcoal-muted)] hover:border-[var(--color-charcoal-muted)] transition-colors">
                  Clear
                </button>
                {selectedEnd && (
                  <button onClick={() => onEnquire(selectedStart!, selectedEnd!)}
                    className="px-6 py-2 text-[10px] tracking-[0.15em] uppercase font-medium text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--color-terracotta)" }}>
                    Enquire for these dates
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-charcoal-muted)] font-light text-center">
              Click a date to start selecting your stay
            </p>
          )}
        </>
      )}
    </div>
  );
}
