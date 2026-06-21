import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { LayoutDashboard, Calendar, Inbox, BookOpen, TrendingUp, LogOut, Menu, X } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/revenue", label: "Revenue", icon: TrendingUp },
];

export function useAdminAuth() {
  const [, navigate] = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/me`, { credentials: "include" })
      .then(r => { if (!r.ok) navigate("/admin/login"); })
      .catch(() => navigate("/admin/login"))
      .finally(() => setChecked(true));
  }, []);

  return checked;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch(`${API}/api/admin/logout`, { method: "POST", credentials: "include" });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f4f1eb" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "var(--color-deep-green)" }}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[10px] tracking-[0.35em] uppercase font-medium text-white">BOUGAN · VILLA</p>
          <p className="text-[8px] tracking-[0.25em] uppercase text-white/40 mt-0.5">Manager Portal</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href || (href !== "/admin" && location.startsWith(href));
            return (
              <Link key={href} href={href}>
                <a
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-[0.1em] uppercase font-medium transition-colors ${active ? "text-white bg-white/15" : "text-white/50 hover:text-white hover:bg-white/8"}`}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {label}
                </a>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-[0.1em] uppercase font-medium text-white/40 hover:text-white transition-colors w-full"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-[var(--color-sand-border)]">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={18} strokeWidth={1.5} style={{ color: "var(--color-charcoal)" }} />
          </button>
          <h1 className="text-sm font-medium tracking-wide" style={{ color: "var(--color-charcoal)" }}>
            {title}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
