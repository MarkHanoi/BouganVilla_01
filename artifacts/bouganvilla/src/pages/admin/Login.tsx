import { useState } from "react";
import { useLocation } from "wouter";

const API = import.meta.env.VITE_API_URL ?? "";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Login failed");
      }
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const field = "w-full border border-[var(--color-sand-border)] px-4 py-3 text-sm font-light bg-white outline-none focus:border-[var(--color-terracotta)] transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-1" style={{ color: "var(--color-terracotta)" }}>
            BOUGAN · VILLA
          </p>
          <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--color-charcoal-muted)" }}>
            Manager Portal
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-xs px-4 py-3 border" style={{ borderColor: "#f87171", backgroundColor: "#fff1f1", color: "#b91c1c" }}>
              {error}
            </p>
          )}
          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
              Email
            </label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "var(--color-charcoal-muted)" }}>
              Password
            </label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className={field} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-[11px] tracking-[0.2em] uppercase font-medium text-white disabled:opacity-60 transition-opacity"
            style={{ backgroundColor: "var(--color-deep-green)" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
