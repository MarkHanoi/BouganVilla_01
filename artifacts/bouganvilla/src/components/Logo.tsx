/**
 * Bougan Villa wordmark — inline SVG, transparent background.
 * Design: ultra-thin all-caps geometric sans (Jost 100) with wide tracking.
 * Mediterranean minimalist luxury — Comporta / boutique coastal aesthetic.
 *
 * Props:
 *   inverted — white text (for dark / hero backgrounds)
 *   className — sizing, e.g. "h-10"
 */
interface LogoProps {
  inverted?: boolean;
  className?: string;
}

export default function Logo({ inverted = false, className = "" }: LogoProps) {
  const ink = inverted ? "#ffffff" : "#2B2B2B";
  const sub = inverted ? "rgba(255,255,255,0.45)" : "#9A9690";
  const accent = inverted ? "rgba(255,255,255,0.55)" : "#C96A3A";

  return (
    <svg
      viewBox="0 0 196 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bougan Villa — Property Management"
      style={{ display: "block" }}
    >
      {/* ── Wordmark: BOUGAN · VILLA ───────────────────────── */}

      {/* BOUGAN */}
      <text
        x="0"
        y="22"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="15"
        fontWeight="200"
        fill={ink}
        letterSpacing="4"
        dominantBaseline="middle"
      >
        BOUGAN
      </text>

      {/* Separator dot — terracotta / muted white */}
      <text
        x="97"
        y="22"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="11"
        fontWeight="300"
        fill={accent}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        ·
      </text>

      {/* VILLA */}
      <text
        x="107"
        y="22"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="15"
        fontWeight="200"
        fill={ink}
        letterSpacing="4"
        dominantBaseline="middle"
      >
        VILLA
      </text>

      {/* ── Subtitle: PROPERTY MANAGEMENT ─────────────────── */}
      <text
        x="1"
        y="36"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="6.5"
        fontWeight="300"
        fill={sub}
        letterSpacing="2.6"
        dominantBaseline="middle"
      >
        PROPERTY MANAGEMENT
      </text>
    </svg>
  );
}
