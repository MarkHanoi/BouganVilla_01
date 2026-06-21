import { useEffect, useState } from "react";
import { Inbox, BookOpen, TrendingUp, Calendar } from "lucide-react";
import AdminLayout, { useAdminAuth } from "./layout/AdminLayout";
import { Link } from "wouter";

const API = import.meta.env.VITE_API_URL ?? "";

interface Stats {
  enquiries: number;
  newEnquiries: number;
  bookingsThisMonth: number;
  occupancyVilla: number;
  occupancyApt: number;
  revenueThisMonth: number;
}

export default function AdminDashboard() {
  const ready = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    if (!ready) return;
    const todayStr = new Date().toISOString().slice(0, 10);
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    Promise.all([
      fetch(`${API}/api/admin/enquiries`, { credentials: "include" }).then(r => r.json()),
      fetch(`${API}/api/admin/bookings`, { credentials: "include" }).then(r => r.json()),
      fetch(`${API}/api/admin/bookings?from=${todayStr}&to=${in30}`, { credentials: "include" }).then(r => r.json()),
    ]).then(([enqs, bookings, upcomingBk]) => {
      const now = new Date();
      const y = now.getFullYear(), m = now.getMonth();
      const monthStart = new Date(y, m, 1).toISOString().slice(0, 10);
      const monthEnd = new Date(y, m + 1, 0).toISOString().slice(0, 10);

      const thisMonthBookings = Array.isArray(bookings)
        ? bookings.filter((b: any) => b.check_in <= monthEnd && b.check_out >= monthStart && b.status !== "cancelled")
        : [];

      const grossThisMonth = thisMonthBookings.reduce((s: number, b: any) => s + (parseFloat(b.total_gross) || 0), 0);

      const daysInMonth = new Date(y, m + 1, 0).getDate();

      const calcOccupancy = (propertyId: string) => {
        const propBookings = (Array.isArray(bookings) ? bookings : []).filter(
          (b: any) => b.property_id === propertyId && b.status !== "cancelled" && b.status !== "blocked"
        );
        const occupiedDays = new Set<string>();
        propBookings.forEach((b: any) => {
          const cin = new Date(b.check_in);
          const cout = new Date(b.check_out);
          const d = new Date(Math.max(cin.getTime(), new Date(y, m, 1).getTime()));
          const end = new Date(Math.min(cout.getTime(), new Date(y, m + 1, 0).getTime()));
          while (d < end) {
            occupiedDays.add(d.toISOString().slice(0, 10));
            d.setDate(d.getDate() + 1);
          }
        });
        return Math.round((occupiedDays.size / daysInMonth) * 100);
      };

      setStats({
        enquiries: enqs.length ?? 0,
        newEnquiries: (enqs as any[]).filter((e: any) => e.status === "new").length,
        bookingsThisMonth: thisMonthBookings.length,
        occupancyVilla: calcOccupancy("villa-emerald"),
        occupancyApt: calcOccupancy("apartamento-sao-martinho"),
        revenueThisMonth: grossThisMonth,
      });
      setEnquiries((enqs as any[]).slice(0, 5));

      const sorted = (Array.isArray(upcomingBk) ? upcomingBk : [])
        .filter((b: any) => b.status !== "cancelled")
        .sort((a: any, b: any) => a.check_in.localeCompare(b.check_in))
        .slice(0, 6);
      setUpcoming(sorted);
    }).catch(() => {});
  }, [ready]);

  if (!ready) return null;

  const kpis = [
    { label: "New Enquiries", value: stats?.newEnquiries ?? "–", sub: `${stats?.enquiries ?? "–"} total`, icon: Inbox, href: "/admin/enquiries" },
    { label: "Bookings This Month", value: stats?.bookingsThisMonth ?? "–", sub: "confirmed stays", icon: BookOpen, href: "/admin/bookings" },
    { label: "Revenue This Month", value: stats ? `€${stats.revenueThisMonth.toLocaleString()}` : "–", sub: "gross across properties", icon: TrendingUp, href: "/admin/revenue" },
    { label: "Calendar", value: "View", sub: "unified timeline", icon: Calendar, href: "/admin/calendar" },
  ];

  const statusColors: Record<string, string> = {
    new: "#c96a3a",
    replied: "#4a7fa5",
    converted: "#2e7d32",
    closed: "#888",
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6 max-w-5xl">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, sub, icon: Icon, href }) => (
            <Link key={label} href={href}>
              <a className="block bg-white border border-[var(--color-sand-border)] p-5 hover:border-[var(--color-terracotta)] transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <Icon size={16} strokeWidth={1.5} style={{ color: "var(--color-terracotta)" }} />
                </div>
                <p className="text-2xl font-light mb-1" style={{ color: "var(--color-charcoal)" }}>{value}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-0.5" style={{ color: "var(--color-charcoal)" }}>{label}</p>
                <p className="text-[11px] font-light" style={{ color: "var(--color-charcoal-muted)" }}>{sub}</p>
              </a>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <div className="bg-white border border-[var(--color-sand-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-sand-border)]">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal)" }}>
                Upcoming — Next 30 Days
              </p>
              <Link href="/admin/calendar">
                <a className="text-[10px] tracking-[0.15em] uppercase font-medium" style={{ color: "var(--color-terracotta)" }}>
                  Calendar →
                </a>
              </Link>
            </div>
            {upcoming.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm font-light" style={{ color: "var(--color-charcoal-muted)" }}>No upcoming bookings</div>
            ) : (
              <div className="divide-y divide-[var(--color-sand-border)]">
                {upcoming.map(b => {
                  const nights = b.check_in && b.check_out
                    ? Math.round((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000) : 0;
                  const channelColor: Record<string, string> = { airbnb: "#FF5A5F", booking_com: "#003580", direct: "#2e7d32", owner_block: "#888" };
                  return (
                    <div key={b.id} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: channelColor[b.channel] ?? "#888" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--color-charcoal)" }}>
                          {b.guest_name ?? b.channel}
                        </p>
                        <p className="text-xs font-light" style={{ color: "var(--color-charcoal-muted)" }}>
                          {b.check_in?.slice(0, 10)} · {nights}n · {b.property_id === "villa-emerald" ? "Villa Emerald" : "Apt SM"}
                        </p>
                      </div>
                      {b.total_gross && (
                        <span className="text-xs font-medium tabular-nums shrink-0" style={{ color: "var(--color-charcoal-muted)" }}>
                          €{parseFloat(b.total_gross).toLocaleString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white border border-[var(--color-sand-border)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-sand-border)]">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--color-charcoal)" }}>
                Recent Enquiries
              </p>
              <Link href="/admin/enquiries">
                <a className="text-[10px] tracking-[0.15em] uppercase font-medium" style={{ color: "var(--color-terracotta)" }}>
                  View all →
                </a>
              </Link>
            </div>
            {enquiries.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm font-light" style={{ color: "var(--color-charcoal-muted)" }}>
                No enquiries yet
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-sand-border)]">
                {enquiries.map((e) => (
                  <div key={e.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--color-charcoal)" }}>{e.name}</p>
                      <p className="text-xs font-light truncate" style={{ color: "var(--color-charcoal-muted)" }}>
                        {e.email} · {e.property_id?.replace(/-/g, " ") ?? "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {e.check_in && (
                        <span className="text-xs font-light" style={{ color: "var(--color-charcoal-muted)" }}>
                          {e.check_in?.slice(0, 10)} → {e.check_out?.slice(0, 10)}
                        </span>
                      )}
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase font-medium px-2 py-1"
                        style={{ color: statusColors[e.status] ?? "#888", backgroundColor: `${statusColors[e.status] ?? "#888"}18` }}
                      >
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
