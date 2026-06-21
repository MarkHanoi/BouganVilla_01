import { useEffect, useState, useRef } from "react";
import { Printer, Download } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CHANNEL_LABELS: Record<string, string> = {
  airbnb: "Airbnb", booking_com: "Booking.com", direct: "Direct", owner_block: "Owner Block",
};

interface Props {
  propertyId: string;
  propertyName: string;
  year: number;
  month: number;
  agencyFeePercent?: number;
}

export default function OwnerStatement({ propertyId, propertyName, year, month, agencyFeePercent = 18 }: Props) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [costs, setCosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const monthStr = String(month + 1).padStart(2, "0");
  const from = `${year}-${monthStr}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const to = `${year}-${monthStr}-${lastDay}`;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/admin/bookings?property_id=${propertyId}&from=${from}&to=${to}`, { credentials: "include" }).then(r => r.json()),
      fetch(`${API}/api/admin/costs?property_id=${propertyId}`, { credentials: "include" }).then(r => r.json()),
    ]).then(([bk, cs]) => {
      const monthBookings = (Array.isArray(bk) ? bk : []).filter((b: any) =>
        b.status !== "cancelled" && b.check_in?.startsWith(`${year}-${monthStr}`)
      );
      const monthCosts = (Array.isArray(cs) ? cs : []).filter((c: any) =>
        c.date?.startsWith(`${year}-${monthStr}`)
      );
      setBookings(monthBookings);
      setCosts(monthCosts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [propertyId, year, month]);

  const totalGross = bookings.reduce((s, b) => s + (parseFloat(b.total_gross) || 0), 0);
  const totalChannelFees = bookings.reduce((s, b) => {
    const gross = parseFloat(b.total_gross) || 0;
    const feeP = parseFloat(b.channel_fee_pct) || 0;
    return s + (gross * feeP / 100);
  }, 0);
  const netAfterChannels = totalGross - totalChannelFees;
  const agencyFee = netAfterChannels * agencyFeePercent / 100;
  const totalCosts = costs.reduce((s, c) => s + (parseFloat(c.amount) || 0), 0);
  const netToOwner = netAfterChannels - agencyFee - totalCosts;

  const handlePrint = () => window.print();

  if (loading) return <div className="py-8 text-center text-sm font-light" style={{ color: "var(--color-charcoal-muted)" }}>Loading statement…</div>;

  return (
    <div>
      {/* Print/Download controls */}
      <div className="flex gap-3 mb-6 print:hidden">
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium border border-[var(--color-sand-border)] bg-white hover:border-[var(--color-charcoal-muted)] transition-colors" style={{ color: "var(--color-charcoal-muted)" }}>
          <Printer size={12} strokeWidth={1.5} /> Print
        </button>
      </div>

      {/* Statement body */}
      <div ref={printRef} className="bg-white border border-[var(--color-sand-border)] p-8 lg:p-10 max-w-3xl font-light" style={{ color: "var(--color-charcoal)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-[var(--color-sand-border)]">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-0.5" style={{ color: "var(--color-terracotta)" }}>BOUGAN · VILLA</p>
            <p className="text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--color-charcoal-muted)" }}>Property Management</p>
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>Monthly Owner Statement</h2>
          </div>
          <div className="text-right text-xs" style={{ color: "var(--color-charcoal-muted)" }}>
            <p className="font-medium text-sm mb-0.5" style={{ color: "var(--color-charcoal)" }}>{propertyName}</p>
            <p>{MONTHS[month]} {year}</p>
            <p className="mt-1">Generated {new Date().toLocaleDateString("en-GB")}</p>
          </div>
        </div>

        {/* Bookings */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: "var(--color-charcoal-muted)" }}>Bookings</p>
          {bookings.length === 0 ? (
            <p className="text-sm italic" style={{ color: "var(--color-charcoal-muted)" }}>No bookings this month</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-sand-border)]">
                  {["Ref","Dates","Channel","Gross","Channel Fee","Net"].map(h => (
                    <th key={h} className="py-2 text-left text-[9px] tracking-[0.15em] uppercase font-medium" style={{ color: "var(--color-charcoal-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const gross = parseFloat(b.total_gross) || 0;
                  const feeP = parseFloat(b.channel_fee_pct) || 0;
                  const fee = gross * feeP / 100;
                  const net = gross - fee;
                  const nights = b.check_in && b.check_out
                    ? Math.round((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000)
                    : "?";
                  return (
                    <tr key={b.id} className="border-b border-[var(--color-sand-border)]/50">
                      <td className="py-2.5 font-mono text-xs" style={{ color: "var(--color-charcoal-muted)" }}>BV-{b.id}</td>
                      <td className="py-2.5">
                        {b.check_in?.slice(0, 10)} → {b.check_out?.slice(0, 10)}
                        <span className="ml-1 text-[11px]" style={{ color: "var(--color-charcoal-muted)" }}>({nights}n)</span>
                      </td>
                      <td className="py-2.5">{CHANNEL_LABELS[b.channel] ?? b.channel}</td>
                      <td className="py-2.5 tabular-nums">€{gross.toFixed(2)}</td>
                      <td className="py-2.5 tabular-nums" style={{ color: "#e53935" }}>{feeP > 0 ? `−€${fee.toFixed(2)}` : "—"}</td>
                      <td className="py-2.5 tabular-nums font-medium">€{net.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[var(--color-charcoal)]/20">
                  <td colSpan={3} className="py-3 font-medium text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--color-charcoal-muted)" }}>Totals</td>
                  <td className="py-3 tabular-nums font-medium">€{totalGross.toFixed(2)}</td>
                  <td className="py-3 tabular-nums" style={{ color: "#e53935" }}>−€{totalChannelFees.toFixed(2)}</td>
                  <td className="py-3 tabular-nums font-medium">€{netAfterChannels.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Costs */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: "var(--color-charcoal-muted)" }}>Deductions</p>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {costs.map(c => (
                <tr key={c.id} className="border-b border-[var(--color-sand-border)]/50">
                  <td className="py-2.5 capitalize" style={{ color: "var(--color-charcoal-muted)" }}>{c.category}</td>
                  <td className="py-2.5">{c.description}</td>
                  <td className="py-2.5 tabular-nums text-right" style={{ color: "#e53935" }}>−€{parseFloat(c.amount).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-b border-[var(--color-sand-border)]/50">
                <td className="py-2.5" style={{ color: "var(--color-charcoal-muted)" }}>Agency fee</td>
                <td className="py-2.5">{agencyFeePercent}% of net revenue</td>
                <td className="py-2.5 tabular-nums text-right" style={{ color: "#e53935" }}>−€{agencyFee.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Net to owner */}
        <div className="border-t-2 pt-6 flex items-center justify-between" style={{ borderColor: "var(--color-charcoal)" }}>
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium" style={{ color: "var(--color-charcoal-muted)" }}>Net to Owner</p>
          <p className="font-serif text-3xl" style={{ color: netToOwner >= 0 ? "var(--color-deep-green)" : "#e53935" }}>
            €{netToOwner.toFixed(2)}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[var(--color-sand-border)] text-[10px]" style={{ color: "var(--color-charcoal-subtle)" }}>
          <p>Bougan Villa Property Management · info@bouganvilla.com · +351 912 345 678</p>
          <p className="mt-1">This statement is generated automatically from booking records. Contact us with any queries.</p>
        </div>
      </div>
    </div>
  );
}
